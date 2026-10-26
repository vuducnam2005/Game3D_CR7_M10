import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { createRonaldoAnimations } = await server.ssrLoadModule('/src/characters/RonaldoAnimations.ts');
  const { createRonaldoProceduralAnimations } = await server.ssrLoadModule('/src/characters/RonaldoProceduralAnimations.ts');
  const { createMessiProceduralAnimations } = await server.ssrLoadModule('/src/characters/MessiProceduralAnimations.ts');
  const { measureCharacter } = await server.ssrLoadModule('/src/characters/CharacterNormalizer.ts');
  const result = [];
  for (const id of ['ronaldo', 'messi']) {
    const file = id === 'ronaldo' ? 'cristiano_ronaldo.glb' : 'messi_2023_3d_free.glb';
    const bytes = await readFile(file);
    const loader = new GLTFLoader().register(parser => { parser.loadTexture = async () => null; return { name: 'CPU_NO_TEXTURES' }; });
    const gltf = await loader.parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), '');
    const root = gltf.scene;
    root.name = `${id}-animation-root`;
    const derived = id === 'ronaldo' ? createRonaldoAnimations(gltf.animations) : [];
    const clips = id === 'ronaldo' ? [...derived, ...createRonaldoProceduralAnimations(root, derived[0])] : createMessiProceduralAnimations(root);
    const mixer = new THREE.AnimationMixer(root);
    const boneNames = id === 'ronaldo' ? ['DEF-upper_armL_305', 'DEF-forearmL_302', 'DEF-handL_299', 'DEF-upper_armR_435', 'DEF-forearmR_432', 'DEF-handR_429', 'DEF-spine006_58'] : ['mixamorigLeftFoot_05', 'mixamorigRightFoot_09', 'mixamorigLeftHand_020', 'mixamorigRightHand_029', 'mixamorigHead_015'];
    for (const clip of clips) {
      mixer.stopAllAction();
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
      const samples = [0, 0.3, 0.8, 1.5, 2.8, clip.duration].map(time => {
        mixer.setTime(Math.min(time, clip.duration));
        const bounds = measureCharacter(root);
        return { time, bounds, bones: Object.fromEntries(boneNames.map(name => [name, root.getObjectByName(name).getWorldPosition(new THREE.Vector3()).toArray()])) };
      });
      result.push({ id, name: clip.name, duration: clip.duration, tracks: clip.tracks.length, samples });
    }
    mixer.stopAllAction();
    mixer.uncacheRoot(root);
  }
  await writeFile('reports/authored-animation-samples.json', JSON.stringify(result, null, 2));
  for (const clip of result) console.log(JSON.stringify({ name: clip.name, sample: clip.samples[3] }));
} finally { await server.close(); }
