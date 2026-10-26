import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Crowd } from './Crowd';
import { FootballField } from './FootballField';
import { QUALITY, type QualityLevel } from './quality';

function LedBoard() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 192;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot create stadium LED canvas.');
    ctx.fillStyle = '#0b1724'; ctx.fillRect(0, 0, 1024, 192);
    ctx.fillStyle = '#f4eacb'; ctx.textAlign = 'center'; ctx.font = 'bold 68px Bahnschrift, sans-serif';
    ctx.fillText('RONALDO  /  MESSI', 512, 87);
    ctx.font = '26px Bahnschrift, sans-serif'; ctx.fillStyle = '#86b6be';
    ctx.fillText('L I V E   B A T T L E   /   S T A D I U M', 512, 143);
    for (let y = 0; y < 192; y += 4) { ctx.fillStyle = '#00000030'; ctx.fillRect(0, y, 1024, 1); }
    const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return <group position={[0, 5.1, -8.8]}>
    <mesh><boxGeometry args={[6.8, 1.5, 0.3]} /><meshStandardMaterial color="#18262e" metalness={0.65} roughness={0.4} /></mesh>
    <mesh position={[0, 0, 0.16]}><planeGeometry args={[6.55, 1.23]} /><meshBasicMaterial map={texture} /></mesh>
    {[-1, 1].map(side => <mesh key={side} position={[side * 3.35, 0, 0.18]}><boxGeometry args={[0.045, 1.5, 0.03]} /><meshBasicMaterial color={side < 0 ? '#ff5a37' : '#58d0ff'} /></mesh>)}
  </group>;
}

function Floodlight({ x, z }: { x: number; z: number }) {
  return <group position={[x, 0, z]}>
    <mesh position={[0, 3.5, 0]}><cylinderGeometry args={[0.06, 0.11, 7, 8]} /><meshStandardMaterial color="#41545d" metalness={0.7} roughness={0.35} /></mesh>
    <group position={[0, 6.8, 0]} rotation-x={-0.25}>
      <mesh><boxGeometry args={[1.6, 0.8, 0.18]} /><meshStandardMaterial color="#253440" /></mesh>
      {Array.from({ length: 8 }, (_, i) => <mesh key={i} position={[(i % 4 - 1.5) * 0.36, (Math.floor(i / 4) - 0.5) * 0.34, 0.105]}><planeGeometry args={[0.29, 0.25]} /><meshBasicMaterial color="#e6f6ff" toneMapped={false} /></mesh>)}
    </group>
  </group>;
}

function NightSky({ quality }: { quality: QualityLevel }) {
  const positions = useMemo(() => {
    const values: number[] = [];
    for (let i = 0; i < QUALITY[quality].stars; i++) values.push(((i * 19.73) % 70) - 35, 6 + ((i * 11.21) % 20), -22 - ((i * 7.27) % 15));
    return new Float32Array(values);
  }, [quality]);
  return <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#83afc5" size={0.045} sizeAttenuation transparent opacity={0.65} /></points>;
}

export function Stadium({ quality, cheering = false, reducedMotion = false }: { quality: QualityLevel; cheering?: boolean; reducedMotion?: boolean }) {
  return <group>
    <FootballField />
    <NightSky quality={quality} />
    {Array.from({ length: 6 }, (_, row) => <mesh key={row} position={[0, 0.2 + row * 0.5, -7.1 - row * 0.68]}><boxGeometry args={[24, 0.5, 1.5]} /><meshStandardMaterial color={row % 2 ? '#142e39' : '#1c3944'} roughness={0.95} /></mesh>)}
    {[-1, 1].map(side => <group key={side}>
      <mesh position={[side * 11.7, 1.5, -2.5]} rotation-y={side * 0.35}><boxGeometry args={[1.5, 3, 12]} /><meshStandardMaterial color="#19333e" /></mesh>
      <mesh position={[side * 6, 0.38, -5.8]}><boxGeometry args={[11.8, 0.65, 0.18]} /><meshStandardMaterial color="#111c27" /></mesh>
      <mesh position={[side * 6, 0.57, -5.69]}><boxGeometry args={[11.8, 0.07, 0.02]} /><meshBasicMaterial color={side < 0 ? '#ff5139' : '#3cc9ff'} toneMapped={false} /></mesh>
      <mesh position={[side * 6, 0.31, -5.69]}><boxGeometry args={[11.8, 0.025, 0.02]} /><meshBasicMaterial color="#a2b8ba" /></mesh>
      <Floodlight x={side * 4.9} z={-10.5} /><Floodlight x={side * 9} z={3} />
    </group>)}
    <Crowd key={quality} quality={quality} cheering={cheering} reducedMotion={reducedMotion} />
    <LedBoard />
  </group>;
}
