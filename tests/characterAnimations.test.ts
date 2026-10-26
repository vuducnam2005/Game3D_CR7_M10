import * as THREE from 'three';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { describe, expect, it } from 'vitest';
import { AnimationManager } from '../src/characters/AnimationManager';
import { getCharacterAnimations } from '../src/characters/characterAnimations';
import { measureCharacter } from '../src/characters/CharacterNormalizer';
import { inspectModel } from '../src/characters/modelInspection';
import { loadModel, snapshotTransforms } from './modelFixtures';

describe('cached animation clips and isolated render skeletons', () => {
  it.each([
    ['ronaldo', 'cristiano_ronaldo.glb', 'SIUUU', 'Point Up'],
    ['messi', 'messi_2023_3d_free.glb', 'mixamo.com', 'Messi Victory'],
  ] as const)('%s labels derived clips honestly and preserves original tracks', async (id, file, derivedName, proceduralName) => {
    const gltf = await loadModel(file);
    const originalData = JSON.stringify(gltf.animations.map(clip => THREE.AnimationClip.toJSON(clip)));
    const clips = getCharacterAnimations(id, gltf.scene, gltf.animations);
    const inspection = inspectModel(gltf.scene, measureCharacter(gltf.scene), 1, 3.15, clips, gltf.animations);
    expect(inspection.clips.find(clip => clip.name === derivedName)).toMatchObject({ source: 'DERIVED', procedural: false });
    expect(inspection.clips.find(clip => clip.name === proceduralName)).toMatchObject({ source: 'PROC', procedural: true });
    if (id === 'ronaldo') expect(inspection.clips.find(clip => clip.name === gltf.animations[0].name)?.source).toBe('GLB');
    expect(JSON.stringify(gltf.animations.map(clip => THREE.AnimationClip.toJSON(clip)))).toBe(originalData);
  });

  it.each([
    ['ronaldo', 'cristiano_ronaldo.glb', 'Idle', 'Point Up'],
    ['messi', 'messi_2023_3d_free.glb', 'Messi Idle', 'Messi Victory'],
  ] as const)('%s reuses clips without posing its source or another clone', async (id, file, idle, action) => {
    const gltf = await loadModel(file);
    const sourceRest = snapshotTransforms(gltf.scene);
    const clips = getCharacterAnimations(id, gltf.scene, gltf.animations);
    expect(getCharacterAnimations(id, gltf.scene, gltf.animations)).toBe(clips);
    expect(snapshotTransforms(gltf.scene)).toBe(sourceRest);
    const first = clone(gltf.scene);
    const second = clone(gltf.scene);
    first.name = second.name = `${id}-animation-root`;
    const secondRest = snapshotTransforms(second);
    const firstBones: THREE.Object3D[] = [];
    first.traverse(node => { if (node instanceof THREE.Bone) firstBones.push(node); });
    for (const bone of firstBones) expect(second.getObjectByName(bone.name)).not.toBe(bone);
    const manager = new AnimationManager(first, clips, idle);
    manager.seek(action, 1.5);
    expect(snapshotTransforms(first)).not.toBe(secondRest);
    expect(snapshotTransforms(second)).toBe(secondRest);
    expect(snapshotTransforms(gltf.scene)).toBe(sourceRest);
    manager.dispose();
  });

  it('grounds messi mixamo.com clip at Y=0 matching rest ground and ronaldo', async () => {
    const { calculateNormalization, measureCharacter } = await import('../src/characters/CharacterNormalizer');
    const { CHARACTER_CATALOG } = await import('../src/characters/modelCatalog');
    const gltf = await loadModel('messi_2023_3d_free.glb');
    const root = clone(gltf.scene);
    root.name = 'messi-animation-root';
    const norm = calculateNormalization(measureCharacter(root), CHARACTER_CATALOG.messi.targetHeight);
    const clips = getCharacterAnimations('messi', gltf.scene, gltf.animations);
    const mixamo = clips.find(c => c.name === 'mixamo.com');
    expect(mixamo).toBeDefined();

    const mixer = new THREE.AnimationMixer(root);
    mixer.clipAction(mixamo!).play();
    mixer.setTime(0);
    const measuredAt0 = measureCharacter(root);
    const groundYAt0 = (measuredAt0.min[1] + norm.offset[1]) * norm.scale;
    expect(Math.abs(groundYAt0)).toBeLessThan(0.01);

    mixer.setTime(0.5);
    const measuredAtMid = measureCharacter(root);
    const groundYAtMid = (measuredAtMid.min[1] + norm.offset[1]) * norm.scale;
    expect(groundYAtMid).toBeLessThan(0.05);
    expect(groundYAtMid).toBeGreaterThan(-0.02);
    mixer.stopAllAction();
    mixer.uncacheRoot(root);
  });
});
