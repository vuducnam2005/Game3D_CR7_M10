import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  return {
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: Number(env.WEB_PORT ?? 5173),
    strictPort: false,
    proxy: {
      '/api': `http://127.0.0.1:${env.GAME_PORT ?? 3001}`,
      '/socket.io': { target: `http://127.0.0.1:${env.GAME_PORT ?? 3001}`, ws: true },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
    proxy: {
      '/api': `http://127.0.0.1:${env.GAME_PORT ?? 3001}`,
      '/socket.io': { target: `http://127.0.0.1:${env.GAME_PORT ?? 3001}`, ws: true },
    },
  },
  };
});
