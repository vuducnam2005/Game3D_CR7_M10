import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG, type GameSnapshot } from '../shared/game';
import { createGameServer } from '../server/gameServer';
import { SnapshotStore } from '../server/storage';
import { createGameClient, type GameSocket } from '../src/services/gameClient';

const servers: ReturnType<typeof createGameServer>[] = [];
const directories: string[] = [];
const clients: GameSocket[] = [];
afterEach(async () => {
  clients.splice(0).forEach(client => client.disconnect());
  for (const server of servers.splice(0)) await server.close();
  directories.splice(0).forEach(path => rmSync(path, { recursive: true, force: true }));
});
function tempPath() {
  const directory = mkdtempSync(join(tmpdir(), 'live-battle-test-')); directories.push(directory);
  return join(directory, 'state.json');
}
function nextSnapshot(client: GameSocket, predicate: (snapshot: GameSnapshot) => boolean = () => true): Promise<GameSnapshot> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => { client.off('game:snapshot', receive); reject(new Error('Snapshot timed out')); }, 4000);
    function receive(snapshot: GameSnapshot) {
      if (predicate(snapshot)) { clearTimeout(timeout); client.off('game:snapshot', receive); resolve(snapshot); }
    }
    client.on('game:snapshot', receive);
  });
}
async function connect(url: string) {
  const client = createGameClient(url); clients.push(client);
  const received = nextSnapshot(client); client.connect();
  return { client, snapshot: await received };
}

