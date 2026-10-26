// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, act } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Overlay } from '../src/pages/Overlay';

const audio = vi.hoisted(() => ({ unlock: vi.fn(async () => true), dispose: vi.fn() }));
vi.mock('../src/hooks/useGameServer', () => ({ useGameServer: () => ({ snapshot: null, connected: false }) }));
vi.mock('../src/live/OverlayView', () => ({ OverlayView: () => <div /> }));
vi.mock('../src/live/MockAudio', () => ({ MockAudio: class { unlock = audio.unlock; dispose = audio.dispose; } }));
afterEach(() => {
  cleanup(); vi.restoreAllMocks(); vi.clearAllMocks(); vi.useRealTimers();
  Reflect.deleteProperty(document.documentElement, 'requestFullscreen');
  Reflect.deleteProperty(document, 'fullscreenElement'); Reflect.deleteProperty(document, 'exitFullscreen');
});
describe('overlay browser gestures', () => {
  it('reports fullscreen changes and exits on a second gesture or Escape', () => {
    const exit = vi.fn(async () => undefined);
    Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: document.documentElement });
    Object.defineProperty(document, 'exitFullscreen', { configurable: true, value: exit });
    render(<Overlay />); fireEvent(document, new Event('fullscreenchange'));
    expect(screen.getByRole('main').getAttribute('data-fullscreen')).toBe('true');
    fireEvent.doubleClick(window); fireEvent.keyDown(window, { key: 'Escape' });
    expect(exit).toHaveBeenCalledTimes(2);
  });
  it('requests fullscreen only on F or double-click and unlocks audio on gesture', () => {
    const fullscreen = vi.fn(async () => undefined);
    Object.defineProperty(document.documentElement, 'requestFullscreen', { configurable: true, value: fullscreen });
    const view = render(<Overlay />);
    expect(fullscreen).not.toHaveBeenCalled(); expect(audio.unlock).not.toHaveBeenCalled();
    fireEvent.keyDown(window, { key: 'f' }); fireEvent.doubleClick(window); fireEvent.pointerDown(window);
    expect(fullscreen).toHaveBeenCalledTimes(2); expect(audio.unlock).toHaveBeenCalledTimes(2);
    expect(document.documentElement.classList.contains('broadcast-page')).toBe(true);
    view.unmount(); fireEvent.keyDown(window, { key: 'f' });
    expect(fullscreen).toHaveBeenCalledTimes(2); expect(audio.dispose).toHaveBeenCalledOnce();
    expect(document.documentElement.classList.contains('broadcast-page')).toBe(false);
  });
  it('shows a temporary fallback when the embedded browser does not expose Fullscreen API', () => {
    vi.useFakeTimers();
    Object.defineProperty(document.documentElement, 'requestFullscreen', { configurable: true, value: undefined });
    render(<Overlay />); fireEvent.doubleClick(window);
    expect(screen.getByText(/Fullscreen unavailable/)).toBeTruthy();
    act(() => vi.advanceTimersByTime(5000)); expect(screen.queryByText(/Fullscreen unavailable/)).toBeNull();
  });
});
