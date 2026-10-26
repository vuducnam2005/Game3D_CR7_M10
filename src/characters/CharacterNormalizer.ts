import * as THREE from 'three';

export interface CharacterBounds {
  min: [number, number, number];
  max: [number, number, number];
  size: [number, number, number];
  center: [number, number, number];
}

export interface CharacterNormalization {
  originalBounds: CharacterBounds;
  offset: [number, number, number];
  normalizedBounds: THREE.Box3;
  scale: number;
  targetHeight: number;
}

function toTuple(vector: THREE.Vector3): [number, number, number] {
  return [vector.x, vector.y, vector.z];
}

export function measureCharacter(root: THREE.Object3D): CharacterBounds {
  root.updateMatrixWorld(true);
  const bounds = new THREE.Box3();
  const vertex = new THREE.Vector3();
  let meshCount = 0;
  let vertexCount = 0;

  root.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    const positions = object.geometry.getAttribute('position');
    if (!(positions instanceof THREE.BufferAttribute) && !(positions instanceof THREE.InterleavedBufferAttribute)) return;
    meshCount += 1;
    if (object instanceof THREE.SkinnedMesh) object.skeleton.update();

    for (let index = 0; index < positions.count; index += 1) {
      if (object instanceof THREE.SkinnedMesh) {
        object.getVertexPosition(index, vertex);
      } else {
        vertex.fromBufferAttribute(positions, index);
      }
      bounds.expandByPoint(vertex.applyMatrix4(object.matrixWorld));
      vertexCount += 1;
    }
  });

  if (bounds.isEmpty()) {
    throw new Error(`Model loaded, but no renderable geometry was measured (meshes=${meshCount}, vertices=${vertexCount}).`);
  }

  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  if (!Number.isFinite(size.y) || size.y <= 0) {
    throw new Error(`Model height is invalid (${size.y}). Character normalization cannot continue.`);
  }

  return {
    min: toTuple(bounds.min),
    max: toTuple(bounds.max),
    size: toTuple(size),
    center: toTuple(center),
  };
}

export function calculateNormalization(
  bounds: CharacterBounds,
  targetHeight: number,
  groundY = bounds.min[1],
): CharacterNormalization {
  const sourceHeight = bounds.size[1];
  if (!Number.isFinite(targetHeight) || targetHeight <= 0) {
    throw new Error(`Target height must be positive, received ${targetHeight}.`);
  }
  if (!Number.isFinite(sourceHeight) || sourceHeight <= 0) {
    throw new Error(`Source height must be positive, received ${sourceHeight}.`);
  }
  if (!Number.isFinite(groundY)) throw new Error('Ground height must be finite.');

  const negate = (value: number) => value === 0 ? 0 : -value;
  const offset: [number, number, number] = [
    negate(bounds.center[0]),
    negate(groundY),
    negate(bounds.center[2]),
  ];
  const normalizedBounds = new THREE.Box3(
    new THREE.Vector3(
      bounds.min[0] + offset[0],
      bounds.min[1] + offset[1],
      bounds.min[2] + offset[2],
    ),
    new THREE.Vector3(
      bounds.max[0] + offset[0],
      bounds.max[1] + offset[1],
      bounds.max[2] + offset[2],
    ),
  );

  return {
    originalBounds: bounds,
    offset,
    normalizedBounds,
    scale: targetHeight / sourceHeight,
    targetHeight,
  };
}

export function formatVector(values: readonly number[], digits = 3): string {
  return values.map(value => value.toFixed(digits)).join(', ');
}
