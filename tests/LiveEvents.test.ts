import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG, type GameState } from '../shared/game';
import { DEFAULT_LIVE_CONFIG, DEFAULT_MAPPINGS, emptyLiveState, liveConfigSchema, type LiveEvent, type LiveRuntime } from '../shared/live';
import { GameEngine } from '../server/game/GameEngine';
import { MockEventAdapter } from '../server/live/MockEventAdapter';
import { comboPoints } from '../server/live/ComboManager';
import { ANIMATION_MS, enqueueCelebration, tickCelebrations } from '../server/live/CelebrationQueue';
import { safeDisplay } from '../server/live/LiveEventProcessor';

function fixture(options: { restored?: GameState; runtime?: LiveRuntime } = {}) {
  let now = 10000;
  const engine = new GameEngine({ ...DEFAULT_CONFIG, roundSeconds: 120, countdownSeconds: 0, roundBreakSeconds: 0 }, () => now, options.restored, options.runtime);
  function command(type: 'start' | 'pause' | 'resume' | 'reset') { engine.execute({ type, matchId: engine.getState().matchId }); }
  const state = () => engine.getState();
  function gift(count = 1, overrides: Partial<Extract<LiveEvent, { type: 'gift' }>> = {}, giftOverrides: Partial<Extract<LiveEvent, { type: 'gift' }>['gift']> = {}) {
    return { eventId: randomUUID(), source: 'mock', timestamp: now, matchId: state().matchId, round: state().round,
      user: { id: 'viewer1', username: 'Alice' }, type: 'gift', gift: { id: 'rose', name: 'Rose', repeatCount: count, repeatEnd: true, ...giftOverrides }, ...overrides } as LiveEvent;
  }
  function other(type: 'comment' | 'follow', text = 'CR7', user = { id: 'viewer1', username: 'Alice' }): LiveEvent {
    const base = { eventId: randomUUID(), source: 'mock' as const, timestamp: now, matchId: state().matchId, round: state().round, user };
    return type === 'follow' ? { ...base, type } : { ...base, type, text };
  }
  const ingest = (event: unknown) => engine.ingestLive(event);
  const advance = (ms: number) => { now += ms; engine.tick(); };
  return { engine, state, command, gift, other, ingest, advance };
}

