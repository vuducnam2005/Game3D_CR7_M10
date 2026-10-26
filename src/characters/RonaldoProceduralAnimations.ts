import * as THREE from 'three';
import { PoseAuthor, type Pose } from './PoseAuthor';

const ARM = {
  left: { upper: 'DEF-upper_armL_305', elbow: 'DEF-forearmL_302', hand: 'DEF-handL_299', palm: 'ORG-palm01L_240' },
  right: { upper: 'DEF-upper_armR_435', elbow: 'DEF-forearmR_432', hand: 'DEF-handR_429', palm: 'ORG-palm01R_370' },
} as const;
const HEAD = 'DEF-spine006_58';
const rest: Pose = () => {};

function arm(author: PoseAuthor, side: keyof typeof ARM, upper: number[], lower: number[]) {
  const names = ARM[side];
  author.aim(names.upper, names.elbow, new THREE.Vector3(...upper));
  author.aim(names.elbow, names.hand, new THREE.Vector3(...lower));
}

export function createRonaldoProceduralAnimations(root: THREE.Object3D, idle: THREE.AnimationClip): THREE.AnimationClip[] {
  const author = new PoseAuthor(root, idle);
  const calma = (lift: number): Pose => a => {
    arm(a, 'left', [0.55, -0.6, 0.5], [0.15, lift, 1]);
    arm(a, 'right', [-0.55, -0.6, 0.5], [-0.15, lift, 1]);
    a.aim(ARM.left.hand, ARM.left.palm, new THREE.Vector3(0, -0.2, 1));
    a.aim(ARM.right.hand, ARM.right.palm, new THREE.Vector3(0, -0.2, 1));
  };
  const power: Pose = a => {
    arm(a, 'left', [1, 0.05, 0], [-0.05, 1, 0.1]);
    arm(a, 'right', [-1, 0.05, 0], [0.05, 1, 0.1]);
    a.rotate(HEAD, -0.06, 0, 0);
    a.root.traverse(node => {
      if (/^DEF-f_(index|middle|ring|pinky)0[123][LR]_/.test(node.name)) a.rotate(node.name, 0.8, 0, 0);
    });
  };
  const point: Pose = a => {
    arm(a, 'right', [-0.38, 0.92, 0.05], [-0.06, 1, 0]);
    a.aim(ARM.right.hand, ARM.right.palm, new THREE.Vector3(0, 1, 0));
    a.root.traverse(node => {
      if (/^DEF-f_(middle|ring|pinky)0[123]R_/.test(node.name)) a.rotate(node.name, 1.0, 0, 0);
    });
    a.rotate(HEAD, -0.12, 0, -0.05);
  };
  const sleep: Pose = a => {
    const cheek = a.world(HEAD).add(new THREE.Vector3(0.12, 0.04, 0.10));
    arm(a, 'left', [0.75, -0.25, 0.6], [0, 1, 0.2]);
    arm(a, 'right', [0.5, -0.3, 0.8], [1, 1, 0]);
    a.aimAt(ARM.left.elbow, ARM.left.hand, cheek);
    a.aimAt(ARM.right.elbow, ARM.right.hand, cheek);
    a.rotate(HEAD, 0.1, 0, 0.22);
  };
  return [
    author.build('Calma', [0, 0.5, 0.9, 1.3, 1.7, 2.1, 2.5, 3], [rest, calma(0.3), calma(-0.3), calma(0.3), calma(-0.3), calma(0.3), calma(-0.3), rest]),
    author.build('Sleep', [0, 0.75, 2.25, 3], [rest, sleep, sleep, rest]),
    author.build('Power Pose', [0, 0.7, 2.3, 3], [rest, power, power, rest]),
    author.build('Point Up', [0, 0.65, 2.25, 3], [rest, point, point, rest]),
  ];
}
