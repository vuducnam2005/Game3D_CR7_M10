import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { QUALITY, type QualityLevel } from './quality';

export function Crowd({ quality, cheering = false, reducedMotion = false }: { quality: QualityLevel; cheering?: boolean; reducedMotion?: boolean }) {
  const bodies = useRef<THREE.InstancedMesh>(null);
  const heads = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.MeshLambertMaterial>(null);
  useFrame(({ clock }) => {
    if (material.current) material.current.emissiveIntensity = !cheering ? 0 : reducedMotion ? .15
      : (quality === 'low' ? .2 : .45) * (.7 + .3 * Math.sin(clock.elapsedTime * 4));
  });
  const { crowdRows: rows, crowdColumns: columns } = QUALITY[quality];
  useLayoutEffect(() => {
    const transform = new THREE.Object3D();
    const color = new THREE.Color();
    for (let row = 0; row < rows; row++) for (let col = 0; col < columns; col++) {
      const index = row * columns + col;
      const x = (col / (columns - 1) - 0.5) * 22;
      const y = 0.85 + row * 0.52;
      const z = -6.7 - row * 0.65 - (1 - Math.abs(x) / 11) * 0.8;
      const variation = ((index * 37) % 17) / 17;
      transform.position.set(x, y, z);
      transform.scale.set(0.13, 0.2 + variation * 0.09, 0.1);
      transform.updateMatrix();
      bodies.current!.setMatrixAt(index, transform.matrix);
      color.set(variation < 0.25 ? '#dad9c7' : x < 0 ? '#c94235' : '#429bd0');
      bodies.current!.setColorAt(index, color);
      transform.position.y += 0.32;
      transform.scale.setScalar(0.095);
      transform.updateMatrix();
      heads.current!.setMatrixAt(index, transform.matrix);
    }
    bodies.current!.instanceMatrix.needsUpdate = true;
    bodies.current!.instanceColor!.needsUpdate = true;
    heads.current!.instanceMatrix.needsUpdate = true;
  }, [columns, rows]);
  return <group>
    <instancedMesh ref={bodies} args={[undefined, undefined, rows * columns]} frustumCulled={false}><boxGeometry args={[1, 1, 1]} /><meshLambertMaterial ref={material} emissive="#d7ef5c" emissiveIntensity={0} /></instancedMesh>
    <instancedMesh ref={heads} args={[undefined, undefined, rows * columns]} frustumCulled={false}><icosahedronGeometry args={[1, 0]} /><meshLambertMaterial color="#b29b80" /></instancedMesh>
  </group>;
}
