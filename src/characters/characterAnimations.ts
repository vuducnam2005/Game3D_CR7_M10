import * as THREE from 'three';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import type { CharacterId } from './modelCatalog';
import { createRonaldoAnimations } from './RonaldoAnimations';
import { createRonaldoProceduralAnimations } from './RonaldoProceduralAnimations';
import { createMessiAnimations } from './MessiAnimations';
import { createMessiProceduralAnimations } from './MessiProceduralAnimations';

const cache = new WeakMap<THREE.Object3D, Map<CharacterId, THREE.AnimationClip[]>>();

export function getCharacterAnimations(id: CharacterId, source: THREE.Object3D, originals: THREE.AnimationClip[]): THREE.AnimationClip[] {
  const entries = cache.get(source) ?? new Map<CharacterId, THREE.AnimationClip[]>();
  cache.set(source, entries);
  const existing = entries.get(id);
  if (existing) return existing;
  const authorRoot = clone(source);
  authorRoot.name = `${id}-animation-root`;
  const baseOriginals = id === 'messi' ? createMessiAnimations(authorRoot, originals) : originals;
  const derived = id === 'ronaldo' ? createRonaldoAnimations(originals) : [];
  const procedural = id === 'ronaldo' ? createRonaldoProceduralAnimations(authorRoot, derived[0]) : createMessiProceduralAnimations(authorRoot);
  const clips = [...baseOriginals, ...derived, ...procedural];
  entries.set(id, clips);
  return clips;
}
