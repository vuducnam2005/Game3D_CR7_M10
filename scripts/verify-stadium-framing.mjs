import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { getCharacterAnimations } = await server.ssrLoadModule('/src/characters/characterAnimations.ts');
  const { measureCharacter, calculateNormalization } = await server.ssrLoadModule('/src/characters/CharacterNormalizer.ts');
  const { CHARACTER_CATALOG } = await server.ssrLoadModule('/src/characters/modelCatalog.ts');
  const { ACTION_BOUNDS, PLAYER_X } = await server.ssrLoadModule('/src/scene/cameraRig.ts');
  const result = [];
  for (const id of ['ronaldo', 'messi']) {
    const character = CHARACTER_CATALOG[id];
    const bytes = await readFile(character.sourceFile);
    const loader = new GLTFLoader().register(parser => { parser.loadTexture = async () => null; return { name: 'CPU_NO_TEXTURES' }; });
    const gltf = await loader.parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), '');
    const root = gltf.scene; root.name = `${id}-animation-root`;
    const normalization = calculateNormalization(measureCharacter(root), character.targetHeight, character.sourceGroundY);
    const clips = getCharacterAnimations(id, root, gltf.animations).filter(clip => clip.name !== 'mixamo.com');
    const mixer = new THREE.AnimationMixer(root);
    for (const clip of clips) {
      mixer.stopAllAction();
      const action = mixer.clipAction(clip); action.setLoop(THREE.LoopOnce, 1); action.clampWhenFinished = true; action.play();
      const union = new THREE.Box3();
      const samples = [];
      for (let step = 0; step <= 60; step++) {
        const time = clip.duration * step / 60;
        mixer.setTime(time);
        const bounds = measureCharacter(root);
        const points = [bounds.min, bounds.max].map(point => new THREE.Vector3(...point).add(new THREE.Vector3(...normalization.offset)).multiplyScalar(normalization.scale).add(new THREE.Vector3(PLAYER_X[id], 0, 0)));
        points.forEach(point => union.expandByPoint(point));
        samples.push({ time, min: points[0].toArray(), max: points[1].toArray(), contained: points.every(point => ACTION_BOUNDS.containsPoint(point)) });
      }
      const record = { id, clip: clip.name, duration: clip.duration, min: union.min.toArray(), max: union.max.toArray(), allContained: samples.every(sample => sample.contained), samples };
      result.push(record);
      console.log(JSON.stringify({ id, clip: clip.name, min: record.min, max: record.max, allContained: record.allContained }));
    }
    mixer.stopAllAction(); mixer.uncacheRoot(root);
  }
  await writeFile(process.argv[2] ?? 'reports/stadium-framing-analysis.json', JSON.stringify({ note: 'CPU skinned geometry samples, not a visual or FPS test. mixamo.com is debug-only and not a stadium action.', bounds: { min: ACTION_BOUNDS.min.toArray(), max: ACTION_BOUNDS.max.toArray() }, clips: result }, null, 2));
  if (result.some(record => !record.allContained)) process.exitCode = 1;
} finally { await server.close(); }
