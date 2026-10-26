import { useCallback, useEffect, useRef, useState } from 'react';
import { snapshotSchema, type GameCommand, type GameSnapshot } from '../../shared/game';
import { createGameClient, type GameSocket } from '../services/gameClient';
import type { MockRequest, LiveResult } from '../../shared/live';

export function useGameServer() {
  const socket = useRef<GameSocket | null>(null);
  const [snapshot, setSnapshot] = useState<GameSnapshot | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [mockResults, setMockResults] = useState<LiveResult[]>([]);
  const busy = useRef(false);
  const accept = useCallback((input: unknown) => {
    const parsed = snapshotSchema.safeParse(input);
    if (!parsed.success) { setError('Server tra ve snapshot khong hop le.'); return; }
    setSnapshot(previous => previous && previous.state.matchId === parsed.data.state.matchId
      && previous.state.revision > parsed.data.state.revision ? previous : parsed.data);
  }, []);

  useEffect(() => {
    const client = createGameClient();
    socket.current = client;
    client.on('connect', () => { setConnected(true); setError(null); client.emit('game:sync'); });
    client.on('disconnect', () => setConnected(false));
    client.on('connect_error', () => { setConnected(false); setError('Khong ket noi duoc game server. Kiem tra npm run dev.'); });
    client.on('game:snapshot', accept);
    client.connect();
    return () => { client.removeAllListeners(); client.disconnect(); socket.current = null; };
  }, [accept]);

  const send = useCallback(async (command: GameCommand) => {
    const client = socket.current;
    if (!client?.connected || busy.current) return;
    busy.current = true;
    setPending(true);
    setError(null);
    try {
      // Never buffer/retry scoring commands across a reconnect.
      const result = await client.timeout(4000).emitWithAck('game:command', command);
      accept(result.snapshot);
      if (!result.ok) setError(result.error);
    } catch {
      setError('Chua nhan xac nhan lenh. Dang dong bo lai; kiem tra diem truoc khi gui lai.');
      if (client.connected) client.emit('game:sync');
    } finally { busy.current = false; setPending(false); }
  }, [accept]);
  const sendMock = useCallback(async (request: MockRequest) => {
    const client = socket.current;
    if (!client?.connected || busy.current) return;
    busy.current = true;
    setPending(true);
    setError(null);
    try {
      const result = await client.timeout(5000).emitWithAck('live:mock', request);
      accept(result.snapshot);
      if (result.ok) setMockResults(result.results);
      else setError(result.error);
    } catch {
      setError('Chua nhan ack. Dung Replay last de gui lai cung ID an toan.');
      if (client.connected) client.emit('game:sync');
    } finally { busy.current = false; setPending(false); }
  }, [accept]);
  return { snapshot, connected, error, pending, send, sendMock, mockResults };
}
