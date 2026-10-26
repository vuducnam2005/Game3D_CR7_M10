import { EventEmitter } from 'node:events';
import { randomUUID } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, expect, it, vi } from 'vitest';
import { DEFAULT_CONFIG, snapshotSchema, type GameSnapshot } from '../shared/game';
import { DEFAULT_LIVE_CONFIG } from '../shared/live';
import { createGameServer } from '../server/gameServer';
import { readTikTokConfig } from '../server/live/tikTokConfig';
import { createGameClient, type GameSocket } from '../src/services/gameClient';

class Transport extends EventEmitter {
  connect = vi.fn(async () => ({ roomId: '123' }));
  disconnect = vi.fn(async () => {});
  constructor() { super(); this.on('error', () => {}); }
}
const servers: ReturnType<typeof createGameServer>[] = [];
const clients: GameSocket[] = [];
const folders: string[] = [];
afterEach(async () => {
  clients.splice(0).forEach(client => client.disconnect());
  for (const server of servers.splice(0)) await server.close();
  folders.splice(0).forEach(folder => rmSync(folder, { recursive: true, force: true }));
});
function next(client: GameSocket, predicate: (snapshot: GameSnapshot) => boolean) {
  return new Promise<GameSnapshot>((resolve, reject) => {
    const timer = setTimeout(() => { client.off('game:snapshot', handler); reject(new Error('snapshot timeout')); }, 4000);
    const handler = (snapshot: GameSnapshot) => { if (predicate(snapshot)) { clearTimeout(timer); client.off('game:snapshot', handler); resolve(snapshot); } };
    client.on('game:snapshot', handler);
  });
}
async function setup(transport = new Transport(), path?: string) {
  if (!path) { const folder = mkdtempSync(join(tmpdir(), 'tiktok-test-')); folders.push(folder); path = join(folder, 'state.json'); }
  const factory = vi.fn(async () => transport);
  const server = createGameServer({ snapshotPath: path, config: { ...DEFAULT_CONFIG, countdownSeconds: 0 },
    tiktok: readTikTokConfig({ TIKTOK_ENABLED: 'true', TIKTOK_USERNAME: 'fixture_user', TIKTOK_SIGN_API_KEY: 'PRIVATE_TOKEN',
      TIKTOK_RETRY_BASE_MS: '1000', TIKTOK_MAX_RETRIES: '1' }), tikTokFactory: factory });
  servers.push(server);
  const url = `http://127.0.0.1:${await server.listen(0)}`;
  const client = createGameClient(url); clients.push(client);
  const first = next(client, () => true); client.connect();
  const state = (await first).state;
  return { server, factory, client, state, url, transport, path };
}
it('routes connect via sockets, broadcasts normalized gifts, rejects simultaneous Mock, persists dedupe and restores Mock', async () => {
  const s = await setup();
  expect(s.factory).not.toHaveBeenCalled();
  const matchId = s.state.matchId;
  const cmd = (command: unknown) => fetch(`${s.url}/api/command`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(command) });
  await cmd({ type: 'liveConfig', matchId, config: { ...DEFAULT_LIVE_CONFIG, mappings: [...DEFAULT_LIVE_CONFIG.mappings, { ...DEFAULT_LIVE_CONFIG.mappings[0], id: '5655' }] } });
  await cmd({ type: 'start', matchId });
  const connected = next(s.client, snap => snap.state.connection.mode === 'TIKTOK');
  const ack = await s.client.timeout(3000).emitWithAck('game:command', { type: 'liveConnection', matchId, action: 'connect' });
  expect(ack.ok).toBe(true); expect(snapshotSchema.safeParse(await connected).success).toBe(true);
  const payload = (count: number, id: string, final = false) => ({ common: { msgId: id, roomId: '123', createTime: String(Math.ceil(Date.now() / 1000)) },
    user: { id: '999', nickname: 'fixture_viewer', bio: 'PRIVATE_PROFILE' }, giftId: '5655', groupId: '888',
    repeatCount: count, repeatEnd: final ? 1 : 0, gift: { type: 1, name: 'Rose' } });
  const scored = next(s.client, snap => snap.state.scores.ronaldo === 30);
  s.transport.emit('gift', payload(1, '1'));
  s.transport.emit('gift', payload(3, '2'));
  s.transport.emit('gift', payload(3, '2'));
  s.transport.emit('gift', payload(3, '3', true));
  expect((await scored).state.live.giftCount).toBe(3);
  const mock = { requestId: randomUUID(), matchId, round: 1, user: { id: 'm', username: 'mock' }, action: 'gift', giftId: 'rose', count: 1 };
  const blocked = await fetch(`${s.url}/api/mock`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(mock) });
  expect(blocked.status).toBe(400);
  const fallback = next(s.client, snap => snap.state.connection.tiktok.status === 'RETRYING');
  s.transport.emit('error', { exception: new Error('https://secret?token=PRIVATE_TOKEN'), info: 'PRIVATE_PROFILE' });
  expect((await fallback).state.connection.mode).toBe('MOCK');
  const accepted = await fetch(`${s.url}/api/mock`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(mock) });
  expect((await accepted.json()).snapshot.state.scores.ronaldo).toBe(40);
  await s.client.timeout(3000).emitWithAck('game:command', { type: 'liveConnection', matchId, action: 'mock' });
  await s.server.close();
  const saved = readFileSync(s.path, 'utf8');
  expect(saved).not.toContain('PRIVATE_');
  const restored = await setup(new Transport(), s.path);
  expect(restored.state).toMatchObject({ status: 'PAUSED', scores: { ronaldo: 40 }, connection: { mode: 'MOCK', tiktok: { status: 'DISCONNECTED' } } });
  expect(restored.factory).not.toHaveBeenCalled();
  await restored.client.timeout(3000).emitWithAck('game:command', { type: 'resume', matchId });
  const reconnected = next(restored.client, snap => snap.state.connection.mode === 'TIKTOK');
  await restored.client.timeout(3000).emitWithAck('game:command', { type: 'liveConnection', matchId, action: 'connect' });
  await reconnected;
  restored.transport.emit('gift', payload(3, '3', true));
  expect(restored.server.engine.getState().scores.ronaldo).toBe(40);
});

it('acknowledges a pending connection immediately and prevents late callbacks after shutdown', async () => {
  const transport = new Transport();
  let finish!: (value: { roomId: string }) => void;
  transport.connect.mockImplementation(() => new Promise(resolve => { finish = resolve; }));
  const s = await setup(transport);
  const ack = await s.client.timeout(1000).emitWithAck('game:command', { type: 'liveConnection', matchId: s.state.matchId, action: 'connect' });
  expect(ack.snapshot.state.connection.tiktok.status).toBe('CONNECTING');
  await s.server.close();
  finish({ roomId: '123' });
  await Promise.resolve(); await Promise.resolve();
  expect(transport.disconnect).toHaveBeenCalledTimes(2);
  expect(s.server.engine.getState().connection.mode).toBe('MOCK');
  expect(s.server.engine.getState().connection.live).toBe('DISCONNECTED');
});

it('rejects stale match IDs and forged credentials in connection commands', async () => {
  const s = await setup();
  for (const command of [
    { type: 'liveConnection', matchId: randomUUID(), action: 'connect' },
    { type: 'liveConnection', matchId: s.state.matchId, action: 'connect', signApiKey: 'forged' },
  ]) {
    const response = await fetch(`${s.url}/api/command`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(command) });
    expect(response.status).toBe(400);
  }
  expect(s.factory).not.toHaveBeenCalled();
});