describe('validated live gifts and idempotency', () => {
  it('maps Rose/Cookie, records delta gift counts, history, supporter and matching animation', () => {
    const f = fixture(); f.command('start');
    expect(f.ingest(f.gift(5))).toMatchObject({ status: 'accepted', points: 50, giftCount: 5 });
    f.ingest(f.gift(3, {}, { id: 'cookie' }));
    expect(f.state()).toMatchObject({ scores: { ronaldo: 50, messi: 30 }, totalScores: { ronaldo: 50, messi: 30 },
      live: { giftCount: 8, celebrations: { ronaldo: { active: { animation: 'SIUUU', count: 5 } }, messi: { active: { animation: 'Messi Celebrate', effect: 'blue' } } } } });
    expect(f.state().topSupporters.map(item => [item.team, item.giftCount, item.contribution])).toEqual([['ronaldo', 5, 50], ['messi', 3, 30]]);
    expect(f.state().teamMembers).toEqual([]);
  });

  it('only adds cumulative deltas and ignores duplicate, out-of-order, repeated end and reconnect replay', () => {
    const f = fixture(); f.command('start');
    const messages = [1, 3, 3, 2, 5].map(count => f.gift(count, {}, { streakId: 's1', repeatEnd: false }));
    for (const event of messages) f.ingest(event);
    const ended = f.gift(5, {}, { streakId: 's1' }); f.ingest(ended);
    for (const event of [...messages, ended, f.gift(5, {}, { streakId: 's1' })]) expect(f.ingest(event).points).toBe(0);
    expect(f.state().scores.ronaldo).toBe(50);
    expect(f.state().live.giftCount).toBe(5);
    expect(f.state().giftHistory.map(item => item.count)).toEqual([2, 2, 1]);
  });

  it('handles a stable event ID when the source lacks a separate streak ID', () => {
    const f = fixture(); f.command('start');
    for (const [repeatCount, repeatEnd] of [[1, false], [4, false], [4, true]] as const) {
      f.ingest(f.gift(repeatCount, { eventId: 'stable-id' }, { repeatEnd }));
    }
    expect(f.state().scores.ronaldo).toBe(40);
  });

  it('accepts a final-first event once and ignores late intermediate updates', () => {
    const f = fixture(); f.command('start');
    f.ingest(f.gift(10, {}, { streakId: 'first-final' }));
    expect(f.ingest(f.gift(5, {}, { streakId: 'first-final', repeatEnd: false })).points).toBe(0);
    expect(f.state().scores.ronaldo).toBe(100);
  });

  it('separates streaks by source, user, gift and streak ID', () => {
    const f = fixture(); f.command('start');
    f.ingest(f.gift(1, {}, { streakId: 'same' }));
    f.ingest(f.gift(1, { user: { id: 'viewer2', username: 'Bob' } }, { streakId: 'same' }));
    f.ingest(f.gift(1, { source: 'tiktok' }, { streakId: 'same' }));
    f.ingest(f.gift(1, {}, { streakId: 'different' }));
    f.ingest(f.gift(1, {}, { id: 'cookie', streakId: 'same' }));
    expect(f.state().scores).toEqual({ ronaldo: 40, messi: 10 });
  });

  it('rejects conflicting reuse of an event ID', () => {
    const f = fixture(); f.command('start');
    f.ingest(f.gift(1, { eventId: 'one' }));
    expect(() => f.ingest(f.gift(1, { eventId: 'one', user: { id: 'different', username: 'Different' } }))).toThrow('Event ID');
    expect(f.state().scores.ronaldo).toBe(10);
  });

  it('consumes paused increments without awarding them after resume', () => {
    const f = fixture(); f.command('start');
    f.ingest(f.gift(1, {}, { streakId: 'paused', repeatEnd: false }));
    f.command('pause');
    expect(f.ingest(f.gift(3, {}, { streakId: 'paused', repeatEnd: false })).status).toBe('ignored');
    f.command('resume');
    f.ingest(f.gift(5, {}, { streakId: 'paused' }));
    expect(f.state().scores.ronaldo).toBe(30);
    expect(f.state().live.giftCount).toBe(3);
  });

  it('does not move an old streak or stale round event into a later round', () => {
    const f = fixture(); f.command('start');
    f.ingest(f.gift(1, {}, { streakId: 'old', repeatEnd: false }));
    const stale = f.gift(2);
    f.advance(120000);
    expect(f.state().round).toBe(2);
    expect(f.ingest(stale).points).toBe(0);
    expect(f.ingest(f.gift(5, {}, { streakId: 'old' })).points).toBe(0);
    f.ingest(f.gift(1, {}, { streakId: 'new' }));
    expect(f.state().scores.ronaldo).toBe(10);
    expect(f.state().totalScores.ronaldo).toBe(20);
  });

  it('restores completed and open streak ledgers without re-awarding points', () => {
    const f = fixture(); f.command('start');
    const ended = f.gift(2, {}, { streakId: 'closed' }); f.ingest(ended);
    const open = f.gift(3, {}, { streakId: 'open', repeatEnd: false }); f.ingest(open);
    const restored = fixture({ restored: f.state(), runtime: f.engine.getLiveRuntime() });
    restored.command('resume');
    expect(restored.ingest(ended).points).toBe(0);
    expect(restored.ingest(open).points).toBe(0);
    expect(restored.ingest(restored.gift(5, {}, { streakId: 'open' })).points).toBe(20);
    expect(restored.state().scores.ronaldo).toBe(70);
  });

  it('resets live data and ledger but keeps rules; old match events stay rejected', () => {
    const f = fixture();
    f.engine.execute({ type: 'liveConfig', matchId: f.state().matchId, config: { ...DEFAULT_LIVE_CONFIG, allowTeamChange: false } });
    f.command('start');
    const old = f.gift(1); f.ingest(old); f.ingest(f.other('follow')); f.ingest(f.other('comment'));
    f.command('reset');
    expect(f.state()).toMatchObject({ teamMembers: [], giftHistory: [], topSupporters: [], live: { followerCount: 0, giftCount: 0, feed: [], log: [], config: { allowTeamChange: false } } });
    expect(f.engine.getLiveRuntime()).toMatchObject({ events: [], streaks: [], followers: [], supporters: [] });
    f.command('start'); expect(() => f.ingest(old)).toThrow('tran cu');
  });

  it('rejects invalid normalized events and ignores unknown gifts without side effects on score', () => {
    const f = fixture(); f.command('start');
    for (const repeatCount of [0, -1, 1.5, NaN, 10001]) expect(() => f.ingest(f.gift(repeatCount))).toThrow();
    expect(() => f.ingest({ ...f.gift(), points: 999 })).toThrow();
    expect(f.ingest(f.gift(10, {}, { id: 'unknown' })).status).toBe('ignored');
    expect(f.state().scores.ronaldo).toBe(0);
    expect(f.state().giftHistory).toEqual([]);
  });

  it('uses configured gift points and rejects cross-skeleton animations or duplicate IDs', () => {
    const f = fixture();
    const mapping = { ...DEFAULT_MAPPINGS[0], points: 25, sound: 'chime' as const, animation: 'Calma' as const };
    f.engine.execute({ type: 'liveConfig', matchId: f.state().matchId, config: { ...DEFAULT_LIVE_CONFIG, mappings: [mapping] } });
    f.command('start'); f.ingest(f.gift(4));
    expect(f.state().scores.ronaldo).toBe(100);
    expect(f.state().live.celebrations.ronaldo.active).toMatchObject({ sound: 'chime', animation: 'Calma' });
    expect(liveConfigSchema.safeParse({ ...DEFAULT_LIVE_CONFIG, mappings: [mapping, mapping] }).success).toBe(false);
    expect(liveConfigSchema.safeParse({ ...DEFAULT_LIVE_CONFIG, mappings: [{ ...mapping, animation: 'Messi Victory' }] }).success).toBe(false);
    expect(() => f.engine.execute({ type: 'liveConfig', matchId: f.state().matchId, config: DEFAULT_LIVE_CONFIG })).toThrow('WAITING');
  });
});

