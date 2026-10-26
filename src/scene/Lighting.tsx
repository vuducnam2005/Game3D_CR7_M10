import { QUALITY, type QualityLevel } from './quality';

export function Lighting({ quality, transparent = false }: { quality: QualityLevel; transparent?: boolean }) {
  const shadowSize = QUALITY[quality].shadowSize;
  return <>
    {!transparent && <><color attach="background" args={['#071523']} /><fog attach="fog" args={['#071523', 24, 65]} /></>}
    <ambientLight intensity={0.6} />
    <hemisphereLight args={['#ceeaff', '#17432d', 1.55]} />
    <directionalLight position={[0, 5, 8]} intensity={2.5} color="#fff2dc" />
    <directionalLight key={shadowSize} castShadow={shadowSize > 0} position={[-4, 8, 4]} intensity={2.5} color="#d8e9ff"
      shadow-mapSize={[shadowSize || 512, shadowSize || 512]} shadow-camera-left={-6} shadow-camera-right={6} shadow-camera-top={6} shadow-camera-bottom={-4}
      shadow-camera-near={0.5} shadow-camera-far={25} shadow-bias={-0.00015} shadow-normalBias={0.025} />
    <pointLight position={[-3.7, 2.8, 0.5]} color="#ff432b" intensity={30} distance={7} decay={2} />
    <pointLight position={[3.7, 2.8, 0.5]} color="#38baff" intensity={35} distance={7} decay={2} />
    <directionalLight position={[0, 5, -6]} color="#7dcaff" intensity={1.8} />
  </>;
}
