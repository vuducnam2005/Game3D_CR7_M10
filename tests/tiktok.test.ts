import { EventEmitter } from 'node:events';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CommonMessageData, Gift, User, WebcastGiftMessage } from 'tiktok-live-connector';
import { DEFAULT_CONFIG } from '../shared/game';
import { DEFAULT_MAPPINGS, liveEventSchema, type LiveEvent, type TikTokStatus } from '../shared/live';
import { GameEngine } from '../server/game/GameEngine';
import { TikTokNormalizer, type TikTokContext } from '../server/live/TikTokNormalizer';
import { TikTokLiveEventAdapter } from '../server/live/TikTokLiveEventAdapter';
import { readTikTokConfig } from '../server/live/tikTokConfig';
import { createTikTokTransport, type TikTokTransport } from '../server/live/tikTokTransport';

const now = 1792713600000;
const matchId = '8b120e28-0095-4c06-b357-1490fcfec781';
const mapping = { ...DEFAULT_MAPPINGS[0], id: '5655' };
const context: TikTokContext = { matchId, round: 1, scope: '1', acceptAfter: now - 1000, mappings: [mapping] };
function gift(count = 1, id = '100', final = false, timestamp = now) {
  const empty = new Uint8Array();
  return WebcastGiftMessage.decode(WebcastGiftMessage.encode({ ...WebcastGiftMessage.decode(empty),
    common: { ...CommonMessageData.decode(empty), msgId: id, roomId: '987654', createTime: String(timestamp / 1000) },
    user: { ...User.decode(empty), id: '123456', nickname: 'viewer' }, giftId: '5655', groupId: '999', repeatCount: count,
    repeatEnd: final ? 1 : 0, gift: { ...Gift.decode(empty), type: 1, name: 'Rose' } }).finish());
}
class Fake extends EventEmitter implements TikTokTransport {
  connect = vi.fn(async () => ({ roomId: '987654' }));
  disconnect = vi.fn(async () => {});
  constructor() { super(); this.on('error', () => {}); }
}
afterEach(() => vi.useRealTimers());

