import { Box } from '@react-three/drei';
import { createPortal, useFrame, useThree } from '@react-three/fiber';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { AnimationManager, type AnimationFrame, type AnimationPlaybackState } from './AnimationManager';
import { calculateNormalization, measureCharacter } from './CharacterNormalizer';
import { getRequiredMessiBones } from './MessiProceduralAnimations';
import { getCharacterAnimations } from './characterAnimations';
import type { CharacterDefinition } from './modelCatalog';
import { inspectModel, type ModelInspection } from './modelInspection';

interface DebugCharacterProps {
  character: CharacterDefinition;
  selectedClip: string | null;
  playRequest: number;
  previewTime: number;
  paused: boolean;
  speed: number;
  showBounds: boolean;
  showSkeleton: boolean;
  onInspection: (inspection: ModelInspection) => void;
  onPlaybackState: (state: AnimationPlaybackState) => void;
  onAnimationFrame?: (frame: AnimationFrame) => void;
  queueScope?: string;
  interrupt?: boolean;
}

interface LoadedGLTF {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

function configureMeshes(root: THREE.Object3D): void {
  root.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    object.castShadow = true;
    object.receiveShadow = false;
    object.frustumCulled = false;
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      material.needsUpdate = true;
    }
  });
}

export function DebugCharacter({
  character,
  selectedClip,
  playRequest,
  previewTime,
  paused,
  speed,
  showBounds,
  showSkeleton,
  onInspection,
  onPlaybackState,
  onAnimationFrame,
  queueScope,
  interrupt = false,
}: DebugCharacterProps) {
  const scene = useThree(state => state.scene);
  const gltf = useGLTF(character.assetUrl) as unknown as LoadedGLTF;
  const model = useMemo(() => {
    const instance = clone(gltf.scene) as THREE.Group;
    instance.name = `${character.id}-animation-root`;
    return instance;
  }, [character.id, gltf.scene]);
  const originalBounds = useMemo(() => measureCharacter(model), [model]);
  const normalization = useMemo(
    () => calculateNormalization(originalBounds, character.targetHeight, character.sourceGroundY),
    [character.targetHeight, character.sourceGroundY, originalBounds],
  );
  const clips = useMemo(
    () => getCharacterAnimations(character.id, gltf.scene, gltf.animations),
    [character.id, gltf.scene, gltf.animations],
  );
  const managerRef = useRef<AnimationManager | null>(null);
  const lastPlayRequest = useRef(0);
  const boundsHelper = useMemo(
    () => new THREE.Box3Helper(normalization.normalizedBounds.clone(), new THREE.Color(character.accent)),
    [character.accent, normalization.normalizedBounds],
  );
  const skeletonHelper = useMemo(() => {
    const helper = new THREE.SkeletonHelper(model);
    const materials = Array.isArray(helper.material) ? helper.material : [helper.material];
    for (const material of materials) {
      material.depthTest = false;
      material.transparent = true;
      material.opacity = 0.88;
    }
    return helper;
  }, [model]);

  useEffect(() => {
    configureMeshes(model);
    const requiredBones = character.id === 'messi' ? getRequiredMessiBones() : [];
    onInspection(inspectModel(
      model,
      originalBounds,
      normalization.scale,
      character.targetHeight,
      clips,
      gltf.animations,
      requiredBones,
    ));
  }, [character.id, character.targetHeight, clips, model, normalization.scale, onInspection, originalBounds, gltf.animations]);

  useEffect(() => {
    lastPlayRequest.current = 0;
    const manager = new AnimationManager(model, clips, character.defaultAnimation, onPlaybackState);
    managerRef.current = manager;
    manager.setSpeed(speed);
    manager.setPaused(paused);
    manager.play(character.defaultAnimation, { loop: true, queue: false, fadeSeconds: 0 });
    return () => {
      manager.dispose();
      managerRef.current = null;
    };
  }, [character.defaultAnimation, clips, model, onPlaybackState]);

  useEffect(() => {
    managerRef.current?.setPaused(paused);
  }, [paused]);

  useEffect(() => { managerRef.current?.clearQueue(); }, [queueScope]);

  useEffect(() => {
    managerRef.current?.setSpeed(speed);
  }, [speed]);

  useEffect(() => {
    if (!selectedClip || playRequest === 0 || playRequest === lastPlayRequest.current) return;
    lastPlayRequest.current = playRequest;
    const loop = selectedClip === character.defaultAnimation || selectedClip === 'mixamo.com';
    if (interrupt) managerRef.current?.clearQueue();
    managerRef.current?.play(selectedClip, { loop, queue: !interrupt, request: playRequest });
  }, [character.defaultAnimation, playRequest, selectedClip, interrupt]);

  useEffect(() => {
    if (selectedClip && paused) managerRef.current?.seek(selectedClip, previewTime);
  }, [previewTime, selectedClip]);

  useFrame((_, delta) => {
    const manager = managerRef.current;
    if (!manager) return;
    manager.update(Math.min(delta, 0.1));
    if (onAnimationFrame) onAnimationFrame(manager.frame);
  });

  useEffect(() => () => {
    boundsHelper.geometry.dispose();
    (boundsHelper.material as THREE.Material).dispose();
    skeletonHelper.dispose();
  }, [boundsHelper, skeletonHelper]);

  useEffect(() => () => {
    const ownedSkeletons = new Set<THREE.Skeleton>();
    model.traverse(node => { if (node instanceof THREE.SkinnedMesh) ownedSkeletons.add(node.skeleton); });
    for (const skeleton of ownedSkeletons) skeleton.dispose();
  }, [model]);

  return (
    <>
      <group scale={normalization.scale}>
        <group position={normalization.offset}>
          <primitive dispose={null} object={model} />
        </group>
        {showBounds && <primitive object={boundsHelper} />}
      </group>
      {showSkeleton && createPortal(<primitive object={skeletonHelper} />, scene)}
    </>
  );
}

export function DebugGround() {
  return (
    <>
      <Box args={[9, 0.12, 7]} position={[0, -0.07, 0]} receiveShadow>
        <meshStandardMaterial color="#11231c" roughness={0.94} metalness={0.04} />
      </Box>
      <gridHelper args={[9, 18, '#3b8c67', '#183d30']} position={[0, 0.002, 0]} />
    </>
  );
}

useGLTF.preload('/models/cristiano_ronaldo.glb');
useGLTF.preload('/models/messi_2023_3d_free.glb');
