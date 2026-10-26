import { randomUUID } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG, type GameSnapshot } from '../shared/game';
import { DEFAULT_LIVE_CONFIG, type MockRequest } from '../shared/live';
import { createGameServer } from '../server/gameServer';
import { createGameClient, type GameSocket } from '../src/services/gameClient';

const servers: ReturnType<typeof createGameServer>[] = [];
const clients: GameSocket[] = [];
const directories: string[] = [];
afterEach(async () => {
  clients.splice(0).forEach(client => client.disconnect());
  for (const server of servers.splice(0)) await server.close();
  directories.splice(0).forEach(directory => rmSync(directory, { recursive: true, force: true }));
});
function path() { const folder = mkdtempSync(join(tmpdir(), 'battle-live-')); directories.push(folder); return join(folder, 'state.json'); }
function next(client: GameSocket, predicate: (snapshot: GameSnapshot) => boolean) {
  return new Promise<GameSnapshot>((resolve, reject) => {
    const timeout = setTimeout(() => { client.off('game:snapshot', handle); reject(new Error('No matching snapshot')); }, 4000);
    function handle(value: GameSnapshot) { if (predicate(value)) { clearTimeout(timeout); client.off('game:snapshot', handle); resolve(value); } }
    client.on('game:snapshot', handle);
  });
}
async function connect(url: string) { const client = createGameClient(url); clients.push(client); const snapshot = next(client, () => true); client.connect(); return { client, snapshot: await snapshot }; }
async function start(snapshotPath = path()) {
  const server = createGameServer({ snapshotPath, config: { ...DEFAULT_CONFIG, countdownSeconds: 0 } }); servers.push(server);
  return { server, snapshotPath, url: `http://127.0.0.1:${await server.listen(0)}` };
}
function request(matchId: string): MockRequest { return { requestId: randomUUID(), matchId, round: 1, user: { id: 'u1', username: 'Alice' }, action: 'streak', giftId: 'rose', count: 10 }; }

