// @vitest-environment jsdom
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { WebGLRenderer } from 'three';
import { monitorRenderer } from '../src/scene/RendererDiagnostics';
import { probeAsset } from '../src/characters/probeAsset';
import { ErrorBoundary } from '../src/ui/ErrorBoundary';
import { GameEngine } from '../server/game/GameEngine';
import { MockEventAdapter } from '../server/live/MockEventAdapter';
import { gameStateSchema } from '../shared/game';
import { TikTokNormalizer } from '../server/live/TikTokNormalizer';
import { OverlayView } from '../src/live/OverlayView';

vi.mock('../src/pages/StadiumPreview', () => ({ StadiumPreview: () => <div data-testid="scene" /> }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('explicit renderer and asset failures', () => {
  it('reports and recovers context loss, catches shader errors, and removes listeners', () => {
    const canvas = document.createElement('canvas');
    const original = vi.fn();
    const gl = { domElement: canvas, debug: { onShaderError: original } } as unknown as WebGLRenderer;
    const onError = vi.fn(); const dispose = monitorRenderer(gl, onError);
    const lost = new Event('webglcontextlost', { cancelable: true });
    canvas.dispatchEvent(lost);
    expect(lost.defaultPrevented).toBe(true); expect(onError).toHaveBeenLastCalledWith(expect.stringContaining('WEBGL CONTEXT LOST'));
    canvas.dispatchEvent(new Event('webglcontextrestored')); expect(onError).toHaveBeenLastCalledWith(null);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    gl.debug.onShaderError!({ getProgramInfoLog: () => 'compile', getShaderInfoLog: () => 'shader' } as unknown as WebGLRenderingContext, {} as Parameters<NonNullable<WebGLRenderer['debug']['onShaderError']>>[1], {} as WebGLShader, {} as WebGLShader);
    expect(onError).toHaveBeenLastCalledWith(expect.stringContaining('SHADER ERROR'));
    dispose(); const calls = onError.mock.calls.length;
    canvas.dispatchEvent(new Event('webglcontextlost')); expect(onError).toHaveBeenCalledTimes(calls);
    expect(gl.debug.onShaderError).toBe(original);
  });
  it.each([
    [404, 'application/octet-stream', '10', 'HTTP 404'],
    [200, 'text/html', '10', 'khong phai GLB'],
    [200, 'model/gltf-binary', '0', 'file rong'],
  ])('does not accept invalid GLB responses: %s/%s', async (status, mime, length, message) => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: Number(status), headers: { 'content-type': String(mime), 'content-length': String(length) } })));
    await expect(probeAsset('/models/player.glb', new AbortController().signal)).rejects.toThrow(String(message));
  });
  it('reports a successful probe with the real asset length', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { headers: { 'content-type': 'model/gltf-binary', 'content-length': '16139240' } })));
    expect(await probeAsset('/models/player.glb', new AbortController().signal)).toBe('HTTP 200 / 16,139,240 bytes');
  });
  it('keeps render errors visible and resets only after its scope changes', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    function Broken(): never { throw new Error('/models/player.glb: decoder failed'); }
    const onError = vi.fn();
    const view = render(<ErrorBoundary resetKey="one" onError={onError}><Broken /></ErrorBoundary>);
    expect(screen.getByRole('alert').textContent).toContain('decoder failed'); expect(onError).toHaveBeenCalledTimes(1);
    view.rerender(<ErrorBoundary resetKey="two"><span>Loaded</span></ErrorBoundary>);
    expect(screen.queryByRole('alert')).toBeNull(); expect(screen.getByText('Loaded')).toBeTruthy();
  });
});

describe('Like crowd interaction and persistence', () => {
  it('counts likes without points/membership, deduplicates after restore and expires the effect', () => {
    let now = 10000;
    const engine = new GameEngine(undefined, () => now);
    const mock = new MockEventAdapter(); mock.connect(event => engine.ingestLive(event));
    const request = { requestId: crypto.randomUUID(), matchId: engine.getState().matchId, round: 0,
      user: { id: 'viewer', username: 'Viewer' }, action: 'like', count: 10 };
    expect(mock.emit(request)[0]).toMatchObject({ status: 'accepted', points: 0 });
    expect(mock.emit(request)[0].status).toBe('duplicate');
    mock.emit({ ...request, requestId: crypto.randomUUID() });
    expect(engine.getState()).toMatchObject({ live: { likeCount: 20, crowdUntil: 12000, giftCount: 0 }, scores: { ronaldo: 0, messi: 0 }, teamMembers: [], topSupporters: [] });
    const restored = new GameEngine(undefined, () => now, engine.getState(), engine.getLiveRuntime());
    mock.connect(event => restored.ingestLive(event));
    expect(mock.emit(request)[0].status).toBe('duplicate');
    expect(restored.getState().live).toMatchObject({ likeCount: 20, crowdUntil: 0 });
    now = 12001; engine.tick(); expect(engine.getState().live.crowdUntil).toBe(0);
    engine.execute({ type: 'reset', matchId: request.matchId }); expect(engine.getState().live.likeCount).toBe(0);
  });
  it('migrates older snapshots and validates TikTok v3 delta count rather than room total', () => {
    const engine = new GameEngine(); const state = engine.getState();
    const old = JSON.parse(JSON.stringify(state)); delete old.live.likeCount; delete old.live.crowdUntil;
    expect(gameStateSchema.parse(old).live.likeCount).toBe(0);
    const normalizer = new TikTokNormalizer(); const now = Date.now();
    const input = { common: { roomId: '123', msgId: '42', createTime: String(now) }, user: { id: '456', nickname: 'Viewer' }, count: 7, total: '999999' };
    const context = { matchId: state.matchId, round: 0, scope: '1', acceptAfter: now - 1000, mappings: state.live.config.mappings };
    const event = normalizer.normalize('like', input, '123', context, now);
    expect(event).toMatchObject({ type: 'like', count: 7, team: null });
    engine.ingestLive(event); engine.ingestLive(event); expect(engine.getState().live.likeCount).toBe(7);
    expect(() => normalizer.normalize('like', { ...input, count: -1 }, '123', context, now)).toThrow();
  });
  it('shows a crowd cue and plays one sound per pulse, never on initial hydration', () => {
    const state = new GameEngine().getState(); state.live.crowdUntil = 1000;
    const audio = { setVolume: vi.fn(), configureFiles: vi.fn(), play: vi.fn() };
    const view = render(<OverlayView state={state} connected audio={audio as never} />);
    expect(screen.getByText(/CROWD CHEER/)).toBeTruthy(); expect(audio.play).not.toHaveBeenCalled();
    act(() => view.rerender(<OverlayView state={{ ...state, live: { ...state.live, crowdUntil: 2000 } }} connected audio={audio as never} />));
    view.rerender(<OverlayView state={{ ...state, live: { ...state.live, crowdUntil: 2000 } }} connected audio={audio as never} />);
    expect(audio.play).toHaveBeenCalledTimes(1); expect(audio.play).toHaveBeenCalledWith('crowd');
  });
});
