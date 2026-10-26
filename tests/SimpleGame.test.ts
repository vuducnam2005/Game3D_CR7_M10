import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../shared/game';
import { GameEngine } from '../server/game/GameEngine';

const simple = { ...DEFAULT_CONFIG, simpleMode: true, rounds: 1, countdownSeconds: 0, roundBreakSeconds: 0, tieBreaker: 'draw' as const };

describe('simple live game', () => {
  it('scores each flower and cookie once, plays one animation per gift, and ignores unrelated gifts', () => {
    let now = 0;
    const engine = new GameEngine({ ...simple, ronaldoSpeed: 2 }, () => now);
    const matchId = engine.getState().matchId;
    engine.execute({ type: 'start', matchId });
    const gift = (eventId: string, giftId: string, name: string, repeatCount: number) => engine.ingestLive({
      eventId, source: 'mock', timestamp: now, matchId, round: 1, user: { id: 'viewer', username: 'Viewer' }, type: 'gift',
      gift: { id: giftId, name, repeatCount, repeatEnd: true },
    });
    expect(gift('flower', 'rose', 'Rose', 3).points).toBe(3);
    expect(gift('cookie', 'cookie', 'Cookie', 2).points).toBe(2);
    expect(gift('other', 'trophy', 'Trophy', 1).points).toBe(0);
    expect(engine.getState().scores).toEqual({ ronaldo: 3, messi: 2 });
    const first = engine.getState().live.celebrations.ronaldo.active;
    expect(first).toMatchObject({ animation: 'SIUUU', count: 1, endsAt: 1992 });
    expect(engine.getState().live.celebrations.ronaldo.queued[0].count).toBe(2);
    expect(engine.getState().live.celebrations.messi.active?.animation).toBe('Messi Eat Cookie');
    now = 1992; engine.tick();
    expect(engine.getState().live.celebrations.ronaldo.active).toMatchObject({ count: 1, animation: 'SIUUU' });
    expect(engine.getState().live.celebrations.ronaldo.active?.id).not.toBe(first?.id);
    expect(engine.getState().live.celebrations.ronaldo.queued[0].count).toBe(1);
  });

  it('keeps unlimited time open until the admin finishes and preserves the final score', () => {
    let now = 0;
    const engine = new GameEngine({ ...simple, unlimitedTime: true }, () => now);
    const matchId = engine.getState().matchId;
    engine.execute({ type: 'start', matchId });
    now = 10_000_000; engine.tick();
    expect(engine.getState()).toMatchObject({ status: 'PLAYING', remainingMs: 0, round: 1 });
    engine.execute({ type: 'addScore', matchId, round: 1, team: 'messi', points: 2 });
    expect(engine.getState().live.celebrations.messi.active?.animation).toBe('Messi Eat Cookie');
    engine.execute({ type: 'finish', matchId });
    expect(engine.getState()).toMatchObject({ status: 'MATCH_END', winner: 'messi', scores: { ronaldo: 0, messi: 2 } });
  });
});