describe('installed TikTok v2.5.0 boundary', () => {
  it('constructs the real transport without network or credentials', async () => {
    const transport = await createTikTokTransport(readTikTokConfig({ TIKTOK_ENABLED: 'true', TIKTOK_USERNAME: 'public_account' }).config);
    expect(typeof transport.connect).toBe('function');
    await transport.disconnect();
  });
  it('normalizes actual v3 decoded payloads, strips raw fields and validates the shared schema', () => {
    const normalizer = new TikTokNormalizer();
    const input = gift(); input.user!.bioDescription = 'PRIVATE'; input.user!.displayId = 'viewer_handle';
    const event = normalizer.normalize('gift', input, '987654', context, now);
    expect(liveEventSchema.safeParse(event).success).toBe(true);
    expect(event).toMatchObject({ source: 'tiktok', timestamp: now, user: { id: '123456', username: 'viewer_handle' },
      team: 'ronaldo', gift: { id: '5655', repeatCount: 1, repeatEnd: false }, metadata: { roomId: '987654', baseline: false } });
    expect(JSON.stringify(event)).not.toContain('PRIVATE');
    expect(normalizer.normalize('gift', gift(), '987654', context, now).eventId).toBe(event.eventId);
  });
  it.each([
    { groupId: '0' }, { repeatCount: -1 }, { repeatCount: 10001 }, { repeatEnd: 2 },
    { user: { id: Number.MAX_SAFE_INTEGER + 1 } }, { common: { msgId: '1', roomId: '42', createTime: String(now) } },
    { common: { msgId: '', roomId: '987654', createTime: String(now) } }, { gift: undefined },
    { common: { msgId: '1', roomId: '987654', createTime: String(now + 6000) } },
  ])('rejects ambiguous or invalid payload: %j', patch => {
    expect(() => new TikTokNormalizer().normalize('gift', { ...gift(), ...patch }, '987654', context, now)).toThrow();
  });
  it('retains large IDs as strings and accepts bigint IDs without lossy number conversion', () => {
    const event = new TikTokNormalizer().normalize('gift', { ...gift(), giftId: 99999999999999999999n }, '987654', context, now);
    expect(event.type === 'gift' && event.gift.id).toBe('99999999999999999999');
  });
  it('uses individual message identity for non-streak gifts', () => {
    const normalizer = new TikTokNormalizer();
    const a = normalizer.normalize('gift', { ...gift(), groupId: '0', gift: { type: 2, name: 'Trophy' } }, '987654', context, now);
    const b = normalizer.normalize('gift', { ...gift(1, '101'), groupId: '0', gift: { type: 2, name: 'Trophy' } }, '987654', context, now);
    expect(a.type === 'gift' && a.gift.repeatEnd).toBe(true);
    expect(a.type === 'gift' && b.type === 'gift' && a.gift.streakId !== b.gift.streakId).toBe(true);
  });
  it('normalizes follow and team comments without storing profile/comment metadata', () => {
    const normalizer = new TikTokNormalizer();
    const data = { common: gift().common, user: { id: '123456', nickname: '<b>Alice</b>' }, comment: '!m10' };
    expect(normalizer.normalize('comment', data, '987654', context, now)).toMatchObject({ type: 'comment', team: 'messi', text: '!m10', user: { username: 'bAlice/b' } });
    expect(normalizer.normalize('follow', data, '987654', context, now)).toMatchObject({ type: 'follow', team: null });
    expect(() => normalizer.normalize('follow', data, '987654', { ...context, acceptAfter: now + 1 }, now)).toThrow();
  });
  it('counts cumulative deltas once, consumes reconnect gaps, and ignores unseen partial streaks', () => {
    const engine = new GameEngine({ ...DEFAULT_CONFIG, countdownSeconds: 0 }, () => now);
    const id = engine.getState().matchId;
    engine.execute({ type: 'liveConfig', matchId: id, config: { ...engine.getState().live.config, mappings: [mapping] } });
    engine.execute({ type: 'start', matchId: id });
    let normalizer = new TikTokNormalizer();
    const ctx = { ...context, matchId: id };
    const send = (count: number, msg: string, final = false) => engine.ingestLive(normalizer.normalize('gift', gift(count, msg, final), '987654', ctx, now));
    expect(send(1, '1').points).toBe(10);
    expect(send(3, '2').points).toBe(20);
    expect(send(3, '2').points).toBe(0);
    normalizer = new TikTokNormalizer();
    expect(send(6, '3').points).toBe(0); // unseen progress during the outage
    expect(send(7, '4').points).toBe(10);
    expect(send(7, '5', true).points).toBe(0);
    expect(send(10, '6', true).points).toBe(0);
    expect(engine.getState().scores.ronaldo).toBe(40);
    engine.execute({ type: 'reset', matchId: id });
    ctx.matchId = engine.getState().matchId; ctx.scope = '2';
    engine.execute({ type: 'start', matchId: ctx.matchId });
    expect(send(11, '7').points).toBe(0);
    expect(send(12, '8', true).points).toBe(0);
    expect(engine.getState().scores.ronaldo).toBe(0);
  });
  it('consumes an old first update without attaching its streak to the new round', () => {
    const normalizer = new TikTokNormalizer();
    const event = normalizer.normalize('gift', gift(), '987654', { ...context, acceptAfter: now + 1 }, now);
    expect(event).toMatchObject({ round: 0, metadata: { baseline: true } });
  });
});

