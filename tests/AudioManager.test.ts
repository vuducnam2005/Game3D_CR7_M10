import { afterEach, describe, expect, it, vi } from 'vitest';
import { AudioManager } from '../src/live/AudioManager';

function audioFixture() {
  const sources: { start: ReturnType<typeof vi.fn>; stop: ReturnType<typeof vi.fn>; disconnect: ReturnType<typeof vi.fn>; onended: (() => void) | null; buffer?: unknown }[] = [];
  const gains: { gain: { setValueAtTime: ReturnType<typeof vi.fn>; exponentialRampToValueAtTime: ReturnType<typeof vi.fn> }; connect: ReturnType<typeof vi.fn>; disconnect: ReturnType<typeof vi.fn> }[] = [];
  function source() { const value = { frequency: { setValueAtTime: vi.fn() }, start: vi.fn(), stop: vi.fn(), connect: vi.fn(), disconnect: vi.fn(), onended: null }; sources.push(value); return value; }
  const context = { state: 'suspended', currentTime: 0, destination: {}, resume: async () => { context.state = 'running'; }, close: vi.fn(async () => undefined),
    createOscillator: vi.fn(source), createBufferSource: vi.fn(source),
    createGain: () => { const value = { gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() }, connect: vi.fn(), disconnect: vi.fn() }; gains.push(value); return value; },
    decodeAudioData: vi.fn(async () => ({ duration: .5, numberOfChannels: 1 })),
  };
  vi.stubGlobal('AudioContext', class { constructor() { return context; } });
  return { context, sources, gains };
}
afterEach(() => vi.unstubAllGlobals());

describe('bounded audio manager', () => {
  it('caps overlap, disconnects evicted sources, applies master gain and stops active output on mute', async () => {
    const { context, sources, gains } = audioFixture(); const audio = new AudioManager();
    expect(audio.play('gift')).toBe(false); await audio.unlock();
    for (let i = 0; i < 7; i++) { context.currentTime = i * .3; audio.play('gift'); }
    expect(audio.diagnostics.voices).toBe(4);
    expect(sources[0].disconnect).toHaveBeenCalledOnce();
    audio.setVolume(.3); expect(gains[0].gain.setValueAtTime).toHaveBeenLastCalledWith(.3, context.currentTime);
    audio.setVolume(0); expect(audio.diagnostics.voices).toBe(0);
    expect(sources.every(source => source.disconnect.mock.calls.length === 1)).toBe(true);
    expect(audio.play('victory')).toBe(false);
    audio.dispose(); expect(context.close).toHaveBeenCalledOnce();
  });
  it('releases natural endings and rate-limits rapid duplicates', async () => {
    const { sources, context } = audioFixture(); const audio = new AudioManager(); await audio.unlock();
    expect(audio.play('siuuu')).toBe(true); expect(audio.play('siuuu')).toBe(false);
    context.currentTime = .15; expect(audio.play('siuuu')).toBe(false);
    sources[0].onended?.(); expect(audio.diagnostics.voices).toBe(0);
    audio.dispose();
  });
  it('uses decoded local files, falls back on failure, and never plays when loading completes', async () => {
    const { context } = audioFixture();
    const fetcher = vi.fn(async (path: string) => path.includes('missing') ? new Response('', { status: 404 }) : new Response(new Uint8Array([1, 2, 3])));
    vi.stubGlobal('fetch', fetcher);
    const audio = new AudioManager(); audio.configureFiles({ siuuu: '/audio/mine.wav', messi: '/audio/missing.wav' });
    expect(fetcher).not.toHaveBeenCalled(); await audio.unlock();
    await vi.waitFor(() => expect(audio.diagnostics.loaded).toBe(1));
    expect(audio.diagnostics.fallback).toEqual(['messi']);
    expect(context.createBufferSource).not.toHaveBeenCalled();
    audio.play('siuuu'); expect(context.createBufferSource).toHaveBeenCalledOnce();
    context.currentTime = 1; audio.play('messi'); expect(context.createOscillator).toHaveBeenCalledOnce();
    audio.dispose();
  });
  it('rejects oversized/long audio and clears old decoded files on reconfiguration', async () => {
    const { context } = audioFixture(); context.decodeAudioData.mockResolvedValue({ duration: 9, numberOfChannels: 1 });
    vi.stubGlobal('fetch', vi.fn(async (path: string) => path.includes('big') ? new Response('', { headers: { 'content-length': '5000000' } }) : new Response(new Uint8Array([1]))));
    const audio = new AudioManager(); audio.configureFiles({ gift: '/audio/big.wav', siuuu: '/audio/long.wav' }); await audio.unlock();
    await vi.waitFor(() => expect(audio.diagnostics.fallback.length).toBe(2));
    expect(audio.diagnostics.loaded).toBe(0);
    expect(context.decodeAudioData).toHaveBeenCalledOnce();
    audio.configureFiles({}); expect(audio.diagnostics.fallback).toEqual([]);
    audio.dispose();
  });
});