describe('mock LIVE over real sockets and JSON recovery', () => {
  it('synchronizes control/overlay settings and manual cues, retains settings on reconnect and restart', async () => {
    const first = await start(); const control = await connect(first.url); const overlay = await connect(first.url);
    const matchId = control.snapshot.state.matchId;
    const update = next(overlay.client, value => value.state.presentation.background === 'transparent');
    const ack = await control.client.timeout(3000).emitWithAck('game:command', { type: 'presentation', matchId, patch: { background: 'transparent', volume: .3, hud: { feed: false } } });
    expect(ack.ok).toBe(true); expect((await update).state.presentation).toMatchObject({ volume: .3, hud: { feed: false, scores: true } });
    const cue = next(overlay.client, value => value.state.live.celebrations.messi.active?.animation === 'Messi Victory');
    await control.client.timeout(3000).emitWithAck('game:command', { type: 'animate', matchId, team: 'messi', animation: 'Messi Victory' });
    expect((await cue).state.scores).toEqual({ ronaldo: 0, messi: 0 });
    overlay.client.disconnect(); const reconnected = next(overlay.client, () => true); overlay.client.connect();
    expect((await reconnected).state.presentation.background).toBe('transparent');
    await first.server.close();
    const second = await start(first.snapshotPath); const restored = await connect(second.url);
    expect(restored.snapshot.state.presentation).toEqual(ack.snapshot.state.presentation);
    expect(restored.snapshot.state.matchId).toBe(matchId);
    expect(restored.snapshot.state.live.celebrations.messi.active).toBeNull();
  });
  it('synchronizes gift score/animation across two clients, then prevents duplicate points after reconnect and backend restart', async () => {
    const first = await start();
    const a = await connect(first.url); const b = await connect(first.url);
    const matchId = a.snapshot.state.matchId;
    await a.client.timeout(3000).emitWithAck('game:command', { type: 'start', matchId });
    const input = request(matchId);
    const update = next(b.client, value => value.state.scores.ronaldo === 100);
    const ack = await a.client.timeout(3000).emitWithAck('live:mock', input);
    expect(ack.ok).toBe(true);
    expect((await update).state.live.celebrations.ronaldo.active?.animation).toBe('SIUUU');
    a.client.disconnect();
    const reconnect = next(a.client, () => true); a.client.connect(); await reconnect;
    expect((await a.client.timeout(3000).emitWithAck('live:mock', input)).snapshot.state.scores.ronaldo).toBe(100);
    await first.server.close();
    const saved = JSON.parse(readFileSync(first.snapshotPath, 'utf8'));
    expect(saved.version).toBe(2); expect(saved.runtime.streaks).toHaveLength(1);
    const second = await start(first.snapshotPath);
    const c = await connect(second.url);
    expect(c.snapshot.state).toMatchObject({ matchId, status: 'PAUSED', live: { adapter: 'CONNECTED', giftCount: 10 }, connection: { mode: 'MOCK', live: 'DISCONNECTED' } });
    await c.client.timeout(3000).emitWithAck('game:command', { type: 'resume', matchId });
    const replay = await c.client.timeout(3000).emitWithAck('live:mock', input);
    expect(replay.snapshot.state.scores.ronaldo).toBe(100);
    expect(replay.snapshot.state.live.giftCount).toBe(10);
  });

  it('persists custom mapping, team membership, follows and full supporter totals', async () => {
    const first = await start(); const a = await connect(first.url);
    const matchId = a.snapshot.state.matchId;
    const config = { ...DEFAULT_LIVE_CONFIG, mappings: [{ ...DEFAULT_LIVE_CONFIG.mappings[0], id: 'flower', points: 17 }], allowTeamChange: false };
    await a.client.timeout(3000).emitWithAck('game:command', { type: 'liveConfig', matchId, config });
    const base = { ...request(matchId), round: 0 };
    for (const input of [{ ...base, action: 'comment', text: 'CR7' }, { ...base, requestId: randomUUID(), action: 'follow' }]) {
      const response = await fetch(`${first.url}/api/mock`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
      expect(response.status).toBe(200);
    }
    await a.client.timeout(3000).emitWithAck('game:command', { type: 'start', matchId });
    await a.client.timeout(3000).emitWithAck('live:mock', { ...request(matchId), giftId: 'flower', count: 5 });
    await first.server.close();
    const second = await start(first.snapshotPath); const b = await connect(second.url);
    expect(b.snapshot.state.live).toMatchObject({ config, followerCount: 1, giftCount: 5 });
    expect(b.snapshot.state.teamMembers[0].team).toBe('ronaldo');
    expect(b.snapshot.state.topSupporters[0]).toMatchObject({ username: 'Alice', contribution: 85 });
    const again = await b.client.timeout(3000).emitWithAck('live:mock', { ...request(matchId), action: 'follow' });
    expect(again.snapshot.state.live.followerCount).toBe(1);
  });

  it('migrates phase-4 snapshots without resetting the match and refuses a missing phase-5 ledger', async () => {
    const initial = await start();
    const matchId = initial.server.engine.getState().matchId;
    await initial.server.close();
    const saved = JSON.parse(readFileSync(initial.snapshotPath, 'utf8'));
    saved.version = 1; delete saved.runtime; delete saved.state.live;
    writeFileSync(initial.snapshotPath, JSON.stringify(saved));
    const migrated = await start(initial.snapshotPath);
    expect(migrated.server.engine.getState()).toMatchObject({ matchId, status: 'WAITING', live: { config: DEFAULT_LIVE_CONFIG } });
    await migrated.server.close();
    const invalid = JSON.parse(readFileSync(initial.snapshotPath, 'utf8')); delete invalid.runtime;
    writeFileSync(initial.snapshotPath, JSON.stringify(invalid));
    expect(() => createGameServer({ snapshotPath: initial.snapshotPath })).toThrow('File duoc giu nguyen');
  });
});
