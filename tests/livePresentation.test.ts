import { afterEach, describe, expect, it, vi } from 'vitest';
import { MockAudio } from '../src/live/MockAudio';
import { ANIMATION_MS } from '../server/live/CelebrationQueue';
import { CHARACTER_CATALOG } from '../src/characters/modelCatalog';
import { getCharacterAnimations } from '../src/characters/characterAnimations';
import { loadModel } from './modelFixtures';

afterEach(() => vi.unstubAllGlobals());
describe('live presentation contract', () => {
  it.each(['ronaldo', 'messi'] as const)('matches the server queue durations to actual %s animation clips', async team => {
    const gltf = await loadModel(CHARACTER_CATALOG[team].sourceFile);
    const clips = getCharacterAnimations(team, gltf.scene, gltf.animations);
    for (const [name, duration] of Object.entries(ANIMATION_MS)) {
      if (name.startsWith('Messi ') !== (team === 'messi')) continue;
      const clip = clips.find(clip => clip.name === name);
      expect(clip, name).toBeDefined();
      expect(Math.abs(clip!.duration * 1000 - duration)).toBeLessThan(1);
    }
  });

  it('requires audio unlock, plays the first follow, limits spam, honors none and disposes', async () => {
    const start = vi.fn(); const stop = vi.fn(); const close = vi.fn(async () => undefined);
    const context = {
      state: 'suspended', currentTime: 0, destination: {},
      resume: async () => { context.state = 'running'; }, close,
      createOscillator: () => ({ frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() }, connect: vi.fn(), disconnect: vi.fn(), start, stop, onended: null }),
      createGain: () => ({ gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() }, connect: vi.fn(), disconnect: vi.fn() }),
    };
    vi.stubGlobal('AudioContext', class { constructor() { return context; } });
    const audio = new MockAudio();
    audio.play('follow'); expect(start).not.toHaveBeenCalled();
    expect(await audio.unlock()).toBe(true);
    audio.play('follow'); expect(start).toHaveBeenCalledTimes(1);
    audio.play('gift'); expect(start).toHaveBeenCalledTimes(1);
    context.currentTime = 1;
    audio.play('none'); expect(start).toHaveBeenCalledTimes(1);
    audio.play('boost'); expect(start).toHaveBeenCalledTimes(2);
    expect(stop).toHaveBeenLastCalledWith(1.48);
    audio.dispose(); expect(close).toHaveBeenCalledOnce();
  });
});
