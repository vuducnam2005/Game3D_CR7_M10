import { useMemo } from 'react';
import * as THREE from 'three';

function FieldLine({ x = 0, z = 0, width, depth }: { x?: number; z?: number; width: number; depth: number }) {
  return <mesh rotation-x={-Math.PI / 2} position={[x, 0.007, z]}><planeGeometry args={[width, depth]} /><meshBasicMaterial color="#d5edcf" /></mesh>;
}

function Football() {
  const patches = useMemo(() => {
    const phi = (1 + Math.sqrt(5)) / 2;
    return [[0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi], [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0], [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1]].map(p => {
      const normal = new THREE.Vector3(...p).normalize();
      return { position: normal.clone().multiplyScalar(0.181), quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal) };
    });
  }, []);
  return <group position={[0, 0.185, 1.15]} rotation={[0.2, 0.3, 0.1]}>
    <mesh castShadow><sphereGeometry args={[0.18, 24, 16]} /><meshStandardMaterial color="#f1eee1" roughness={0.8} /></mesh>
    {patches.map((patch, i) => <mesh key={i} position={patch.position} quaternion={patch.quaternion}><circleGeometry args={[0.068, 5]} /><meshStandardMaterial color="#13202a" roughness={0.95} /></mesh>)}
  </group>;
}

export function FootballField() {
  return <group>
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.015, 0]} receiveShadow><planeGeometry args={[26, 20]} /><meshStandardMaterial color="#09291f" roughness={1} /></mesh>
    {Array.from({ length: 12 }, (_, i) => <mesh key={i} rotation-x={-Math.PI / 2} position={[0, 0, -5.5 + i]} receiveShadow>
      <planeGeometry args={[15, 1]} /><meshStandardMaterial color={i % 2 ? '#0b4226' : '#0a3620'} roughness={0.98} />
    </mesh>)}
    <FieldLine width={0.04} depth={10} />
    <FieldLine x={-6.7} width={0.05} depth={10} /><FieldLine x={6.7} width={0.05} depth={10} />
    <FieldLine z={-5} width={13.4} depth={0.05} /><FieldLine z={5} width={13.4} depth={0.05} />
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.009, 0]}><ringGeometry args={[1.8, 1.84, 96]} /><meshBasicMaterial color="#d5edcf" /></mesh>
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.011, 0]}><circleGeometry args={[0.08, 24]} /><meshBasicMaterial color="#d5edcf" /></mesh>
    {[-1, 1].map(side => <group key={side}>
      <FieldLine x={side * 5.15} width={0.045} depth={5} />
      <FieldLine x={side * 5.92} z={-2.5} width={1.55} depth={0.045} /><FieldLine x={side * 5.92} z={2.5} width={1.55} depth={0.045} />
    </group>)}
    <Football />
  </group>;
}
