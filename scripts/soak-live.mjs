import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { monitorEventLoopDelay, performance } from 'node:perf_hooks';
import { setTimeout as delay } from 'node:timers/promises';
import { createGameServer } from '../server/gameServer.ts';
import { DEFAULT_CONFIG } from '../shared/game.ts';
import { createGameClient } from '../src/services/gameClient.ts';

const args = Object.fromEntries(process.argv.slice(2).map(arg => {
  const at = arg.indexOf('=');
  if (!arg.startsWith('--') || at < 0) throw new Error('Use --seconds=600 --interval=200 --output=reports/phase-10-soak.json');
  return [arg.slice(2, at), arg.slice(at + 1)];
}));
const seconds = Number(args.seconds ?? 600);
const intervalMs = Number(args.interval ?? 200);
assert(Number.isInteger(seconds) && seconds >= 15 && seconds <= 1800, 'seconds must be 15..1800');
assert(Number.isInteger(intervalMs) && intervalMs >= 100 && intervalMs <= 2000, 'interval must be 100..2000 ms');
// This server always uses a fresh snapshot and disabled TikTok, independent of .env.
const snapshotPath = resolve(`data/phase-10-soak-${randomUUID()}/state.json`);
const output = resolve(args.output ?? 'reports/phase-10-soak.json');
const config = { ...DEFAULT_CONFIG, rounds: 1, roundSeconds: 3600, countdownSeconds: 0, roundBreakSeconds: 0 };
let server = createGameServer({ snapshotPath, config });
const port = await server.listen(0);
const url = `http://127.0.0.1:${port}`;
const clients = [createGameClient(url), createGameClient(url)];
const latest = [null, null];
const snapshotCounts = [0, 0];
clients.forEach((client, index) => {
  client.on('game:snapshot', snapshot => { latest[index] = snapshot.state; snapshotCounts[index]++; });
  client.connect();
});
async function until(predicate, label) {
  const start = performance.now();
  while (!predicate()) {
    if (performance.now() - start > 10000) throw new Error(`Timed out: ${label}`);
    await delay(20);
  }
}
let matchId;
const expected = { ronaldo: 0, messi: 0, gifts: 0, likes: 0 };
const latencies = [];
const samples = [];
const milestones = [];
const loop = monitorEventLoopDelay({ resolution: 20 });
loop.enable();
let requests = 0;
let duplicateReplays = 0;
let reconnects = 0;
let restarts = 0;
let lastGift;
let failure = null;
const started = performance.now();
const startedAt = new Date().toISOString();
async function command(type, extra = {}) {
  const ack = await clients[0].timeout(5000).emitWithAck('game:command', { type, matchId, ...extra });
  assert(ack.ok, ack.error);
  return ack.snapshot.state;
}
async function send(request) {
  const start = performance.now();
  const ack = await clients[0].timeout(5000).emitWithAck('live:mock', request);
  latencies.push(performance.now() - start); requests++;
  assert(ack.ok, ack.error);
  return ack;
}
function verify(state) {
  assert.equal(state.matchId, matchId);
  assert.deepEqual(state.scores, { ronaldo: expected.ronaldo, messi: expected.messi });
  assert.deepEqual(state.totalScores, state.scores);
  assert.equal(state.live.giftCount, expected.gifts);
  assert.equal(state.live.likeCount, expected.likes);
  assert(state.giftHistory.length <= 100 && state.live.feed.length <= 8 && state.live.log.length <= 80);
  for (const team of ['ronaldo', 'messi']) assert(state.live.celebrations[team].queued.length <= 4);
}
async function sync() {
  const before = [...snapshotCounts];
  clients.forEach(client => client.emit('game:sync'));
  await until(() => snapshotCounts.every((count, i) => count > before[i]), 'both clients receive a fresh snapshot');
  latest.forEach(verify);
}
function sample() {
  const memory = process.memoryUsage();
  samples.push({ elapsedSeconds: +( (performance.now() - started) / 1000).toFixed(2), requests,
    rssMiB: +(memory.rss / 1048576).toFixed(2), heapMiB: +(memory.heapUsed / 1048576).toFixed(2),
    snapshotBytes: statSync(snapshotPath).size });
}
try {
  await until(() => clients.every(client => client.connected) && latest.every(Boolean), 'initial clients');
  matchId = latest[0].matchId;
  await command('start');
  sample();
  let nextSample = 30;
  let nextReconnect = seconds / 5;
  for (let index = 0; performance.now() - started < seconds * 1000; index++) {
    const cycleStart = performance.now();
    const action = ['gift', 'streak', 'like', 'follow'][index % 4];
    const request = { requestId: randomUUID(), matchId, round: 1, user: { id: `soak-${index % 100}`, username: `Test${index % 100}` },
      action, ...(action === 'gift' ? { giftId: 'rose', count: 1 } : action === 'streak' ? { giftId: 'cookie', count: 3 } : action === 'like' ? { count: 10 } : {}) };
    const ack = await send(request);
    if (action === 'gift') { expected.ronaldo += 10; expected.gifts++; lastGift = request; }
    if (action === 'streak') { expected.messi += 30; expected.gifts += 3; lastGift = request; }
    if (action === 'like') expected.likes += 10;
    verify(ack.snapshot.state);
    if (index % 5 === 0) {
      const replay = await send(request); duplicateReplays++;
      assert(replay.results.every(result => result.status === 'duplicate'));
      verify(replay.snapshot.state);
    }
    if (action === 'follow') {
      const comment = await send({ ...request, requestId: randomUUID(), action: 'comment', text: index % 8 === 3 ? 'CR7' : 'M10' });
      verify(comment.snapshot.state);
    }
    await sync();
    const elapsed = (performance.now() - started) / 1000;
    if (elapsed >= nextReconnect && reconnects < 4) {
      clients[1].disconnect(); latest[1] = null; clients[1].connect();
      await until(() => clients[1].connected && latest[1], 'overlay reconnect');
      verify(latest[1]); reconnects++; nextReconnect += seconds / 5;
      milestones.push({ elapsedSeconds: elapsed, action: 'overlay reconnect', status: 'PASS' });
    }
    if (elapsed >= seconds * (restarts + 1) / 3 && restarts < 2) {
      await server.close(); latest.fill(null);
      server = createGameServer({ snapshotPath, config });
      await server.listen(port);
      await until(() => clients.every(client => client.connected) && latest.every(Boolean), 'automatic reconnect after restart');
      latest.forEach(verify); assert.equal(latest[0].status, 'PAUSED');
      await command('resume');
      const replay = await send(lastGift); duplicateReplays++;
      assert(replay.results.every(result => result.status === 'duplicate'));
      verify(replay.snapshot.state); restarts++;
      milestones.push({ elapsedSeconds: elapsed, action: 'server restart, PAUSED restore, resume, duplicate replay', status: 'PASS' });
    }
    if (elapsed >= nextSample) {
      const health = await fetch(`${url}/api/health`, { signal: AbortSignal.timeout(5000) });
      assert.equal(health.status, 200); assert.equal((await health.json()).status, 'ok');
      sample(); nextSample += 30;
      console.log(`${elapsed.toFixed(0)}s: ${requests} requests, ${restarts} restarts, ${reconnects} reconnects; scores match`);
    }
    await delay(Math.max(0, intervalMs - (performance.now() - cycleStart)));
  }
  await command('setTimer', { seconds: 0 });
  await until(() => latest.every(state => state?.status === 'MATCH_END'), 'match end');
  latest.forEach(verify);
  const winner = expected.ronaldo === expected.messi ? 'draw' : expected.ronaldo > expected.messi ? 'ronaldo' : 'messi';
  assert.equal(latest[0].winner, winner);
  milestones.push({ action: 'round and match result', status: 'PASS', winner });
  sample();
} catch (error) {
  failure = error instanceof Error ? error.stack : String(error);
  process.exitCode = 1;
} finally {
  clients.forEach(client => client.disconnect());
  await server.close(); loop.disable();
  const ordered = [...latencies].sort((a, b) => a - b);
  const percentile = ratio => +(ordered[Math.min(ordered.length - 1, Math.floor(ordered.length * ratio))] ?? 0).toFixed(2);
  const report = { status: failure ? 'FAIL' : 'PASS', startedAt, finishedAt: new Date().toISOString(),
    requestedSeconds: seconds, elapsedSeconds: +((performance.now() - started) / 1000).toFixed(2), targetIntervalMs: intervalMs,
    requests, duplicateReplays, reconnects, restarts, expected, snapshotCounts,
    ackMs: { p50: percentile(.5), p95: percentile(.95), max: percentile(1) },
    eventLoopMs: { p95: +(loop.percentile(95) / 1e6).toFixed(2), max: +(loop.max / 1e6).toFixed(2) },
    samples, milestones, snapshotPath, failure,
    scope: 'Isolated local Mock backend + two Socket.IO clients, real wall clock and disk persistence. No TikTok connection, WebGL, audio, OBS or LIVE Studio. Memory includes the server AND test clients; retained dedupe ledger grows during the match. A bounded run cannot prove absence of leaks.' };
  mkdirSync(dirname(output), { recursive: true }); writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
  console.log(`${report.status}: ${report.elapsedSeconds}s, ${requests} requests; report ${output}`);
  if (failure) console.error(failure);
}
