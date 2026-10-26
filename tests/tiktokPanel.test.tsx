// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { GameEngine } from '../server/game/GameEngine';
import { LiveConnectionPanel } from '../src/live/LiveConnectionPanel';

afterEach(cleanup);
it('shows unconfigured state and keeps connect disabled without credentials', () => {
  render(<LiveConnectionPanel state={new GameEngine().getState()} disabled={false} send={vi.fn()} />);
  expect((screen.getByRole('button', { name: 'Connect TikTok' }) as HTMLButtonElement).disabled).toBe(true);
  expect(screen.getByTestId('tiktok-status').textContent).toBe('UNCONFIGURED');
  expect(screen.getByText(/Chua kiem thu voi phien LIVE that/)).toBeTruthy();
});
it('sends only validated connection actions and allows cancel during retry', () => {
  const state = new GameEngine().getState(); const send = vi.fn(async () => {});
  state.connection.tiktok = { ...state.connection.tiktok, configured: true, username: 'public_user', status: 'DISCONNECTED' };
  const view = render(<LiveConnectionPanel state={state} disabled={false} send={send} />);
  fireEvent.click(screen.getByRole('button', { name: 'Connect TikTok' }));
  expect(send).toHaveBeenCalledWith({ type: 'liveConnection', matchId: state.matchId, action: 'connect' });
  state.connection.tiktok.status = 'RETRYING';
  view.rerender(<LiveConnectionPanel state={state} disabled={false} send={send} />);
  expect((screen.getByRole('button', { name: 'Connect TikTok' }) as HTMLButtonElement).disabled).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: 'Use Mock / Stop retry' }));
  expect(send).toHaveBeenLastCalledWith({ type: 'liveConnection', matchId: state.matchId, action: 'mock' });
});
