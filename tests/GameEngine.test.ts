import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG, type GameCommand, type GameConfig, type GameState } from '../shared/game';
import { GameEngine } from '../server/game/GameEngine';
import { addPoints, decideWinner } from '../server/game/ScoreManager';

function fixture(config: Partial<GameConfig> = {}, restored?: GameState) {
  let now = 0;
  const engine = new GameEngine({ ...DEFAULT_CONFIG, ...config }, () => now, restored);
  const command = (input: Omit<GameCommand, 'matchId'> | Record<string, unknown>) => engine.execute({ matchId: engine.getState().matchId, ...input });
  const advance = (ms: number) => { now += ms; engine.tick(); };
  const score = (team: 'ronaldo' | 'messi', points: number) => command({ type: 'addScore', team, points, round: engine.getState().round });
  return { engine, command, advance, score, state: () => engine.getState(), setClock: (ms: number) => { now = ms; } };
}

describe('authoritative game engine', () => {
  it('starts WAITING with 3 x 120s and all required state', () => {
    const f = fixture();
    expect(f.state()).toMatchObject({ status: 'WAITING', round: 0, remainingMs: 120000,
      scores: { ronaldo: 0, messi: 0 }, combos: { ronaldo: 0, messi: 0 },
      teamMembers: [], giftHistory: [], topSupporters: [], winner: null,
      connection: { live: 'DISCONNECTED', mode: 'NONE' } });
    f.advance(999999);
    expect(f.state().status).toBe('WAITING');
  });

  it('counts down, scores, records each round and wins by round wins, not total points', () => {
    const f = fixture({ roundSeconds: 2, countdownSeconds: 1, roundBreakSeconds: 1 });
    f.command({ type: 'start' });
    expect(f.state().status).toBe('COUNTDOWN');
    f.advance(999);
    expect(f.state().remainingMs).toBe(1);
    f.advance(1);
    f.score('ronaldo', 1000);
    f.advance(2000);
    expect(f.state()).toMatchObject({ status: 'ROUND_END', roundWins: { ronaldo: 1, messi: 0 } });
    f.advance(1000);
    expect(f.state()).toMatchObject({ round: 2, status: 'COUNTDOWN', scores: { ronaldo: 0, messi: 0 } });
    for (let round = 2; round <= 3; round++) {
      f.advance(1000);
      f.score('messi', 10);
      f.advance(2000);
      f.advance(1000);
    }
    expect(f.state()).toMatchObject({ status: 'MATCH_END', winner: 'messi',
      roundWins: { ronaldo: 1, messi: 2 }, totalScores: { ronaldo: 1000, messi: 20 }, remainingMs: 0 });
    expect(f.state().roundResults).toHaveLength(3);
    f.advance(1000000);
    expect(f.state().roundResults).toHaveLength(3);
  });

  it.each(['COUNTDOWN', 'PLAYING', 'ROUND_END'] as const)('pauses and resumes %s with exact fractional remaining time', phase => {
    const f = fixture({ rounds: 1, countdownSeconds: 1, roundSeconds: 2, roundBreakSeconds: 1 });
    f.command({ type: 'start' });
    if (phase === 'PLAYING') f.advance(1000);
    if (phase === 'ROUND_END') f.advance(3000);
    f.advance(123.5);
    const remaining = f.state().remainingMs;
    f.command({ type: 'pause' });
    f.advance(100000);
    expect(f.state()).toMatchObject({ status: 'PAUSED', pausedFrom: phase, remainingMs: remaining });
    expect(() => f.score('messi', 10)).toThrow('PLAYING');
    f.command({ type: 'resume' });
    f.advance(12.5);
    expect(f.state()).toMatchObject({ status: phase, pausedFrom: null, remainingMs: remaining - 12.5 });
  });

  it('uses elapsed time across delayed ticks and zero-duration transitions', () => {
    const f = fixture({ rounds: 3, roundSeconds: 2, countdownSeconds: 0, roundBreakSeconds: 0 });
    f.command({ type: 'start' });
    expect(f.state().status).toBe('PLAYING');
    f.advance(2500);
    expect(f.state()).toMatchObject({ round: 2, remainingMs: 1500 });
    f.advance(999999);
    expect(f.state()).toMatchObject({ status: 'MATCH_END', winner: 'draw', round: 3 });
    expect(f.state().roundResults.map(round => round.winner)).toEqual(['draw', 'draw', 'draw']);
  });

  it('rejects a score arriving exactly at timeout and a delayed score for a previous round', () => {
    const f = fixture({ roundSeconds: 1, countdownSeconds: 0, roundBreakSeconds: 0 });
    f.command({ type: 'start' });
    f.setClock(1000);
    expect(() => f.command({ type: 'addScore', team: 'ronaldo', points: 10, round: 1 })).toThrow('Hiep da thay doi');
    expect(f.state().scores.ronaldo).toBe(0);
    expect(f.state().roundResults[0].winner).toBe('draw');
  });

  it('plays overtime on tied round wins and ends after the first decisive overtime', () => {
    const f = fixture({ rounds: 2, roundSeconds: 1, countdownSeconds: 0, roundBreakSeconds: 0, tieBreaker: 'overtime', overtimeSeconds: 2 });
    f.command({ type: 'start' });
    f.score('ronaldo', 10); f.advance(1000);
    f.score('messi', 100); f.advance(1000);
    expect(f.state()).toMatchObject({ round: 3, overtime: true, remainingMs: 2000, winner: null });
    f.score('ronaldo', 1); f.advance(2000);
    expect(f.state()).toMatchObject({ status: 'MATCH_END', winner: 'ronaldo' });
    expect(f.state().roundResults[2].overtime).toBe(true);
  });

  it('caps repeated tied overtime and declares a draw', () => {
    const f = fixture({ rounds: 1, roundSeconds: 1, countdownSeconds: 0, roundBreakSeconds: 0,
      tieBreaker: 'overtime', overtimeSeconds: 1, maxOvertimeRounds: 2 });
    f.command({ type: 'start' });
    f.advance(100000);
    expect(f.state()).toMatchObject({ status: 'MATCH_END', winner: 'draw', round: 3 });
    expect(f.state().roundResults).toHaveLength(3);
  });

  it('does not add overtime when regulation has a winner', () => {
    const f = fixture({ rounds: 1, roundSeconds: 1, countdownSeconds: 0, roundBreakSeconds: 0, tieBreaker: 'overtime' });
    f.command({ type: 'start' }); f.score('messi', 1); f.advance(1000);
    expect(f.state()).toMatchObject({ status: 'MATCH_END', round: 1, winner: 'messi' });
  });

  it('changes timer on the server, preserves pause, and handles zero once resumed', () => {
    const f = fixture({ countdownSeconds: 0, roundBreakSeconds: 2 });
    expect(() => f.command({ type: 'setTimer', seconds: 10 })).toThrow();
    f.command({ type: 'start' }); f.advance(250);
    f.command({ type: 'setTimer', seconds: 10 });
    f.advance(1001);
    expect(f.state().remainingMs).toBe(8999);
    f.command({ type: 'pause' }); f.command({ type: 'setTimer', seconds: 0 });
    f.advance(5000);
    expect(f.state().status).toBe('PAUSED');
    f.command({ type: 'resume' });
    expect(f.state()).toMatchObject({ status: 'ROUND_END', remainingMs: 2000 });
  });

  it('resets all match data, retains configuration/connections, and rejects stale match commands', () => {
    const seed = fixture().state();
    seed.combos = { ronaldo: 5, messi: 3 };
    seed.teamMembers = [{ userId: 'one', username: 'one', team: 'messi' }];
    seed.topSupporters = [{ ...seed.teamMembers[0], giftCount: 1, contribution: 10 }];
    seed.giftHistory = [{ eventId: 'one', userId: 'one', username: 'one', team: 'messi', giftId: 'cookie', giftName: 'Cookie', count: 1, points: 10, timestamp: 1 }];
    const f = fixture({}, seed);
    f.engine.setClientCount(2);
    f.command({ type: 'configure', config: { ...DEFAULT_CONFIG, rounds: 1, countdownSeconds: 0 } });
    f.command({ type: 'start' }); f.score('messi', 99);
    const oldId = f.state().matchId;
    f.command({ type: 'reset' });
    expect(f.state().matchId).not.toBe(oldId);
    expect(f.state()).toMatchObject({ status: 'WAITING', round: 0, remainingMs: 120000,
      scores: { ronaldo: 0, messi: 0 }, totalScores: { ronaldo: 0, messi: 0 }, roundWins: { ronaldo: 0, messi: 0 },
      combos: { ronaldo: 0, messi: 0 }, teamMembers: [], topSupporters: [], giftHistory: [], roundResults: [], winner: null,
      config: { rounds: 1 }, connection: { clients: 2 } });
    expect(() => f.engine.execute({ type: 'start', matchId: oldId })).toThrow('Tran da thay doi');
  });

  it('only accepts validated commands/configuration and protects internal snapshots', () => {
    const f = fixture({ countdownSeconds: 0 });
    for (const input of [{ type: 'hack' }, { type: 'resume' }, { type: 'pause' },
      { type: 'start', scores: { ronaldo: 100 } },
      { type: 'configure', config: { ...DEFAULT_CONFIG, roundSeconds: -1 } }]) expect(() => f.command(input)).toThrow();
    const external = f.state(); external.scores.ronaldo = 999; external.config.rounds = 9;
    expect(f.state().scores.ronaldo).toBe(0); expect(f.state().config.rounds).toBe(3);
    f.command({ type: 'start' });
    expect(() => f.command({ type: 'configure', config: DEFAULT_CONFIG })).toThrow('WAITING');
    expect(() => f.command({ type: 'start' })).toThrow('WAITING');
    for (const points of [-1, 0, 0.5, NaN, Infinity, 1000001]) expect(() => f.score('messi', points)).toThrow();
    expect(f.state().scores.messi).toBe(0);
  });

  it.each(['COUNTDOWN', 'PLAYING', 'ROUND_END'] as const)('restores %s paused without consuming downtime', phase => {
    const f = fixture({ countdownSeconds: 1, roundSeconds: 1, roundBreakSeconds: 1 });
    f.command({ type: 'start' });
    if (phase === 'PLAYING') f.advance(1000);
    if (phase === 'ROUND_END') f.advance(2000);
    f.advance(321);
    const restored = fixture({}, f.state());
    restored.advance(999999);
    expect(restored.state()).toMatchObject({ matchId: f.state().matchId, status: 'PAUSED', pausedFrom: phase, remainingMs: 679 });
    restored.command({ type: 'resume' }); restored.advance(100);
    expect(restored.state().remainingMs).toBe(579);
  });

  it('restores an ended match without replaying results', () => {
    const f = fixture({ rounds: 1, roundSeconds: 1, countdownSeconds: 0, roundBreakSeconds: 0 });
    f.command({ type: 'start' }); f.score('messi', 1); f.advance(1000);
    const restored = fixture({}, f.state()); restored.advance(100000);
    expect(restored.state()).toMatchObject({ status: 'MATCH_END', winner: 'messi', roundResults: f.state().roundResults });
  });
});

describe('score arithmetic', () => {
  it('adds only to the selected team and handles draws', () => {
    const scores = { ronaldo: 10, messi: 20 };
    expect(addPoints(scores, 'ronaldo', 10)).toEqual({ ronaldo: 20, messi: 20 });
    expect(scores.ronaldo).toBe(10);
    expect(decideWinner({ ronaldo: 20, messi: 20 })).toBe('draw');
  });
  it('rejects overflow instead of silently losing precision', () => {
    expect(() => addPoints({ ronaldo: Number.MAX_SAFE_INTEGER, messi: 0 }, 'ronaldo', 1)).toThrow();
  });
});
