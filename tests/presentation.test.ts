import { describe, expect, it } from 'vitest';
import { GameEngine } from '../server/game/GameEngine';
import { DEFAULT_CONFIG, gameStateSchema } from '../shared/game';
import { DEFAULT_PRESENTATION } from '../shared/presentation';

describe('broadcast state and commands', () => {
  it('migrates phase-5 state without changing scores or match ID', () => {
    const state = new GameEngine().getState();
    const { presentation: _p, leadChange: _l, ...legacy } = state;
    expect(gameStateSchema.parse(legacy)).toEqual({ ...state, presentation: DEFAULT_PRESENTATION, leadChange: null });
  });
  it('merges independent presentation patches and preserves them across reset and restart', () => {
    const engine = new GameEngine(); const matchId = engine.getState().matchId;
    engine.execute({ type: 'presentation', matchId, patch: { hud: { scores: false }, volume: .2 } });
    engine.execute({ type: 'presentation', matchId, patch: { hud: { feed: false }, background: 'transparent' } });
    expect(engine.getState().presentation).toMatchObject({ hud: { scores: false, feed: false, hints: true }, volume: .2 });
    const expected = engine.getState().presentation;
    engine.execute({ type: 'reset', matchId });
    const restored = new GameEngine(DEFAULT_CONFIG, () => 0, engine.getState(), engine.getLiveRuntime());
    expect(restored.getState().presentation).toEqual(expected);
    expect(restored.getState().matchId).not.toBe(matchId);
  });
  it.each([{ volume: 2 }, { camera: 'invalid' }, { hud: { unknown: false } }, {}, { effects: 'off' }])('rejects invalid presentation patch %j', patch => {
    const engine = new GameEngine();
    expect(() => engine.execute({ type: 'presentation', matchId: engine.getState().matchId, patch })).toThrow();
    expect(engine.getState().presentation).toEqual(DEFAULT_PRESENTATION);
  });
  it('queues manual animations without scores, gifts, supporters or follower changes', () => {
    const engine = new GameEngine(); const before = engine.getState();
    for (let i = 0; i < 10; i++) engine.execute({ type: 'animate', matchId: before.matchId, team: 'ronaldo', animation: 'SIUUU' });
    const after = engine.getState();
    expect(after.live.celebrations.ronaldo.active).toMatchObject({ animation: 'SIUUU', count: 0, sound: 'none' });
    expect(after.live.celebrations.ronaldo.queued.length).toBeLessThanOrEqual(4);
    expect(after.scores).toEqual(before.scores); expect(after.totalScores).toEqual(before.totalScores);
    expect(after.live.giftCount).toBe(0); expect(after.topSupporters).toEqual([]);
    expect(after.live.followerCount).toBe(0);
    expect(() => engine.execute({ type: 'animate', matchId: before.matchId, team: 'messi', animation: 'SIUUU' })).toThrow('skeleton');
    expect(() => engine.execute({ type: 'animate', matchId: '00000000-0000-4000-8000-000000000000', team: 'messi', animation: 'Messi Victory' })).toThrow('Tran da thay doi');
  });
  it('broadcasts lead changes once, expires them on the server, and clears on ties/reset', () => {
    let now = 0;
    const engine = new GameEngine({ ...DEFAULT_CONFIG, countdownSeconds: 0 }, () => now);
    const matchId = engine.getState().matchId;
    engine.execute({ type: 'start', matchId });
    const score = (team: 'ronaldo' | 'messi', points: number) => engine.execute({ type: 'addScore', matchId, round: 1, team, points });
    score('ronaldo', 10); expect(engine.getState().leadChange).toEqual({ team: 'ronaldo', endsAt: 3000 });
    now = 1000; score('ronaldo', 10); expect(engine.getState().leadChange?.endsAt).toBe(3000);
    score('messi', 20); expect(engine.getState().leadChange).toBeNull();
    score('messi', 10); expect(engine.getState().leadChange?.team).toBe('messi');
    now = 4000; engine.tick(); expect(engine.getState().leadChange).toBeNull();
    score('ronaldo', 100); engine.execute({ type: 'reset', matchId }); expect(engine.getState().leadChange).toBeNull();
  });
});
