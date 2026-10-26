import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { ACTION_BOUNDS, cameraPose, CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR, FRAME_CORNERS, getDirectedMode, landingShake, PLAYER_X, type CameraMode } from '../src/scene/cameraRig';
import { QUALITY, shouldReduceQuality } from '../src/scene/quality';
import { getCharacterAnimations } from '../src/characters/characterAnimations';
import { AnimationManager } from '../src/characters/AnimationManager';
import { calculateNormalization, measureCharacter } from '../src/characters/CharacterNormalizer';
import { CHARACTER_CATALOG } from '../src/characters/modelCatalog';
import { loadModel } from './modelFixtures';

describe('stadium camera and quality', () => {
  it.each([16 / 9, 9 / 16, 1, 0.4])('keeps both full action envelopes visible at aspect %s', aspect => {
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, aspect, CAMERA_NEAR, CAMERA_FAR);
    for (const mode of ['main', 'ronaldo', 'messi', 'victory'] as CameraMode[]) {
      for (const winner of ['ronaldo', 'messi'] as const) {
        const pose = cameraPose(mode, aspect, winner, 0.5);
        camera.position.copy(pose.position);
        camera.lookAt(pose.target);
        camera.updateMatrixWorld(true);
        for (const corner of FRAME_CORNERS) {
          const screen = corner.clone().project(camera);
          expect(Math.abs(screen.x)).toBeLessThan(0.94);
          expect(Math.abs(screen.y)).toBeLessThan(0.94);
          expect(Math.abs(screen.z)).toBeLessThan(1);
        }
        expect(camera.position.z).toBeGreaterThan(5);
      }
    }
  });

  it('follows actual playback, handles both celebrating, and returns to main after Idle', () => {
    const action = { name: 'SIUUU', time: 2, duration: 3.98, paused: false };
    expect(getDirectedMode('main', true, { ronaldo: action })).toBe('ronaldo');
    expect(getDirectedMode('main', true, { messi: { ...action, name: 'Messi Victory' } })).toBe('victory');
    expect(getDirectedMode('main', true, { ronaldo: action, messi: action })).toBe('main');
    expect(getDirectedMode('main', true, { ronaldo: { ...action, name: 'Idle' } })).toBe('main');
    expect(getDirectedMode('orbit', true, { ronaldo: action })).toBe('orbit');
    expect(getDirectedMode('messi', false, { ronaldo: action })).toBe('messi');
  });

  it('keeps the envelope visible while blending between opposite focus cameras', () => {
    for (const aspect of [16 / 9, 9 / 16]) {
      const camera = new THREE.PerspectiveCamera(CAMERA_FOV, aspect, CAMERA_NEAR, CAMERA_FAR);
      const from = cameraPose('ronaldo', aspect, 'ronaldo', 0.5);
      const to = cameraPose('messi', aspect, 'messi', 0);
      for (let step = 0; step <= 20; step++) {
        camera.position.lerpVectors(from.position, to.position, step / 20);
        camera.lookAt(from.target.clone().lerp(to.target, step / 20));
        camera.updateMatrixWorld(true);
        for (const point of FRAME_CORNERS) {
          const screen = point.clone().project(camera);
          expect(Math.max(Math.abs(screen.x), Math.abs(screen.y))).toBeLessThan(0.95);
        }
      }
    }
  });

  it('limits landing shake and requires sustained slow frames before lowering quality', () => {
    expect(landingShake(2, false)).toBe(0);
    expect(landingShake(3, false)).toBe(0);
    expect(landingShake(2.62, true)).toBe(0);
    for (let time = 0; time < 4; time += 0.01) expect(Math.abs(landingShake(time, false))).toBeLessThanOrEqual(0.025);
    expect(shouldReduceQuality([40, 42])).toBe(false);
    expect(shouldReduceQuality([40, 42, 16])).toBe(false);
    expect(shouldReduceQuality([40, 42, 41])).toBe(true);
    expect(QUALITY.low.shadowSize).toBe(0);
    expect(QUALITY.low.dpr).toBe(1);
    expect(QUALITY.high.shadowSize).toBeLessThanOrEqual(2048);
  });

  it.each(['ronaldo', 'messi'] as const)('contains sampled actual %s geometry throughout stadium animations', async id => {
    const character = CHARACTER_CATALOG[id];
    const gltf = await loadModel(character.sourceFile);
    gltf.scene.name = `${id}-animation-root`;
    const normalization = calculateNormalization(measureCharacter(gltf.scene), character.targetHeight, character.sourceGroundY);
    const clips = getCharacterAnimations(id, gltf.scene, gltf.animations);
    const manager = new AnimationManager(gltf.scene, clips, character.defaultAnimation);
    try {
      const stageClips = clips.filter(clip => clip.name !== 'mixamo.com');
      for (const clip of stageClips) for (let step = 0; step <= 12; step++) {
        manager.seek(clip.name, clip.duration * step / 12);
        const measured = measureCharacter(gltf.scene);
        for (const point of [measured.min, measured.max]) {
          const normalized = new THREE.Vector3(...point).add(new THREE.Vector3(...normalization.offset)).multiplyScalar(normalization.scale);
          normalized.x += PLAYER_X[id];
          expect(ACTION_BOUNDS.containsPoint(normalized), `${id}/${clip.name}/${step}: ${normalized.toArray()}`).toBe(true);
        }
      }
    } finally { manager.dispose(); }
  }, 20000);
});