describe('HTTP, Socket.IO and persistence', () => {
  it('syncs two clients, keeps score through refresh/reconnect, and restores after server restart', async () => {
    const snapshotPath = tempPath();
    let now = 0;
    const server = createGameServer({ snapshotPath, now: () => now, config: { ...DEFAULT_CONFIG, countdownSeconds: 0 }, tickMs: 20 });
    servers.push(server);
    const url = `http://127.0.0.1:${await server.listen(0)}`;
    const a = await connect(url);
    const b = await connect(url);
    const matchId = a.snapshot.state.matchId;
    const playing = nextSnapshot(b.client, value => value.state.status === 'PLAYING');
    expect((await a.client.timeout(3000).emitWithAck('game:command', { type: 'start', matchId })).ok).toBe(true);
    await playing;
    const scored = nextSnapshot(b.client, value => value.state.scores.ronaldo === 30);
    await a.client.timeout(3000).emitWithAck('game:command', { type: 'addScore', matchId, round: 1, team: 'ronaldo', points: 30 });
    expect((await scored).state.matchId).toBe(matchId);
    now = 1250;
    const ticking = nextSnapshot(b.client, value => value.state.remainingMs === 118750);
    await ticking;
    b.client.disconnect();
    const reconnected = nextSnapshot(b.client); b.client.connect();
    expect((await reconnected).state).toMatchObject({ matchId, remainingMs: 118750, scores: { ronaldo: 30, messi: 0 } });
    a.client.disconnect();
    const refreshed = await connect(url);
    expect(refreshed.snapshot.state).toMatchObject({ matchId, round: 1, remainingMs: 118750, scores: { ronaldo: 30, messi: 0 } });
    expect((await (await fetch(`${url}/api/state`)).json()).state.scores.ronaldo).toBe(30);
    await server.close();
    const restarted = createGameServer({ snapshotPath, now: () => 99999999 }); servers.push(restarted);
    const after = await connect(`http://127.0.0.1:${await restarted.listen(0)}`);
    expect(after.snapshot.state).toMatchObject({ matchId, status: 'PAUSED', pausedFrom: 'PLAYING', remainingMs: 118750,
      scores: { ronaldo: 30, messi: 0 }, connection: { live: 'DISCONNECTED' } });
  });

  it('automatically runs a full short match and sends the final result without client ticks', async () => {
    const server = createGameServer({ snapshotPath: tempPath(), config: { ...DEFAULT_CONFIG, rounds: 1, roundSeconds: 1, countdownSeconds: 0, roundBreakSeconds: 0 }, tickMs: 20 });
    servers.push(server);
    const url = `http://127.0.0.1:${await server.listen(0)}`;
    const { client, snapshot } = await connect(url);
    const matchId = snapshot.state.matchId;
    const finished = nextSnapshot(client, snapshot => snapshot.state.status === 'MATCH_END');
    await client.timeout(3000).emitWithAck('game:command', { type: 'start', matchId });
    await client.timeout(3000).emitWithAck('game:command', { type: 'addScore', matchId, round: 1, team: 'messi', points: 10 });
    expect((await finished).state).toMatchObject({ winner: 'messi', roundWins: { ronaldo: 0, messi: 1 } });
  });

  it('rejects invalid HTTP/Socket commands and handles malformed JSON without crashing', async () => {
    const server = createGameServer({ snapshotPath: tempPath() }); servers.push(server);
    const url = `http://127.0.0.1:${await server.listen(0)}`;
    const { client, snapshot } = await connect(url);
    const response = await fetch(`${url}/api/command`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'start', matchId: snapshot.state.matchId, scores: { ronaldo: 999 } }) });
    expect(response.status).toBe(400);
    const badJson = await fetch(`${url}/api/command`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{broken' });
    expect(badJson.status).toBe(400);
    expect((await client.timeout(3000).emitWithAck('game:command', { type: 'resume', matchId: snapshot.state.matchId })).ok).toBe(false);
    // Sync requests leave a waiting match unchanged.
    client.emit('game:sync');
    expect((await fetch(`${url}/api/health`)).status).toBe(200);
    expect(server.engine.getState().status).toBe('WAITING');
  });

  it('persists configuration and reset with a new match ID', async () => {
    const snapshotPath = tempPath();
    const server = createGameServer({ snapshotPath }); servers.push(server);
    const url = `http://127.0.0.1:${await server.listen(0)}`;
    const matchId = server.engine.getState().matchId;
    for (const command of [{ type: 'configure', matchId, config: { ...DEFAULT_CONFIG, roundSeconds: 9, tieBreaker: 'overtime' } }, { type: 'start', matchId }, { type: 'reset', matchId }]) {
      const response = await fetch(`${url}/api/command`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(command) });
      expect(response.status).toBe(200);
    }
    const saved = new SnapshotStore(snapshotPath).load()!;
    expect(saved).toMatchObject({ status: 'WAITING', config: { roundSeconds: 9, tieBreaker: 'overtime' }, remainingMs: 9000 });
    expect(saved.matchId).not.toBe(matchId);
  });

  it('preserves corrupted or inconsistent snapshots and refuses silent reset', () => {
    const path = tempPath();
    writeFileSync(path, '{broken');
    expect(() => createGameServer({ snapshotPath: path })).toThrow('File duoc giu nguyen');
    expect(readFileSync(path, 'utf8')).toBe('{broken');
    const server = createGameServer({ snapshotPath: tempPath() });
    const state = server.engine.getState(); state.round = 2;
    writeFileSync(path, JSON.stringify({ version: 1, savedAt: Date.now(), state }));
    expect(() => new SnapshotStore(path).load()).toThrow('File duoc giu nguyen');
  });

  it.each(['http', 'socket', 'connect'] as const)('saves MATCH_END immediately when a %s read crosses the deadline before the scheduler', async source => {
    const snapshotPath = tempPath();
    let now = 0;
    const server = createGameServer({ snapshotPath, now: () => now, tickMs: 60000,
      config: { ...DEFAULT_CONFIG, rounds: 1, roundSeconds: 1, countdownSeconds: 0, roundBreakSeconds: 0 } });
    servers.push(server);
    const url = `http://127.0.0.1:${await server.listen(0)}`;
    const { client, snapshot } = await connect(url);
    await client.timeout(3000).emitWithAck('game:command', { type: 'start', matchId: snapshot.state.matchId });
    const ended = nextSnapshot(client, value => value.state.status === 'MATCH_END');
    now = 1000;
    if (source === 'http') await fetch(`${url}/api/state`);
    else if (source === 'socket') client.emit('game:sync');
    else await connect(url);
    await ended;
    expect(new SnapshotStore(snapshotPath).load()).toMatchObject({ status: 'MATCH_END', winner: 'draw', remainingMs: 0 });
  });
});
