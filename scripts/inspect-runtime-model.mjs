import { readFile, writeFile } from 'node:fs/promises';
import { AnimationMixer, Box3, Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// CPU-only diagnostics: skip image decoding, never alter the source GLB.
const loader = new GLTFLoader().register(parser => {
  parser.loadTexture = async () => null;
  return { name: 'CPU_GEOMETRY_INSPECTION' };
});
const source = process.argv[2] ?? 'cristiano_ronaldo.glb';
const data = await readFile(source);
const gltf = await loader.parseAsync(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength), '');
const vector = new Vector3();
const tuple = v => v.toArray().map(n => Number(n.toFixed(6)));
function measure() {
  gltf.scene.updateMatrixWorld(true);
  const bounds = new Box3();
  gltf.scene.traverse(object => {
    if (!object.isMesh) return;
    object.skeleton?.update();
    for (let i = 0; i < object.geometry.attributes.position.count; i++) {
      object.getVertexPosition(i, vector).applyMatrix4(object.matrixWorld);
      bounds.expandByPoint(vector);
    }
  });
  return { min: tuple(bounds.min), max: tuple(bounds.max), size: tuple(bounds.getSize(new Vector3())) };
}
const bones = [];
gltf.scene.traverse(object => {
  if (object.isBone) bones.push({ name: object.name, parent: object.parent?.name, position: tuple(object.position), world: tuple(object.getWorldPosition(new Vector3())) });
});
const rest = measure();
const clips = gltf.animations.map(clip => {
  const mixer = new AnimationMixer(gltf.scene);
  mixer.clipAction(clip).play();
  const sampleTimes = Array.from({ length: 81 }, (_, i) => i * (clip.duration - 0.001) / 80);
  const samples = sampleTimes.map(time => {
    mixer.setTime(time);
    const bounds = measure();
    const pose = bones.filter(b => /^(root_|DEF-spine|DEF-upper_arm|DEF-forearm|DEF-thigh|DEF-shin|DEF-foot|DEF-hand)/.test(b.name)).map(b => ({ name: b.name, world: tuple(gltf.scene.getObjectByName(b.name).getWorldPosition(new Vector3())) }));
    return { time, bounds, pose };
  });
  mixer.stopAllAction();
  mixer.uncacheRoot(gltf.scene);
  return { name: clip.name, duration: clip.duration, tracks: clip.tracks.length, samples };
});
const output = 'reports/ronaldo-runtime-analysis.json';
await writeFile(output, JSON.stringify({ source, note: 'CPU-only GLTFLoader; textures skipped for diagnostics, not a render test.', rest, bones, clips }, null, 2) + '\n');
console.log(JSON.stringify({ rest, clips: clips.map(c => ({ name: c.name, duration: c.duration, sampleCount: c.samples.length, groundMinY: Math.min(...c.samples.map(s => s.bounds.min[1])), peakY: Math.max(...c.samples.map(s => s.bounds.max[1])) })) }, null, 2));
console.log(`Wrote ${output}`);
