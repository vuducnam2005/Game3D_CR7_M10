// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GameEngine } from '../server/game/GameEngine';
import { DEFAULT_CONFIG, gameStateSchema } from '../shared/game';
import { presentationPatchSchema } from '../shared/presentation';
import { OverlayView } from '../src/live/OverlayView';
import { animationMarkers, effectBudget, resultPresentation } from '../src/live/presentationEvents';
import type { MockAudio } from '../src/live/MockAudio';

vi.mock('../src/pages/StadiumPreview', () => ({ StadiumPreview: () => <div data-testid="scene" /> }));
afterEach(() => { cleanup(); vi.useRealTimers(); });

describe('phase 7 result presentation', () => {
  it('announces round start once, including countdown, and does not replay on resume', () => {
    const audio = { setVolume: vi.fn(), configureFiles: vi.fn(), play: vi.fn() } as unknown as MockAudio;
    const state = new GameEngine().getState();
    const view = render(<OverlayView state={state} connected audio={audio} />);
    const next = structuredClone(state); next.status = 'COUNTDOWN'; next.round = 1; next.remainingMs = 3000;
    view.rerender(<OverlayView state={structuredClone(next)} connected audio={audio} />);
    expect(screen.getByText('GET READY')).toBeTruthy();
    next.status = 'PLAYING'; next.remainingMs = 120000;
    view.rerender(<OverlayView state={structuredClone(next)} connected audio={audio} />);
    expect(screen.getByText('ROUND START / MAKE SOME NOISE')).toBeTruthy();
    next.status = 'PAUSED'; next.pausedFrom = 'PLAYING';
    view.rerender(<OverlayView state={structuredClone(next)} connected audio={audio} />);
    next.status = 'PLAYING'; next.pausedFrom = null;
    view.rerender(<OverlayView state={structuredClone(next)} connected audio={audio} />);
    expect(audio.play).toHaveBeenCalledExactlyOnceWith('roundStart');
  });
  it('uses the round result then the match winner, even when the final-round leader lost the match', () => {
    const state = new GameEngine().getState();
    state.status = 'ROUND_END'; state.round = 3; state.scores = { ronaldo: 10, messi: 50 };
    state.totalScores = { ronaldo: 200, messi: 100 }; state.roundWins = { ronaldo: 2, messi: 1 };
    state.roundResults = [{ round: 3, overtime: false, scores: state.scores, winner: 'messi' }];
    expect(resultPresentation(state)?.outcome).toBe('messi');
    state.status = 'MATCH_END'; state.winner = 'ronaldo';
    expect(resultPresentation(state)).toMatchObject({ outcome: 'ronaldo', match: true, scores: state.totalScores });
    render(<OverlayView state={state} connected />);
    expect(screen.getByText('200 : 100 / TOTAL POINTS')).toBeTruthy();
    expect(screen.getAllByText('RONALDO WINS!').length).toBeGreaterThan(0);
    expect(screen.queryByText('MESSI WINS!')).toBeNull();
  });

  it.each(['ronaldo', 'messi', 'draw'] as const)('follows actual engine outcome: %s', winner => {
    let now = 0;
    const engine = new GameEngine({ ...DEFAULT_CONFIG, rounds: 1, roundSeconds: 1, countdownSeconds: 0, roundBreakSeconds: 1 }, () => now);
    const matchId = engine.getState().matchId;
    engine.execute({ type: 'start', matchId });
    if (winner !== 'draw') engine.execute({ type: 'addScore', matchId, round: 1, team: winner, points: 10 });
    now = 1000; engine.tick();
    expect(resultPresentation(engine.getState())?.outcome).toBe(winner);
    now = 2000; engine.tick();
    const state = engine.getState();
    expect(resultPresentation(state)?.outcome).toBe(winner);
    if (winner === 'draw') {
      render(<OverlayView state={state} connected />);
      expect(screen.getAllByText('MATCH DRAW').length).toBe(2);
      expect(screen.queryByText(/WINS!/)).toBeNull();
    }
  });

  it('keeps paused round results and clears them for overtime or a new round', () => {
    const state = new GameEngine().getState(); state.status = 'PAUSED'; state.pausedFrom = 'ROUND_END';
    state.roundResults = [{ round: 1, overtime: false, scores: { ronaldo: 0, messi: 0 }, winner: 'draw' }];
    expect(resultPresentation(state)?.outcome).toBe('draw');
    state.status = 'COUNTDOWN'; state.overtime = true;
    expect(resultPresentation(state)).toBeNull();
  });

  it('shows ranked contribution rows safely and announces a new supporter leader once', () => {
    vi.useFakeTimers();
    const state = new GameEngine().getState(); state.status = 'PLAYING'; state.remainingMs = 30000;
    const view = render(<OverlayView state={state} connected />);
    const updated = structuredClone(state);
    updated.topSupporters = [{ userId: 'u1', username: '<img src=x onerror=alert(1)>', team: 'messi', giftCount: 3, contribution: 30 }];
    view.rerender(<OverlayView state={updated} connected />);
    expect(screen.getByText(/NEW MESSI SUPPORTER #1/)).toBeTruthy();
    updated.status = 'MATCH_END'; updated.winner = 'messi';
    view.rerender(<OverlayView state={structuredClone(updated)} connected />);
    const panel = screen.getByLabelText('Top supporters');
    expect(panel.querySelector('img')).toBeNull();
    expect(panel.textContent).toContain('3 GIFTS'); expect(panel.textContent).toContain('30PTS');
    expect(panel.textContent).toContain('<img src=x onerror=alert(1)>');
  });

  it('deduplicates countdown and outcome audio on snapshots, resume and volume changes', () => {
    const audio = { setVolume: vi.fn(), configureFiles: vi.fn(), play: vi.fn() } as unknown as MockAudio;
    const state = new GameEngine().getState(); state.status = 'PLAYING'; state.round = 1; state.remainingMs = 11000;
    const view = render(<OverlayView state={state} connected audio={audio} />);
    const next = structuredClone(state); next.remainingMs = 9900;
    view.rerender(<OverlayView state={structuredClone(next)} connected audio={audio} />);
    next.remainingMs = 9100; next.presentation.muted = false;
    view.rerender(<OverlayView state={structuredClone(next)} connected audio={audio} />);
    expect(audio.play).toHaveBeenCalledExactlyOnceWith('countdown');
    expect(screen.getByText('FINAL SECONDS')).toBeTruthy();
    next.status = 'MATCH_END'; next.winner = 'messi';
    view.rerender(<OverlayView state={structuredClone(next)} connected audio={audio} />);
    view.rerender(<OverlayView state={structuredClone(next)} connected audio={audio} />);
    expect(audio.play).toHaveBeenCalledTimes(2);
    expect(audio.play).toHaveBeenLastCalledWith('victory');
    view.rerender(<OverlayView state={structuredClone(next)} connected={false} audio={audio} />);
    expect(audio.setVolume).toHaveBeenLastCalledWith(0);
  });
});

describe('effect budgets and settings migration', () => {
  it('reduces work in Low, disables heavy effects independently, and removes motion when requested', () => {
    const standard = effectBudget('standard', true, true, false);
    const low = effectBudget('low', true, true, false);
    expect(low.confetti + low.particles + low.stars).toBeLessThan(standard.confetti / 2);
    expect(low.flash).toBe(false);
    expect(effectBudget('high', true, false, false)).toMatchObject({ confetti: 0, flash: false });
    expect(effectBudget('high', true, true, true)).toEqual({ particles: 0, confetti: 0, stars: 0, flash: false });
    expect(effectBudget('high', false, true, false)).toEqual({ particles: 0, confetti: 0, stars: 0, flash: false });
  });
  it('places SIUUU audio at the actual landing marker', () => {
    const markers = animationMarkers({ name: 'SIUUU', time: 0, duration: 3.984, paused: false });
    expect(markers.find(item => item.kind === 'siuuu')?.at).toBe(2.62);
    expect(animationMarkers({ name: 'Messi Idle', time: 0, duration: 2, paused: false })).toEqual([]);
  });
  it('loads old settings and does not inject defaults into unrelated patches', () => {
    const old = JSON.parse(JSON.stringify(new GameEngine().getState()));
    delete old.presentation.heavyEffects; delete old.presentation.trophy; delete old.presentation.audioFiles;
    expect(gameStateSchema.parse(old).presentation).toMatchObject({ heavyEffects: true, trophy: true, audioFiles: {} });
    expect(presentationPatchSchema.parse({ volume: .2 })).toEqual({ volume: .2 });
    const engine = new GameEngine(); const matchId = engine.getState().matchId;
    engine.execute({ type: 'presentation', matchId, patch: { heavyEffects: false, audioFiles: { siuuu: '/audio/my-effect.wav' } } });
    engine.execute({ type: 'presentation', matchId, patch: { volume: .2 } });
    expect(engine.getState().presentation).toMatchObject({ heavyEffects: false, audioFiles: { siuuu: '/audio/my-effect.wav' } });
    engine.execute({ type: 'reset', matchId });
    expect(engine.getState().presentation.heavyEffects).toBe(false);
  });
  it.each(['https://example.com/a.mp3', '/audio/../secret.wav', '/audio/%2e%2e/a.mp3', '/audio/a.svg', 'C:\\audio.wav'])('rejects nonlocal or invalid audio path %s', path => {
    expect(presentationPatchSchema.safeParse({ audioFiles: { siuuu: path } }).success).toBe(false);
  });
});
