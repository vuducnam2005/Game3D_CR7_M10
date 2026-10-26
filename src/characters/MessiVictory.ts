import * as THREE from 'three';
import { PoseAuthor, type Pose } from './PoseAuthor';

const LEGS = [
  ['mixamorigLeftUpLeg_03', 'mixamorigLeftLeg_04', 'mixamorigLeftFoot_05'],
  ['mixamorigRightUpLeg_022', 'mixamorigRightLeg_08', 'mixamorigRightFoot_09'],
] as const;

// Two-bone IK keeps the support foot planted while the other foot advances.
function plantLeg(a: PoseAuthor, names: readonly string[], target: THREE.Vector3, footRotation: THREE.Quaternion) {
  const [hipName, kneeName, footName] = names;
  const hip = a.world(hipName);
  const knee = a.world(kneeName);
  const foot = a.world(footName);
  const thighLength = hip.distanceTo(knee);
  const shinLength = knee.distanceTo(foot);
  const direction = target.clone().sub(hip).normalize();
  const distance = THREE.MathUtils.clamp(hip.distanceTo(target), Math.abs(thighLength - shinLength) + 0.001, thighLength + shinLength - 0.001);
  const along = (thighLength ** 2 - shinLength ** 2 + distance ** 2) / (2 * distance);
  const bend = new THREE.Vector3(0, 0, 1).addScaledVector(direction, -direction.z).normalize();
  const kneeTarget = hip.clone().addScaledVector(direction, along).addScaledVector(bend, Math.sqrt(Math.max(0, thighLength ** 2 - along ** 2)));
  a.aimAt(hipName, kneeName, kneeTarget);
  a.aimAt(kneeName, footName, target);
  const footNode = a.node(footName);
  footNode.quaternion.copy(footNode.parent!.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(footRotation));
  a.root.updateMatrixWorld(true);
}

export function createMessiVictory(root: THREE.Object3D): THREE.AnimationClip {
  const author = new PoseAuthor(root);
  const feet = LEGS.map(names => ({ position: author.world(names[2]), rotation: author.node(names[2]).getWorldQuaternion(new THREE.Quaternion()) }));
  const step = 12;
  const smooth = (value: number) => { const t = THREE.MathUtils.clamp(value, 0, 1); return t * t * (3 - 2 * t); };
  const poseAt = (time: number): Pose => a => {
    const back = time > 4;
    const walkTime = back ? time - 4 : time;
    const left = smooth(walkTime / 0.65);
    const right = smooth((walkTime - 0.65) / 0.65);
    const progress = (left + right) / 2;
    const bodyOffset = back ? 1 - progress : progress;
    const drop = 1.8 * Math.sin(progress * Math.PI);
    a.moveWorld(a.root.name, new THREE.Vector3(0, -drop, step * bodyOffset));
    [left, right].forEach((phase, index) => {
      const target = feet[index].position.clone();
      target.z += step * (back ? 1 - phase : phase);
      target.y += 5 * Math.sin(phase * Math.PI);
      plantLeg(a, LEGS[index], target, feet[index].rotation);
    });
    const spread = smooth((time - 1.15) / 0.55) * (1 - smooth((time - 3.7) / 0.6));
    const raised = smooth((time - 1.8) / 0.65) * (1 - smooth((time - 3.7) / 0.6));
    for (const [sign, upper, elbow, hand] of [
      [1, 'mixamorigLeftArm_018', 'mixamorigLeftForeArm_019', 'mixamorigLeftHand_020'],
      [-1, 'mixamorigRightArm_027', 'mixamorigRightForeArm_028', 'mixamorigRightHand_029'],
    ] as const) {
      const direction = new THREE.Vector3(sign * (1 - raised * 0.75), -0.85 * (1 - spread) + raised, 0.06);
      a.aim(upper, elbow, direction);
      a.aim(elbow, hand, direction);
    }
    a.rotate('mixamorigHead_015', -0.13 * raised, 0, 0);
  };
  const times = Array.from({ length: 107 }, (_, index) => index * 0.05);
  // Include a clean rest pose at both ends so every action can crossfade safely.
  return author.build('Messi Victory', times, times.map((time, i) => i === 0 || i === times.length - 1 ? () => {} : poseAt(time)));
}
