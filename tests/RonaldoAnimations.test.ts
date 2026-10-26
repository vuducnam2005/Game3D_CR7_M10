import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { createRonaldoAnimations } from '../src/characters/RonaldoAnimations';
import { calculateNormalization, measureCharacter } from '../src/characters/CharacterNormalizer';
import { AnimationManager } from '../src/characters/AnimationManager';
import { createRonaldoProceduralAnimations } from '../src/characters/RonaldoProceduralAnimations';
import { snapshotTransforms } from './modelFixtures';

async function loadRonaldo() {
  const buffer = await readFile(new URL('../cristiano_ronaldo.glb', import.meta.url));
  const loader = new GLTFLoader().register(parser => {
    parser.loadTexture = async () => null as unknown as THREE.Texture;
    return { name: 'CPU_TEST_NO_IMAGE_DECODING' };
  });
  return loader.parseAsync(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength), '');
}

describe('replacement Ronaldo GLB', () => {
  it('loads the actual rig and derives isolated Idle/SIUUU clips without altering originals', async () => {
    const gltf = await loadRonaldo();
    const original = gltf.animations[0];
    const originalJSON = JSON.stringify(original.toJSON());
    const generated = createRonaldoAnimations(gltf.animations);
    expect(gltf.animations).toHaveLength(1);
    expect(original.tracks).toHaveLength(1249);
    expect(generated.map(c => c.name)).toEqual(['Idle', 'SIUUU']);
    expect(generated[1].duration).toBeCloseTo(3.983333, 5);
    expect(generated.every(c => c.validate())).toBe(true);
    expect(JSON.stringify(original.toJSON())).toBe(originalJSON);
    expect(generated[1].tracks[0].values).not.toBe(original.tracks[0].values);

    const model = clone(gltf.scene);
    const bones: THREE.Object3D[] = [];
    model.traverse(o => { if (o instanceof THREE.Bone) bones.push(o); });
    expect(bones).toHaveLength(435);
    const bounds = measureCharacter(model);
    expect(bounds.size[1]).toBeCloseTo(1.826373, 5);
    expect(calculateNormalization(bounds, 3.15).scale).toBeCloseTo(1.724728, 5);
    const manager = new AnimationManager(model, generated, 'Idle');
    manager.seek('SIUUU', 2);
    const jump = measureCharacter(model);
    expect(jump.min[1]).toBeGreaterThan(0.5);
    expect(jump.max[1]).toBeGreaterThan(2.6);
    manager.seek('Idle', 1.5);
    const idle = measureCharacter(model);
    expect(idle.size[1]).toBeGreaterThan(1.7);
    expect(idle.size[1]).toBeLessThan(1.9);
    manager.dispose();
  });

  it('fails clearly if the verified embedded clip is absent', () => {
    expect(() => createRonaldoAnimations([])).toThrow('missing the verified clip');
  });

  it('authors four distinct Rigify actions without changing rest pose or exploding the mesh', async () => {
    const gltf = await loadRonaldo();
    gltf.scene.name = 'ronaldo-animation-root';
    const derived = createRonaldoAnimations(gltf.animations);
    const rest = snapshotTransforms(gltf.scene);
    const procedural = createRonaldoProceduralAnimations(gltf.scene, derived[0]);
    expect(snapshotTransforms(gltf.scene)).toBe(rest);
    expect(procedural.map(c => c.name)).toEqual(['Calma', 'Sleep', 'Power Pose', 'Point Up']);
    const manager = new AnimationManager(gltf.scene, [...derived, ...procedural], 'Idle');
    for (const clip of procedural) {
      expect(clip.validate()).toBe(true);
      for (const time of [0, 0.5, 1.5, 2.5, 2.99]) {
        manager.seek(clip.name, time);
        const bounds = measureCharacter(gltf.scene);
        expect(bounds.min[1]).toBeGreaterThan(-0.01);
        expect(bounds.size[1]).toBeGreaterThan(1.6);
        expect(bounds.size[1]).toBeLessThan(2.6);
        expect(bounds.size[0]).toBeLessThan(2.1);
      }
    }
    manager.seek('Point Up', 1.5);
    gltf.scene.updateMatrixWorld(true);
    const world = (name: string) => gltf.scene.getObjectByName(name)!.getWorldPosition(new THREE.Vector3());
    expect(world('DEF-handR_429').y).toBeGreaterThan(world('DEF-spine006_58').y);
    manager.dispose();
  });
});