describe('configuration and adapter lifecycle', () => {
  function setup(transport = new Fake(), maxRetries = 2) {
    vi.useFakeTimers(); vi.setSystemTime(now);
    const statuses: TikTokStatus[] = []; const events: LiveEvent[] = [];
    const factory = vi.fn(async () => transport);
    const onLog = vi.fn();
    const adapter = new TikTokLiveEventAdapter({ settings: readTikTokConfig({ TIKTOK_ENABLED: 'true', TIKTOK_USERNAME: '@public_account',
      TIKTOK_SIGN_API_KEY: 'SECRET_TOKEN', TIKTOK_MAX_RETRIES: String(maxRetries), TIKTOK_CONNECT_TIMEOUT_MS: '1000', TIKTOK_RETRY_BASE_MS: '1000' }),
      context: () => context, onStatus: status => statuses.push(status), onLog, factory });
    const consumer = (event: LiveEvent) => { events.push(event); return { status: 'accepted' as const, points: 0, giftCount: 0, message: '' }; };
    return { adapter, transport, factory, statuses, onLog, events, consumer };
  }
  it.each([{}, { TIKTOK_USERNAME: 'abc' }, { TIKTOK_ENABLED: 'true' }, { TIKTOK_ENABLED: 'yes' },
    { TIKTOK_ENABLED: 'true', TIKTOK_USERNAME: 'https://tiktok.com/@name' }, { TIKTOK_MAX_RETRIES: 'NaN' }])('never connects for missing/disabled/invalid config: %j', env => {
    const factory = vi.fn();
    const adapter = new TikTokLiveEventAdapter({ settings: readTikTokConfig(env), context: () => context, onStatus: vi.fn(), onLog: vi.fn(), factory });
    expect(adapter.getStatus().configured).toBe(false);
    expect(() => adapter.connect(vi.fn())).toThrow();
    expect(factory).not.toHaveBeenCalled();
  });
  it('requires explicit connect, ignores double connect, emits normalized events and removes listeners on stop', async () => {
    const s = setup(); expect(s.factory).not.toHaveBeenCalled();
    s.adapter.connect(s.consumer); s.adapter.connect(s.consumer);
    await vi.advanceTimersByTimeAsync(0);
    expect(s.factory).toHaveBeenCalledTimes(1); expect(s.adapter.connected).toBe(true);
    s.transport.emit('gift', gift()); expect(s.events).toHaveLength(1);
    expect(JSON.stringify(s.statuses)).not.toContain('SECRET_TOKEN');
    s.adapter.disconnect(); s.transport.emit('gift', gift(2));
    await vi.advanceTimersByTimeAsync(10000);
    expect(s.events).toHaveLength(1); expect(s.transport.listenerCount('gift')).toBe(0);
    expect(s.factory).toHaveBeenCalledTimes(1);
  });
  it('falls back after errors, retries with exponential backoff, caps retries and never publishes raw errors', async () => {
    const s = setup();
    s.transport.connect.mockRejectedValue(new Error('https://server?token=SECRET_TOKEN'));
    s.adapter.connect(s.consumer); await vi.advanceTimersByTimeAsync(0);
    expect(s.adapter.getStatus()).toMatchObject({ status: 'RETRYING', retryAt: now + 1000, attempt: 1 });
    await vi.advanceTimersByTimeAsync(1000);
    expect(s.adapter.getStatus()).toMatchObject({ status: 'RETRYING', retryAt: now + 3000, attempt: 2 });
    await vi.advanceTimersByTimeAsync(2000);
    expect(s.adapter.getStatus()).toMatchObject({ status: 'ERROR', retryAt: null, attempt: 3 });
    expect(JSON.stringify(s.statuses)).not.toContain('SECRET_TOKEN');
    await vi.advanceTimersByTimeAsync(60000); expect(s.factory).toHaveBeenCalledTimes(3);
  });
  it('reconnects after disconnect and stops automatically at stream end', async () => {
    const s = setup(); s.adapter.connect(s.consumer); await vi.advanceTimersByTimeAsync(0);
    s.transport.emit('disconnected', { reason: 'SECRET_TOKEN' });
    expect(s.adapter.connected).toBe(false);
    await vi.advanceTimersByTimeAsync(1000); expect(s.adapter.connected).toBe(true);
    s.transport.emit('streamEnd'); s.transport.emit('disconnected');
    await vi.advanceTimersByTimeAsync(10000);
    expect(s.factory).toHaveBeenCalledTimes(2); expect(s.adapter.getStatus().status).toBe('DISCONNECTED');
  });
  it('throttles invalid-event logs and contains consumer exceptions', async () => {
    const s = setup(); s.adapter.connect(() => { throw new Error('private'); });
    await vi.advanceTimersByTimeAsync(0);
    for (let i = 0; i < 20; i++) s.transport.emit('gift', i % 2 ? {} : gift());
    expect(s.onLog).toHaveBeenCalledTimes(1); expect(s.adapter.connected).toBe(true);
    expect(JSON.stringify(s.onLog.mock.calls)).not.toContain('private');
    s.adapter.disconnect();
  });
  it.each(['stop', 'timeout'] as const)('retires a late successful connect after %s', async action => {
    const s = setup(new Fake(), 0);
    let resolve!: (value: { roomId: string }) => void;
    s.transport.connect.mockImplementation(() => new Promise(done => { resolve = done; }));
    s.adapter.connect(s.consumer); await vi.advanceTimersByTimeAsync(0);
    if (action === 'stop') s.adapter.disconnect(); else await vi.advanceTimersByTimeAsync(1000);
    resolve({ roomId: '987654' }); await vi.advanceTimersByTimeAsync(0);
    s.transport.emit('gift', gift());
    expect(s.events).toHaveLength(0); expect(s.adapter.connected).toBe(false);
    expect(s.transport.disconnect).toHaveBeenCalledTimes(2);
    expect(s.statuses.some(status => status.status === 'CONNECTED')).toBe(false);
  });
  it('handles factory/import failure without taking down Mock', async () => {
    const s = setup(new Fake(), 0); s.factory.mockRejectedValue(new Error('Missing package'));
    s.adapter.connect(s.consumer); await vi.advanceTimersByTimeAsync(0);
    expect(s.adapter.getStatus().status).toBe('ERROR'); expect(s.adapter.connected).toBe(false);
  });
});
