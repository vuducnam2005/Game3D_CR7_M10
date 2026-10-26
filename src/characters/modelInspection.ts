import * as THREE from 'three';
import type { CharacterBounds } from './CharacterNormalizer';

export interface BoneInspection {
  name: string;
  parent: string | null;
}

export interface MeshInspection {
  name: string;
  materialNames: string[];
  skinned: boolean;
  triangles: number;
}

export interface ClipInspection {
  name: string;
  duration: number;
  tracks: number;
  procedural: boolean;
  source: 'GLB' | 'DERIVED' | 'PROC';
}

export interface ModelInspection {
  sourceBounds: CharacterBounds;
  normalizedHeight: number;
  normalizationScale: number;
  bones: BoneInspection[];
  meshes: MeshInspection[];
  clips: ClipInspection[];
  missingRequiredBones: string[];
  textureCount: number;
  materialCount: number;
}

function triangleCount(geometry: THREE.BufferGeometry): number {
  if (geometry.index) return Math.floor(geometry.index.count / 3);
  const positions = geometry.getAttribute('position');
  return positions ? Math.floor(positions.count / 3) : 0;
}

function materialList(material: THREE.Material | THREE.Material[]): THREE.Material[] {
  return Array.isArray(material) ? material : [material];
}

export function inspectModel(
  root: THREE.Object3D,
  sourceBounds: CharacterBounds,
  scale: number,
  targetHeight: number,
  clips: THREE.AnimationClip[],
  originalClips: THREE.AnimationClip[],
  requiredBones: string[] = [],
): ModelInspection {
  const bones: BoneInspection[] = [];
  const meshes: MeshInspection[] = [];
  const materials = new Set<string>();
  const textures = new Set<string>();
  const availableBones = new Set<string>();

  root.traverse(object => {
    if (object instanceof THREE.Bone) {
      availableBones.add(object.name);
      bones.push({
        name: object.name || '(unnamed bone)',
        parent: object.parent?.name || null,
      });
    }

    if (!(object instanceof THREE.Mesh)) return;
    const meshMaterials = materialList(object.material);
    const materialNames = meshMaterials.map((material, index) => material.name || `(material ${index})`);
    for (const material of meshMaterials) {
      materials.add(material.uuid);
      for (const value of Object.values(material)) {
        if (value instanceof THREE.Texture) textures.add(value.uuid);
      }
    }
    meshes.push({
      name: object.name || '(unnamed mesh)',
      materialNames,
      skinned: object instanceof THREE.SkinnedMesh,
      triangles: triangleCount(object.geometry),
    });
  });

  return {
    sourceBounds,
    normalizedHeight: targetHeight,
    normalizationScale: scale,
    bones,
    meshes,
    clips: clips.map(animationClip => {
      // A grounded copy can keep the original name without being the original clip.
      const source: ClipInspection['source'] = originalClips.includes(animationClip) ? 'GLB'
        : originalClips.some(original => original.name === animationClip.name) || ['Idle', 'SIUUU'].includes(animationClip.name) ? 'DERIVED' : 'PROC';
      return {
        name: animationClip.name,
        duration: animationClip.duration,
        tracks: animationClip.tracks.length,
        procedural: source === 'PROC',
        source,
      };
    }),
    missingRequiredBones: requiredBones.filter(name => !availableBones.has(name)),
    textureCount: textures.size,
    materialCount: materials.size,
  };
}
