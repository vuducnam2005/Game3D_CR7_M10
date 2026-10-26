import * as THREE from 'three';
import { createMessiVictory } from './MessiVictory';

const BONE_NAMES = {
  // GLTFLoader sanitizes the ':' separator used by the raw Mixamo node names.
  hips: 'mixamorigHips_00',
  spine: 'mixamorigSpine_01',
  spine1: 'mixamorigSpine1_012',
  spine2: 'mixamorigSpine2_013',
  neck: 'mixamorigNeck_014',
  head: 'mixamorigHead_015',
  leftShoulder: 'mixamorigLeftShoulder_017',
  leftArm: 'mixamorigLeftArm_018',
  leftForeArm: 'mixamorigLeftForeArm_019',
  rightShoulder: 'mixamorigRightShoulder_026',
  rightArm: 'mixamorigRightArm_027',
  rightForeArm: 'mixamorigRightForeArm_028',
  leftHand: 'mixamorigLeftHand_020',
  rightHand: 'mixamorigRightHand_029',
  leftThigh: 'mixamorigLeftUpLeg_03',
  leftKnee: 'mixamorigLeftLeg_04',
  leftFoot: 'mixamorigLeftFoot_05',
  rightThigh: 'mixamorigRightUpLeg_022',
  rightKnee: 'mixamorigRightLeg_08',
  rightFoot: 'mixamorigRightFoot_09',
} as const;

type EulerFrame = [number, number, number];

function findBone(root: THREE.Object3D, name: string): THREE.Bone | null {
  const object = root.getObjectByName(name);
  return object instanceof THREE.Bone ? object : null;
}

function quaternionTrack(
  root: THREE.Object3D,
  boneName: string,
  times: number[],
  deltas: EulerFrame[],
): THREE.QuaternionKeyframeTrack | null {
  const bone = findBone(root, boneName);
  if (!bone) return null;
  const values: number[] = [];
  for (const [x, y, z] of deltas) {
    const delta = new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z, 'XYZ'));
    const value = bone.quaternion.clone().multiply(delta).normalize();
    values.push(value.x, value.y, value.z, value.w);
  }
  return new THREE.QuaternionKeyframeTrack(`${bone.name}.quaternion`, times, values);
}

function aimBoneTrack(
  root: THREE.Object3D,
  boneName: string,
  times: number[],
  targetWorldDirection: THREE.Vector3,
): THREE.QuaternionKeyframeTrack | null {
  const bone = findBone(root, boneName);
  const childBone = bone?.children.find(child => child instanceof THREE.Bone);
  if (!bone || !(childBone instanceof THREE.Bone) || !bone.parent) return null;

  root.updateMatrixWorld(true);
  const rest = bone.quaternion.clone();
  const localBoneDirection = childBone.position.clone().normalize();
  const currentParentDirection = localBoneDirection.clone().applyQuaternion(rest).normalize();
  const parentWorldQuaternion = bone.parent.getWorldQuaternion(new THREE.Quaternion());
  const targetParentDirection = targetWorldDirection
    .clone()
    .normalize()
    .applyQuaternion(parentWorldQuaternion.invert())
    .normalize();
  const correction = new THREE.Quaternion().setFromUnitVectors(currentParentDirection, targetParentDirection);
  const target = correction.multiply(rest).normalize();
  const values = [rest, target, target, rest].flatMap(value => [value.x, value.y, value.z, value.w]);
  return new THREE.QuaternionKeyframeTrack(`${bone.name}.quaternion`, times, values);
}

function clip(name: string, duration: number, tracks: Array<THREE.KeyframeTrack | null>): THREE.AnimationClip {
  return new THREE.AnimationClip(name, duration, tracks.filter((track): track is THREE.KeyframeTrack => track !== null));
}

export function createMessiProceduralAnimations(root: THREE.Object3D): THREE.AnimationClip[] {
  const idleTimes = [0, 1.5, 3];
  const idle = clip('Messi Idle', 3, [
    quaternionTrack(root, BONE_NAMES.spine1, idleTimes, [[0, 0, 0], [0.025, 0.012, 0], [0, 0, 0]]),
    quaternionTrack(root, BONE_NAMES.spine2, idleTimes, [[0, 0, 0], [-0.018, -0.01, 0], [0, 0, 0]]),
    quaternionTrack(root, BONE_NAMES.head, idleTimes, [[0, -0.018, 0], [0.012, 0.025, 0], [0, -0.018, 0]]),
    quaternionTrack(root, BONE_NAMES.leftArm, idleTimes, [[0, 0, 0], [0, 0, 0.025], [0, 0, 0]]),
    quaternionTrack(root, BONE_NAMES.rightArm, idleTimes, [[0, 0, 0], [0, 0, -0.025], [0, 0, 0]]),
  ]);

  const celebrationTimes = [0, 0.65, 2.45, 3.2];
  const celebrate = clip('Messi Celebrate', 3.2, [
    aimBoneTrack(root, BONE_NAMES.leftArm, celebrationTimes, new THREE.Vector3(-0.2, 1, 0.08)),
    aimBoneTrack(root, BONE_NAMES.rightArm, celebrationTimes, new THREE.Vector3(0.2, 1, 0.08)),
    quaternionTrack(root, BONE_NAMES.spine2, celebrationTimes, [[0, 0, 0], [-0.09, 0, 0], [-0.09, 0, 0], [0, 0, 0]]),
    quaternionTrack(root, BONE_NAMES.neck, celebrationTimes, [[0, 0, 0], [-0.08, 0, 0], [-0.08, 0, 0], [0, 0, 0]]),
    quaternionTrack(root, BONE_NAMES.head, celebrationTimes, [[0, 0, 0], [-0.14, 0, 0], [-0.14, 0, 0], [0, 0, 0]]),
  ]);

  const eatTimes = [0, .55, 1.15, 1.65, 2.15, 3];
  const eatCookie = clip('Messi Eat Cookie', 3, [
    quaternionTrack(root, BONE_NAMES.rightArm, eatTimes, [[0, 0, 0], [-.45, 0, -.6], [-.8, 0, -.7], [-.8, 0, -.7], [-.35, 0, -.3], [0, 0, 0]]),
    quaternionTrack(root, BONE_NAMES.rightForeArm, eatTimes, [[0, 0, 0], [-.7, 0, 0], [-1.25, 0, 0], [-1.25, 0, 0], [-.5, 0, 0], [0, 0, 0]]),
    quaternionTrack(root, BONE_NAMES.head, eatTimes, [[0, 0, 0], [0, 0, 0], [.08, 0, 0], [.13, 0, 0], [0, 0, 0], [0, 0, 0]]),
  ]);

  const victory = createMessiVictory(root);

  return [idle, celebrate, eatCookie, victory];
}

export function getRequiredMessiBones(): string[] {
  return Object.values(BONE_NAMES);
}
