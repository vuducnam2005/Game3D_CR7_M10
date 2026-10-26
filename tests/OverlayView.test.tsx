// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GameEngine } from '../server/game/GameEngine';
import { formatClock, OverlayView, scoreShare } from '../src/live/OverlayView';
import type { MockAudio } from '../src/live/MockAudio';

vi.mock('../src/pages/StadiumPreview', () => ({ StadiumPreview: () => <div data-testid="scene" /> }));
afterEach(cleanup);
describe('broadcast HUD', () => {
  it('shows server score/time and has no admin controls', () => {
    const state = new GameEngine().getState(); state.scores = { ronaldo: 123, messi: 456 }; state.remainingMs = 61100;
    render(<OverlayView state={state} connected />);
    expect(screen.getByTestId('overlay-ronaldo-score').textContent).toBe('123');
    expect(screen.getByTestId('overlay-messi-score').textContent).toBe('456');
    expect(screen.getByTestId('overlay-timer').textContent).toBe('01:02');
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(screen.getByText('MESSI LEADS')).toBeTruthy();
    expect(scoreShare(0, 0)).toBe(50); expect(scoreShare(30, 10)).toBe(75);
    expect(formatClock(0)).toBe('00:00');
  });
  it('honors HUD toggles without hiding scene or disconnect status', () => {
    const state = new GameEngine().getState();
    for (const key of Object.keys(state.presentation.hud) as (keyof typeof state.presentation.hud)[]) state.presentation.hud[key] = false;
    render(<OverlayView state={state} connected={false} />);
    expect(screen.queryByTestId('overlay-timer')).toBeNull();
    expect(screen.queryByLabelText('Overlay scores')).toBeNull();
    expect(screen.queryByLabelText('Gift and follow feed')).toBeNull();
    expect(screen.getByTestId('scene')).toBeTruthy();
    expect(screen.getByRole('status').textContent).toContain('RECONNECTING');
  });
  it('does not replay audio on timer updates or unmute; follows play once even with HUD hidden', () => {
    const state = new GameEngine().getState(); state.presentation.hud.feed = false;
    state.live.feed = [{ id: 'f1', kind: 'follow', username: 'Alice', team: null, text: 'Alice followed', expiresAt: 10000 }];
    const audio = { play: vi.fn(), setVolume: vi.fn(), configureFiles: vi.fn() } as unknown as MockAudio;
    const view = render(<OverlayView state={state} connected audio={audio} />);
    expect(audio.setVolume).toHaveBeenLastCalledWith(0); expect(audio.play).toHaveBeenCalledTimes(1);
    const updated = structuredClone(state); updated.remainingMs--; updated.presentation.muted = false; updated.presentation.volume = .3;
    view.rerender(<OverlayView state={updated} connected audio={audio} />);
    expect(audio.play).toHaveBeenCalledTimes(1); expect(audio.setVolume).toHaveBeenLastCalledWith(.3);
    updated.live.feed = [{ ...updated.live.feed[0], id: 'f2' }];
    view.rerender(<OverlayView state={structuredClone(updated)} connected audio={audio} />);
    expect(audio.play).toHaveBeenCalledTimes(2);
  });
});
