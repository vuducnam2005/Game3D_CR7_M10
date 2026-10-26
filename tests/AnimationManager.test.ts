import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { AnimationManager, type AnimationPlaybackState } from '../src/characters/AnimationManager';

function setup() {
  const root = new THREE.Group();
  root.name = 'actor';
  const clip = (name: string, end: number) => new THREE.AnimationClip(name, 1, [
    new THREE.NumberKeyframeTrack('actor.position[x]', [0, 1], [0, end]),
  ]);
  let state: AnimationPlaybackState | undefined;
  const manager = new AnimationManager(root, [clip('Idle', 0), clip('SIUUU', 2), clip('Other', 3)], 'Idle', next => { state = next; });
  return { root, manager, state: () => state };
}

describe('AnimationManager', () => {
  it('keeps cue identity on the rendered clip and lets results supersede a gift queue', () => {
    const { manager } = setup();
    manager.play('SIUUU', { request: 1 });
    manager.play('Other', { request: 2 });
    expect(manager.frame.request).toBe(1);
    manager.update(1.01);
    expect(manager.frame.request).toBe(2);
    manager.clearQueue();
    manager.play('Other', { request: 3, queue: false });
    expect(manager.frame.request).toBe(3);
    expect(manager.frame.time).toBe(0);
    manager.dispose();
  });
  it('clears stale queued actions on a match/round change without cutting the current animation', () => {
    const { manager, state } = setup();
    manager.play('SIUUU'); manager.play('Other');
    manager.clearQueue();
    expect(state()?.current).toBe('SIUUU');
    expect(state()?.queued).toEqual([]);
    manager.update(1.01);
    expect(state()?.current).toBe('Idle');
    manager.dispose();
  });
  it('applies zero-fade playback and paused pose seeking without reverting to rest', () => {
    const { manager, root, state } = setup();
    manager.seek('SIUUU', 0.5);
    expect(root.position.x).toBeCloseTo(1);
    expect(state()?.paused).toBe(true);
    manager.update(1);
    expect(root.position.x).toBeCloseTo(1);
    manager.setPaused(false);
    manager.update(0.6);
    manager.update(0.3);
    expect(state()?.current).toBe('Idle');
    expect(root.position.x).toBeCloseTo(0);
    manager.dispose();
  });

  it('queues one-shots, blocks spam, and returns to Idle', () => {
    const clock = vi.spyOn(performance, 'now');
    clock.mockReturnValue(1000);
    const { manager, state } = setup();
    expect(manager.play('SIUUU')).toBe('played');
    expect(manager.play('SIUUU')).toBe('ignored');
    expect(manager.play('Other')).toBe('queued');
    expect(state()?.queued).toEqual(['Other']);
    manager.update(1.01);
    expect(state()?.current).toBe('Other');
    manager.update(1.01);
    expect(state()?.current).toBe('Idle');
    expect(state()?.queued).toEqual([]);
    manager.dispose();
    clock.mockRestore();
  });

  it('ignores unknown clips and clamps speed', () => {
    const { manager, state } = setup();
    expect(manager.play('missing')).toBe('ignored');
    manager.setSpeed(20);
    expect(state()?.speed).toBe(2.5);
    manager.setSpeed(0);
    expect(state()?.speed).toBe(0.1);
    manager.dispose();
  });

  it('caps the queue at four distinct actions and drains in order', () => {
    const clock = vi.spyOn(performance, 'now').mockReturnValue(1000);
    const root = new THREE.Group();
    const clips = ['Idle', 'First', 'A', 'B', 'C', 'D', 'Overflow'].map(name => new THREE.AnimationClip(name, 1, []));
    let state: AnimationPlaybackState | undefined;
    const manager = new AnimationManager(root, clips, 'Idle', next => { state = next; });
    try {
      manager.play('First');
      expect(manager.play('A')).toBe('queued');
      clock.mockReturnValue(1500);
      expect(manager.play('A')).toBe('queued');
      expect(state?.queued).toEqual(['A']);
      for (const name of ['B', 'C', 'D']) expect(manager.play(name)).toBe('queued');
      expect(manager.play('Overflow')).toBe('ignored');
      expect(state?.queued).toEqual(['A', 'B', 'C', 'D']);
      for (const name of ['A', 'B', 'C', 'D', 'Idle']) {
        manager.update(1.01);
        expect(state?.current).toBe(name);
      }
      expect(state?.queued).toEqual([]);
    } finally {
      manager.dispose();
      clock.mockRestore();
    }
  });
});
