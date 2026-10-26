import * as THREE from 'three';
import type { AnimationFrame } from '../characters/AnimationManager';
import type { CharacterId } from '../characters/modelCatalog';

export type CameraMode = 'main' | 'ronaldo' | 'messi' | 'victory' | 'orbit';
export const PLAYER_X = { ronaldo: -1.25, messi: 1.25 } as const;
export const CAMERA_FOV = 36;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 100;

// Includes both players' sampled animation envelopes, jump and raised hands.
export const ACTION_BOUNDS = new THREE.Box3(new THREE.Vector3(-2.95, -0.08, -1.6), new THREE.Vector3(2.95, 4.95, 1.25));
export const FRAME_CORNERS = [0, 1].flatMap(x => [0, 1].flatMap(y => [0, 1].map(z => new THREE.Vector3(
  x ? ACTION_BOUNDS.max.x : ACTION_BOUNDS.min.x,
  y ? ACTION_BOUNDS.max.y : ACTION_BOUNDS.min.y,
  z ? ACTION_BOUNDS.max.z : ACTION_BOUNDS.min.z,
))));

export function isCelebrating(frame: AnimationFrame | undefined): boolean {
  return Boolean(frame?.name && !['Idle', 'Messi Idle', 'mixamo.com'].includes(frame.name));
}

export function getDirectedMode(manual: CameraMode, automatic: boolean, frames: Partial<Record<CharacterId, AnimationFrame>>) {
  if (!automatic || manual === 'orbit') return manual;
  const ronaldo = isCelebrating(frames.ronaldo);
  const messi = isCelebrating(frames.messi);
  if (ronaldo && messi) return 'main';
  if (messi && frames.messi?.name === 'Messi Victory') return 'victory';
  if (ronaldo) return 'ronaldo';
  if (messi) return 'messi';
  return manual;
}

export function landingShake(time: number, reducedMotion: boolean): number {
  if (reducedMotion || time < 2.58 || time > 2.96) return 0;
  const t = time - 2.58;
  return Math.sin(t * 85) * 0.025 * Math.exp(-t * 12);
}

export function cameraPose(mode: CameraMode, aspect: number, winner: CharacterId = 'messi', progress = 0) {
  const side = mode === 'ronaldo' ? -1 : mode === 'messi' ? 1 : mode === 'victory' ? (winner === 'ronaldo' ? -1 : 1) : 0;
  const target = new THREE.Vector3(side * 0.22, 2.26 + Math.sin(Math.PI * Math.min(1, Math.max(0, progress))) * 0.08, 0);
  const direction = new THREE.Vector3(side * 0.065, mode === 'victory' ? 0.07 : 0.11, 1).normalize();
  const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), direction).normalize();
  const up = new THREE.Vector3().crossVectors(direction, right).normalize();
  const tanY = Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2));
  const tanX = tanY * Math.max(0.1, aspect);
  let distance = 0;
  for (const corner of FRAME_CORNERS) {
    const relative = corner.clone().sub(target);
    const depth = relative.dot(direction);
    distance = Math.max(distance, depth + Math.abs(relative.dot(right)) / (tanX * 0.94), depth + Math.abs(relative.dot(up)) / (tanY * 0.94));
  }
  // Main leaves a small extra margin so celebration cuts can gently push in.
  distance *= mode === 'main' || mode === 'orbit' ? 1.045 : 1.01;
  return { position: target.clone().addScaledVector(direction, distance), target };
}
