import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import type { WebGLRenderer } from 'three';

export function monitorRenderer(gl: WebGLRenderer, onError: (message: string | null) => void) {
  const lost = (event: Event) => {
    event.preventDefault();
    onError('WEBGL CONTEXT LOST: GPU da ngat. Dang cho khoi phuc; neu khong, tai lai trang hoac chon Low trong Control. Diem van luu o server.');
  };
  const restored = () => onError(null);
  const previous = gl.debug.onShaderError;
  gl.debug.onShaderError = (context, program, vertex, fragment) => {
    console.error('WebGL shader compilation failed', context.getProgramInfoLog(program), context.getShaderInfoLog(vertex), context.getShaderInfoLog(fragment));
    onError('SHADER ERROR: GPU khong bien dich duoc material. Kiem tra console, driver va WebGL2; thu Low hoac tai lai trang.');
  };
  gl.domElement.addEventListener('webglcontextlost', lost);
  gl.domElement.addEventListener('webglcontextrestored', restored);
  return () => {
    gl.domElement.removeEventListener('webglcontextlost', lost);
    gl.domElement.removeEventListener('webglcontextrestored', restored);
    gl.debug.onShaderError = previous;
  };
}

export function RendererDiagnostics({ onError }: { onError: (message: string | null) => void }) {
  const gl = useThree(state => state.gl);
  useEffect(() => monitorRenderer(gl, onError), [gl, onError]);
  return null;
}
