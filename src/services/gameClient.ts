import { io, type Socket } from 'socket.io-client';
import type { ClientToServerEvents, ServerToClientEvents } from '../../shared/game';

export type GameSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
export function createGameClient(url?: string): GameSocket {
  return io(url, { autoConnect: false, reconnection: true, reconnectionDelayMax: 3000 });
}
