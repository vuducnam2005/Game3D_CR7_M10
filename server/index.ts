import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { gameConfigSchema } from '../shared/game';
import { createGameServer } from './gameServer';
import { readTikTokConfig } from './live/tikTokConfig';

if (existsSync(resolve('.env'))) process.loadEnvFile(resolve('.env'));
const port = Number(process.env.GAME_PORT ?? 3001);
const host = process.env.GAME_HOST ?? '127.0.0.1';
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('GAME_PORT must be between 1 and 65535.');
const config = gameConfigSchema.parse(JSON.parse(readFileSync(resolve('config/game.config.json'), 'utf8')));
const snapshotPath = resolve(process.env.GAME_SNAPSHOT_PATH ?? 'data/game-state.json');
const game = createGameServer({ config, snapshotPath, tiktok: readTikTokConfig() });
try {
  const listeningPort = await game.listen(port, host);
  console.log(`Game server: http://${host}:${listeningPort} | Snapshot: ${snapshotPath}`);
  console.log(`Match: ${game.engine.getState().matchId} | ${game.engine.getState().status}`);
  console.log(`LIVE source: ${game.engine.getState().connection.mode} | TikTok: ${game.engine.getState().connection.tiktok.status} (Connect from Control)`);
} catch (error) {
  console.error('Khong the khoi dong game server:', error);
  process.exit(1);
}
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => { void game.close().then(() => process.exit(0)); });
}
