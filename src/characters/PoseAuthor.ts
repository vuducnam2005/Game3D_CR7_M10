import * as THREE from 'three';
import { clone } from 'three/addons/utils/SkeletonUtils.js';

export type Pose = (author: PoseAuthor) => void;

// Author on an isolated skeleton. Neither the cached GLB nor the render instance is posed.
export class PoseAuthor {
  readonly root: THREE.Object3D;
  private readonly baseline;

  constructor(root: THREE.Object3D, baselineClip?: THREE.AnimationClip) {
    this.root = clone(root);
    if (baselineClip) {
      const mixer = new THREE.AnimationMixer(this.root);
      const action = mixer.clipAction(baselineClip);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
      mixer.setTime(baselineClip.duration);
      // Capture the final pose before stopAllAction restores the clone's rest state.
      this.baseline = this.capture();
      mixer.stopAllAction();
      mixer.uncacheRoot(this.root);
    } else {
      this.baseline = this.capture();
    }
    this.reset();
  }

  node(name: string): THREE.Object3D {
    const node = this.root.getObjectByName(name);
    if (!node) throw new Error(`Cannot author animation: missing node ${name}`);
    return node;
  }

  world(name: string): THREE.Vector3 {
    this.root.updateMatrixWorld(true);
    return this.node(name).getWorldPosition(new THREE.Vector3());
  }

  aim(name: string, childName: string, direction: THREE.Vector3): void {
    const node = this.node(name);
    if (!node.parent) throw new Error(`Cannot aim root ${name}`);
    const current = this.world(childName).sub(this.world(name)).normalize();
    if (current.lengthSq() < 0.5 || direction.lengthSq() < 1e-8) throw new Error(`Invalid aim direction: ${name}`);
    const rotation = new THREE.Quaternion().setFromUnitVectors(current, direction.clone().normalize());
    const world = node.getWorldQuaternion(new THREE.Quaternion()).premultiply(rotation);
    const parent = node.parent.getWorldQuaternion(new THREE.Quaternion());
    node.quaternion.copy(parent.invert().multiply(world).normalize());
    this.root.updateMatrixWorld(true);
  }

  aimAt(name: string, childName: string, target: THREE.Vector3): void {
    this.aim(name, childName, target.clone().sub(this.world(name)));
  }

  rotate(name: string, x: number, y: number, z: number): void {
    this.node(name).quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z))).normalize();
    this.root.updateMatrixWorld(true);
  }

  moveWorld(name: string, offset: THREE.Vector3): void {
    const node = this.node(name);
    const target = this.world(name).add(offset);
    node.position.copy(node.parent ? node.parent.worldToLocal(target) : target);
    this.root.updateMatrixWorld(true);
  }

  build(name: string, times: number[], poses: Pose[]): THREE.AnimationClip {
    if (times.length !== poses.length || times.length < 2) throw new Error('Pose times and callbacks must match.');
    const values = this.baseline.map(() => ({ position: [] as number[], quaternion: [] as number[], scale: [] as number[] }));
    poses.forEach(pose => {
      this.reset();
      pose(this);
      this.baseline.forEach(({ node }, index) => {
        values[index].position.push(...node.position.toArray());
        values[index].quaternion.push(...node.quaternion.toArray());
        values[index].scale.push(...node.scale.toArray());
      });
    });
    this.reset();
    const tracks = this.baseline.flatMap(({ node }, i) => [
      new THREE.VectorKeyframeTrack(`${node.name}.position`, times, values[i].position),
      new THREE.QuaternionKeyframeTrack(`${node.name}.quaternion`, times, values[i].quaternion),
      new THREE.VectorKeyframeTrack(`${node.name}.scale`, times, values[i].scale),
    ]);
    return new THREE.AnimationClip(name, times[times.length - 1], tracks).optimize();
  }

  private capture() {
    const nodes: THREE.Object3D[] = [];
    this.root.traverse(node => { if (node.name && !(node instanceof THREE.Mesh)) nodes.push(node); });
    if (new Set(nodes.map(node => node.name)).size !== nodes.length) throw new Error('Animation node names must be unique.');
    return nodes.map(node => ({ node, position: node.position.clone(), quaternion: node.quaternion.clone(), scale: node.scale.clone() }));
  }

  private reset(): void {
    for (const pose of this.baseline) {
      pose.node.position.copy(pose.position);
      pose.node.quaternion.copy(pose.quaternion);
      pose.node.scale.copy(pose.scale);
    }
    this.root.updateMatrixWorld(true);
  }
}