describe('follow, membership, top supporters and display safety', () => {
  it('greets a neutral follower once, without assigning a team', () => {
    const f = fixture(); f.ingest(f.other('follow'));
    f.ingest(f.other('follow'));
    expect(f.state().live.followerCount).toBe(1);
    expect(f.state().teamMembers).toEqual([]);
    expect(f.state().live.feed[0]).toMatchObject({ kind: 'follow', team: null, text: 'Welcome @Alice' });
  });
  it.each(['CR7', '!cr7', ' cr7 ', 'M10', '!m10', ' m10 '])('handles comment %s once per user', text => {
    const f = fixture(); f.ingest(f.other('comment', text)); f.ingest(f.other('comment', text));
    expect(f.state().teamMembers).toHaveLength(1);
    expect(f.state().teamMembers[0].team).toBe(text.toLowerCase().includes('cr7') ? 'ronaldo' : 'messi');
  });
  it('changes team only when enabled and uses selected team for follow', () => {
    const f = fixture(); f.ingest(f.other('comment', 'CR7')); f.ingest(f.other('comment', 'M10'));
    expect(f.state().teamMembers).toHaveLength(1);
    expect(f.state().teamMembers[0].team).toBe('messi');
    f.engine.execute({ type: 'liveConfig', matchId: f.state().matchId, config: { ...DEFAULT_LIVE_CONFIG, allowTeamChange: false } });
    expect(f.ingest(f.other('comment', 'CR7')).status).toBe('ignored');
    f.advance(1600); f.ingest(f.other('follow'));
    expect(f.state().live.feed[0].team).toBe('messi');
  });
  it('throttles join/follow display, retains statistics and expires the feed', () => {
    const f = fixture();
    for (let i = 0; i < 20; i++) f.ingest(f.other('follow', '', { id: `user${i}`, username: `Viewer${i}` }));
    expect(f.state().live.followerCount).toBe(20);
    expect(f.state().live.feed).toHaveLength(1);
    expect(f.state().live.suppressedNotices).toBe(19);
    f.advance(6000); expect(f.state().live.feed).toEqual([]);
  });
  it('ranks the whole match ledger, so an earlier non-top supporter can take the lead', () => {
    const f = fixture(); f.command('start');
    for (let i = 1; i <= 5; i++) f.ingest(f.gift(i, { user: { id: `u${i}`, username: `User${i}` } }));
    expect(f.state().topSupporters.map(item => item.username)).toEqual(['User5', 'User4', 'User3']);
    f.ingest(f.gift(20, { user: { id: 'u1', username: 'User1' } }));
    expect(f.state().topSupporters[0]).toMatchObject({ username: 'User1', giftCount: 21, contribution: 210 });
  });
  it('sanitizes names, bounds logs/history and never stores extra PII from events', () => {
    const f = fixture(); f.command('start');
    f.ingest(f.gift(1, { user: { id: 'bad', username: '<img src=x onerror="alert(1)">\u202e' } }));
    expect(f.state().topSupporters[0].username).not.toMatch(/[<>"\u202e]/);
    expect(f.state().topSupporters[0].userId).toMatch(/^[a-f0-9]{64}$/);
    expect(safeDisplay('\u0000')).toBe('viewer');
    expect(() => f.ingest({ ...f.other('follow'), user: { id: 'u', username: 'User', email: 'private@example.com' } })).toThrow();
    f.ingest(f.other('comment', 'private-comment@example.com'));
    expect(JSON.stringify(f.engine.getLiveRuntime())).not.toContain('private-comment@example.com');
    for (let i = 0; i < 110; i++) f.ingest(f.gift());
    expect(f.state().giftHistory).toHaveLength(100);
    expect(f.state().live.log).toHaveLength(80);
    expect(f.state().live.feed).toHaveLength(8);
  });
});

describe('combos, queue and mock adapter', () => {
  it.each([3, 5, 10, 20])('shows tier x%s without multiplying points by default', count => {
    const f = fixture(); f.command('start'); f.ingest(f.gift(count));
    expect(f.state().scores.ronaldo).toBe(count * 10);
    expect(f.state().live.celebrations.ronaldo.active?.tier).toBe(count);
    f.advance(5001); expect(f.state().combos.ronaldo).toBe(0);
  });
  it('multiplier is opt-in and gives the same score for streamed and batched gifts', () => {
    expect(comboPoints(0, 20, 10, true)).toBe(490);
    const single = fixture(); const streamed = fixture();
    for (const f of [single, streamed]) { f.engine.execute({ type: 'liveConfig', matchId: f.state().matchId, config: { ...DEFAULT_LIVE_CONFIG, comboMultiplier: true } }); f.command('start'); }
    single.ingest(single.gift(20));
    for (let i = 1; i <= 20; i++) streamed.ingest(streamed.gift(i, {}, { streakId: 's', repeatEnd: i === 20 }));
    expect(streamed.state().scores.ronaldo).toBe(single.state().scores.ronaldo);
  });
  it('scores a 30-gift burst immediately, merges the queue, and never interrupts the active action', () => {
    const f = fixture(); f.command('start'); f.ingest(f.gift());
    const active = f.state().live.celebrations.ronaldo.active!;
    for (let i = 0; i < 29; i++) f.ingest(f.gift());
    const lane = f.state().live.celebrations.ronaldo;
    expect(f.state().scores.ronaldo).toBe(300);
    expect(lane.active).toEqual(active);
    expect(lane.queued).toHaveLength(1); expect(lane.queued[0]).toMatchObject({ count: 29, tier: 20 });
    f.advance(ANIMATION_MS.SIUUU); expect(f.state().live.celebrations.ronaldo.active?.count).toBe(29);
  });
  it('limits queue length, prioritizes/merges urgent actions and enforces cooldown', () => {
    const live = emptyLiveState();
    const base = { ...DEFAULT_MAPPINGS[0], cooldownMs: 10000, priority: 0 };
    enqueueCelebration(live, base, 1, 0, 0);
    const active = { ...live.celebrations.ronaldo.active! };
    for (const animation of ['Calma', 'Sleep', 'Power Pose', 'Point Up'] as const) enqueueCelebration(live, { ...base, animation }, 1, 0, 1);
    enqueueCelebration(live, { ...base, effect: 'gold', priority: 3 }, 1, 20, 2);
    expect(live.celebrations.ronaldo.active).toEqual(active);
    expect(live.celebrations.ronaldo.queued).toHaveLength(4);
    expect(live.droppedEffects).toBe(1);
    tickCelebrations(live, 5000); expect(live.celebrations.ronaldo.active).toBeNull();
    tickCelebrations(live, 10000); expect(live.celebrations.ronaldo.active?.priority).toBe(3);
  });
  it('runs MockEventAdapter offline, with intermediate/duplicate/end messages and replay safety', () => {
    const f = fixture(); f.command('start');
    const adapter = new MockEventAdapter();
    const request = { requestId: randomUUID(), matchId: f.state().matchId, round: 1, user: { id: 'u', username: 'User' }, action: 'streak', giftId: 'cookie', count: 10 };
    expect(() => adapter.emit(request)).toThrow('chua ket noi');
    adapter.connect(event => f.ingest(event));
    const results = adapter.emit(request);
    expect(results.reduce((sum, item) => sum + item.points, 0)).toBe(100);
    expect(results.filter(item => item.status === 'duplicate')).toHaveLength(2);
    expect(adapter.emit(request).every(item => item.points === 0)).toBe(true);
    adapter.disconnect(); expect(adapter.connected).toBe(false);
  });
});
