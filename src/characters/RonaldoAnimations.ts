import * as THREE from 'three';

export const RONALDO_SOURCE_CLIP = 'Armature.001Action.001';

export function createRonaldoAnimations(originals: THREE.AnimationClip[]): THREE.AnimationClip[] {
  const source = originals.find(clip => clip.name === RONALDO_SOURCE_CLIP);
  if (!source) throw new Error(`Ronaldo GLB is missing the verified clip: ${RONALDO_SOURCE_CLIP}`);

  // The embedded clip was visually verified: crouch, jump/half-turn, wide landing.
  // Retain every Rigify deform/control track; old 17-bone tracks are incompatible.
  const siuuu = source.clone();
  siuuu.name = 'SIUUU';
  const idleTracks = source.tracks.map(track => {
    const sample = Array.from(track.values.slice(-track.getValueSize()));
    const middle = [...sample];
    if (track.name === 'DEF-spine003_61.quaternion' || track.name === 'DEF-spine006_58.quaternion') {
      const pose = new THREE.Quaternion().fromArray(sample);
      pose.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0.008, 0, 0)));
      pose.toArray(middle);
    }
    const idleTrack = track.clone();
    idleTrack.times = new Float32Array([0, 1.5, 3]);
    idleTrack.values = new Float32Array([...sample, ...middle, ...sample]);
    idleTrack.setInterpolation(THREE.InterpolateLinear);
    return idleTrack;
  });
  return [new THREE.AnimationClip('Idle', 3, idleTracks), siuuu];
}
