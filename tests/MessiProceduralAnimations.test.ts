import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { createMessiProceduralAnimations, getRequiredMessiBones } from '../src/characters/MessiProceduralAnimations';
import { measureCharacter } from '../src/characters/CharacterNormalizer';
import { AnimationManager } from '../src/characters/AnimationManager';
import { loadModel, snapshotTransforms } from './modelFixtures';

describe('Messi procedural animations on the actual GLB', () => {
  it('preserves rest transforms and binds valid tracks to actual nodes', async () => {
    const gltf = await loadModel('messi_2023_3d_free.glb');
    gltf.scene.name = 'messi-animation-root';
    const before = snapshotTransforms(gltf.scene);
    const clips = createMessiProceduralAnimations(gltf.scene);
    expect(clips.map(c => c.name)).toEqual(['Messi Idle', 'Messi Celebrate', 'Messi Eat Cookie', 'Messi Victory']);
    expect(clips.every(c => c.validate())).toBe(true);
    expect(snapshotTransforms(gltf.scene)).toBe(before);
    for (const name of getRequiredMessiBones()) expect(gltf.scene.getObjectByName(name)).toBeDefined();
    for (const track of clips.flatMap(c => c.tracks)) {
      expect(gltf.scene.getObjectByName(track.name.slice(0, track.name.lastIndexOf('.')))).toBeDefined();
      expect(Array.from(track.values).every(Number.isFinite)).toBe(true);
    }
  });

  it('steps with a lifted foot and planted support foot, spreads arms, then raises them', async () => {
    const gltf = await loadModel('messi_2023_3d_free.glb');
    gltf.scene.name = 'messi-animation-root';
    const root = gltf.scene;
    const manager = new AnimationManager(root, createMessiProceduralAnimations(root), 'Messi Idle');
    const world = (name: string) => { root.updateMatrixWorld(true); return root.getObjectByName(name)!.getWorldPosition(new THREE.Vector3()); };
    const leftRest = world('mixamorigLeftFoot_05');
    const rightRest = world('mixamorigRightFoot_09');
    manager.seek('Messi Victory', 0.3);
    const leftStep = world('mixamorigLeftFoot_05');
    expect(leftStep.z).toBeGreaterThan(leftRest.z + 3);
    expect(leftStep.y).toBeGreaterThan(leftRest.y + 3);
    expect(world('mixamorigRightFoot_09').distanceTo(rightRest)).toBeLessThan(0.1);
    manager.seek('Messi Victory', 1.6);
    expect(world('mixamorigLeftHand_020').x).toBeGreaterThan(35);
    expect(world('mixamorigRightHand_029').x).toBeLessThan(-35);
    manager.seek('Messi Victory', 2.8);
    const headY = world('mixamorigHead_015').y;
    expect(world('mixamorigLeftHand_020').y).toBeGreaterThan(headY);
    expect(world('mixamorigRightHand_029').y).toBeGreaterThan(headY);
    const bounds = measureCharacter(root);
    expect(bounds.min[1]).toBeGreaterThan(-71);
    expect(bounds.size[0]).toBeLessThan(130);
    manager.seek('Messi Victory', 5.3);
    expect(world('mixamorigLeftFoot_05').distanceTo(leftRest)).toBeLessThan(0.1);
    expect(world('mixamorigRightFoot_09').distanceTo(rightRest)).toBeLessThan(0.1);
    manager.dispose();
  });
});
