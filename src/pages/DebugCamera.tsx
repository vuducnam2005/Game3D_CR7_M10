import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export function DebugCamera({ comparison }: { comparison: boolean }) {
  const { camera, size } = useThree();
  useEffect(() => {
    const halfWidth = comparison ? 3.1 : 1.55;
    const distance = Math.max(9, halfWidth / (Math.tan(Math.PI / 10) * size.width / size.height));
    camera.position.set(0, 3, distance);
    camera.lookAt(0, 2.25, 0);
    camera.updateProjectionMatrix();
  }, [camera, comparison, size.width, size.height]);
  return <OrbitControls key={String(comparison)} enableDamping makeDefault maxDistance={30} maxPolarAngle={Math.PI / 2.02} minDistance={2.5} target={[0, 2.25, 0]} />;
}
