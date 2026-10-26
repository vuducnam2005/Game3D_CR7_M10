import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export async function loadModel(fileName: string) {
  const buffer = await readFile(new URL(`../${fileName}`, import.meta.url));
  const loader = new GLTFLoader().register(parser => {
    parser.loadTexture = async () => null as unknown as THREE.Texture;
    return { name: 'CPU_TEST_NO_IMAGE_DECODING' };
  });
  return loader.parseAsync(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength), '');
}

export function snapshotTransforms(root: THREE.Object3D): string {
  const transforms: unknown[] = [];
  root.traverse(node => transforms.push([node.name, node.position.toArray(), node.quaternion.toArray(), node.scale.toArray()]));
  return JSON.stringify(transforms);
}
