import * as THREE from 'three';
import { measureCharacter } from './CharacterNormalizer';

export const MESSI_SOURCE_CLIP = 'mixamo.com';

/**
 * Normalizes original GLB animations for Messi.
 * In messi_2023_3d_free.glb, the rest pose has ground at min.y ~ -70.33,
 * but the embedded 'mixamo.com' animation track sets mixamorigHips_00.position
 * in Mixamo coordinates where ground is at 0.
 * Without adjusting the root hip track, applying the normalization offset
 * causes Messi to float ~1.73m above the ground.
 *
 * This function grounds 'mixamo.com' so that its feet touch down at Y = 0.000,
 * aligning perfectly with Ronaldo and Messi's procedural animations.
 */
export function createMessiAnimations(root: THREE.Object3D, originals: THREE.AnimationClip[]): THREE.AnimationClip[] {
  const hips = root.getObjectByName('mixamorigHips_00');
  if (!hips) return originals;

  const parentScaleY = hips.parent ? hips.parent.getWorldScale(new THREE.Vector3()).y : 1;
  const restBounds = measureCharacter(root);

  return originals.map(clip => {
    if (clip.name !== MESSI_SOURCE_CLIP) return clip;
    const hipsTrackIndex = clip.tracks.findIndex(t => t.name === 'mixamorigHips_00.position');
    if (hipsTrackIndex === -1) return clip;

    // Clone the clip so we never mutate the source GLTF asset
    const grounded = clip.clone();
    const track = grounded.tracks[hipsTrackIndex];

    // Measure the model's ground Y when this clip is at t=0
    const mixer = new THREE.AnimationMixer(root);
    mixer.clipAction(clip).play();
    mixer.setTime(0);
    const clipBounds0 = measureCharacter(root);
    mixer.stopAllAction();
    mixer.uncacheRoot(root);

    // Shift hips Y so that ground at t=0 matches rest ground Y
    const deltaWorldY = restBounds.min[1] - clipBounds0.min[1];
    const deltaBoneY = deltaWorldY / parentScaleY;

    const values = new Float32Array(track.values);
    for (let i = 1; i < values.length; i += 3) {
      values[i] += deltaBoneY;
    }

    grounded.tracks[hipsTrackIndex] = new THREE.VectorKeyframeTrack(
      track.name,
      track.times,
      values,
      track.getInterpolation(),
    );

    return grounded;
  });
}
