import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { QUALITY, shouldReduceQuality, type QualityChoice, type QualityLevel } from './quality';

export type SceneMetrics = { fps: number; level: QualityLevel; calls: number; triangles: number };
export function ScenePerformance({ choice, level, onReduce, onMetrics }: { choice: QualityChoice; level: QualityLevel; onReduce: () => void; onMetrics?: (value: SceneMetrics) => void }) {
  const { gl, setDpr, invalidate } = useThree();
  const sample = useRef({ elapsed: 0, frames: 0, warmup: 0, history: [] as number[] });
  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio || 1, QUALITY[level].dpr));
    gl.shadowMap.enabled = QUALITY[level].shadowSize > 0;
    gl.shadowMap.needsUpdate = true;
    invalidate();
    sample.current = { elapsed: 0, frames: 0, warmup: 0, history: [] };
  }, [level, gl, setDpr, invalidate, choice]);
  useFrame((_, delta) => {
    if (document.hidden || delta <= 0) return;
    const current = sample.current;
    current.warmup += delta;
    current.elapsed += delta;
    current.frames++;
    if (current.elapsed < 2) return;
    onMetrics?.({ fps: Math.round(current.frames / current.elapsed), level, calls: gl.info.render.calls, triangles: gl.info.render.triangles });
    current.history.push(current.elapsed / current.frames * 1000);
    current.history = current.history.slice(-3);
    current.frames = 0; current.elapsed = 0;
    if (choice === 'auto' && level !== 'low' && current.warmup >= 5 && shouldReduceQuality(current.history)) onReduce();
  });
  return null;
}
