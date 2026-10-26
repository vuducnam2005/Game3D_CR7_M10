import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import type { AnimationFrame } from '../characters/AnimationManager';
import type { CharacterId } from '../characters/modelCatalog';
import { ACTION_BOUNDS, cameraPose, CAMERA_FOV, getDirectedMode, isCelebrating, landingShake, type CameraMode } from './cameraRig';

export type MotionFrames = Partial<Record<CharacterId, AnimationFrame>>;

interface CameraControllerProps {
  mode: CameraMode;
  automatic: boolean;
  winner: CharacterId;
  frames: RefObject<MotionFrames>;
  reducedMotion: boolean;
  onDirection: (mode: CameraMode) => void;
}

export function CameraController({ mode, automatic, winner, frames, reducedMotion, onDirection }: CameraControllerProps) {
  const { camera, size } = useThree();
  const aspect = size.width / Math.max(1, size.height);
  const currentTarget = useRef(new THREE.Vector3());
  const previousDirection = useRef<CameraMode | null>(null);
  const basePosition = useRef(new THREE.Vector3());
  const orbitCenter = useMemo(() => ACTION_BOUNDS.getCenter(new THREE.Vector3()), []);
  const orbitRadius = ACTION_BOUNDS.getSize(new THREE.Vector3()).length() / 2;
  const halfAngle = Math.atan(Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2)) * Math.min(1, aspect));
  const orbitDistance = orbitRadius / Math.sin(halfAngle) * 1.04;

  useEffect(() => {
    const pose = cameraPose(mode, aspect, winner);
    if (mode === 'orbit') {
      pose.target.copy(orbitCenter);
      pose.position.copy(orbitCenter).add(new THREE.Vector3(0, 0.1, 1).normalize().multiplyScalar(orbitDistance));
    }
    basePosition.current.copy(pose.position);
    currentTarget.current.copy(pose.target);
    camera.position.copy(pose.position);
    camera.lookAt(pose.target);
    camera.updateProjectionMatrix();
  // Resize must immediately fit; normal mode changes interpolate in useFrame.
  }, [camera, aspect, mode === 'orbit', orbitCenter, orbitDistance]);

  useFrame((_, delta) => {
    const directed = getDirectedMode(mode, automatic && !reducedMotion, frames.current);
    if (previousDirection.current !== directed) {
      previousDirection.current = directed;
      onDirection(directed);
    }
    if (directed === 'orbit') return;
    const focusPlayer = directed === 'victory' ? winner : directed === 'ronaldo' ? 'ronaldo' : 'messi';
    const frame = frames.current[focusPlayer];
    const progress = frame && isCelebrating(frame) && frame.duration > 0 && !reducedMotion ? frame.time / frame.duration : 0;
    const pose = cameraPose(directed, aspect, winner, progress);
    const alpha = reducedMotion ? 1 : 1 - Math.exp(-Math.min(delta, 0.1) * 4);
    basePosition.current.lerp(pose.position, alpha);
    currentTarget.current.lerp(pose.target, alpha);
    camera.position.copy(basePosition.current);
    const ronaldo = frames.current.ronaldo;
    const shake = ronaldo?.name === 'SIUUU' && !ronaldo.paused ? landingShake(ronaldo.time, reducedMotion) : 0;
    camera.position.x += shake;
    camera.position.y += shake * 0.45;
    camera.lookAt(currentTarget.current);
  });

  return mode === 'orbit' ? <OrbitControls makeDefault enableDamping enablePan={false} target={orbitCenter}
    minDistance={orbitDistance} maxDistance={orbitDistance * 1.35} minPolarAngle={1.15} maxPolarAngle={1.52}
    minAzimuthAngle={-0.45} maxAzimuthAngle={0.45} /> : null;
}
