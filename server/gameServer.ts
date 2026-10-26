import express, { type ErrorRequestHandler } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { commandSchema, DEFAULT_CONFIG, type ClientToServerEvents, type CommandResult, type GameConfig,
  type GameSnapshot, type ServerToClientEvents, type MockResponse } from '../shared/game';
import { GameEngine } from './game/GameEngine';
import { SnapshotStore } from './storage';
import { MockEventAdapter } from './live/MockEventAdapter';
import { TikTokLiveEventAdapter } from './live/TikTokLiveEventAdapter';
import { readTikTokConfig, type TikTokSettings } from './live/tikTokConfig';
import type { TikTokTransportFactory } from './live/tikTokTransport';

type Options = { snapshotPath: string; config?: GameConfig; now?: () => number; tickMs?: number;
  tiktok?: TikTokSettings; tikTokFactory?: TikTokTransportFactory };

export function createGameServer(options: Options) {
  const storage = new SnapshotStore(options.snapshotPath);
  const restored = storage.load();
  const engine = new GameEngine(options.config ?? DEFAULT_CONFIG, options.now, restored, storage.getRuntime());
  const mock = new MockEventAdapter();
  mock.connect(event => engine.ingestLive(event));
  engine.setMockConnected(true);
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '16kb' }));
  const http = createServer(app);
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(http, { maxHttpBufferSize: 16 * 1024 });
  let interval: ReturnType<typeof setInterval> | undefined;
  let persistenceError: string | null = null;
  let lastSaved = 0;
  let savedRevision = -1;
  let closed = false;
  let contextKey = '';
  let contextVersion = 0;
  let acceptAfter = Date.now();
  function refreshContext() {
    const state = engine.getState();
    const key = `${state.matchId}/${state.round}/${state.status}/${state.connection.mode}`;
    if (key !== contextKey) {
      contextKey = key; contextVersion++;
      // TikTok timestamps can be second precision. Drop the ambiguous boundary second.
      acceptAfter = Math.ceil(Date.now() / 1000) * 1000;
    }
    return { matchId: state.matchId, round: state.round, scope: String(contextVersion), acceptAfter, mappings: state.live.config.mappings };
  }
  const tiktok = new TikTokLiveEventAdapter({
    settings: options.tiktok ?? readTikTokConfig({}), factory: options.tikTokFactory,
    context: () => { engine.tick(); return refreshContext(); },
    onStatus: status => {
      if (closed) return;
      if (status.status === 'CONNECTED') mock.disconnect();
      else if (!mock.connected) mock.connect(event => engine.ingestLive(event));
      engine.setTikTokStatus(status); refreshContext(); persist(true); publish();
    },
    onLog: message => { if (!closed) { engine.logTransport(message); persist(true); publish(); } },
  });
  engine.setTikTokStatus(tiktok.getStatus());
  refreshContext();

  function snapshot(): GameSnapshot { return { serverTime: Date.now(), state: engine.getState() }; }
  function persist(force = false) {
    const state = engine.getState();
    if (!force && (state.revision === savedRevision || Date.now() - lastSaved < 1000)) return;
    try {
      storage.save(state, engine.getLiveRuntime());
      savedRevision = state.revision;
      lastSaved = Date.now();
      persistenceError = null;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Snapshot write failed';
      if (message !== persistenceError) console.error(`Snapshot: ${message}`);
      persistenceError = message;
    }
  }
  function publish() { io.emit('game:snapshot', snapshot()); }
  function tickAndPublish() {
    const previous = engine.getState();
    if (!engine.tick()) return;
    const next = engine.getState();
    refreshContext();
    persist(previous.status !== next.status || previous.round !== next.round);
    publish();
  }
  function command(input: unknown): CommandResult {
    try {
      const parsed = commandSchema.safeParse(input);
      if (closed) throw new Error('Game server dang dong.');
      if (parsed.success && parsed.data.type === 'liveConnection') {
        if (parsed.data.matchId !== engine.getState().matchId) throw new Error('Tran da thay doi. Hay dong bo lai.');
        if (parsed.data.action === 'mock') tiktok.disconnect();
        else tiktok.connect(event => {
          const result = engine.ingestLive(event);
          persist(true); publish(); return result;
        });
      } else engine.execute(input);
      refreshContext();
      persist(true);
      publish();
      return { ok: true, snapshot: snapshot() };
    } catch (error) {
      // execute() advances time even when it rejects a command at the deadline.
      persist(true);
      publish();
      return { ok: false, error: error instanceof Error ? error.message : 'Lenh that bai.', snapshot: snapshot() };
    }
  }
  function mockEvent(input: unknown): MockResponse {
    try {
      if (closed || !mock.connected || tiktok.connected) throw new Error('Mock tam khoa khi TikTok Connected. Chon Use Mock truoc.');
      const results = mock.emit(input);
      persist(true);
      publish();
      return { ok: true, results, snapshot: snapshot() };
    } catch (error) {
      persist(true);
      publish();
      return { ok: false, error: error instanceof Error ? error.message : 'Mock event failed.', snapshot: snapshot() };
    }
  }

  app.get('/api/health', (_request, response) => {
    response.status(persistenceError ? 503 : 200).json({ status: persistenceError ? 'degraded' : 'ok', persistenceError });
  });
  app.get('/api/state', (_request, response) => {
    tickAndPublish();
    response.set('Cache-Control', 'no-store').json(snapshot());
  });
  app.post('/api/command', (request, response) => {
    const result = command(request.body);
    response.status(result.ok ? 200 : 400).json(result);
  });
  app.post('/api/mock', (request, response) => {
    const result = mockEvent(request.body);
    response.status(result.ok ? 200 : 400).json(result);
  });
  const handleError: ErrorRequestHandler = (error, _request, response, _next) => {
    response.status(error.status === 413 ? 413 : 400).json({ error: 'JSON request khong hop le hoac qua lon.' });
  };
  app.use(handleError);

  io.on('connection', socket => {
    tickAndPublish();
    engine.setClientCount(io.engine.clientsCount);
    publish();
    socket.on('game:sync', () => { tickAndPublish(); socket.emit('game:snapshot', snapshot()); });
    socket.on('game:command', (input, ack) => {
      const result = command(input);
      if (typeof ack === 'function') ack(result);
    });
    socket.on('live:mock', (input, ack) => {
      const result = mockEvent(input);
      if (typeof ack === 'function') ack(result);
    });
    socket.on('disconnect', () => {
      engine.setClientCount(io.of('/').sockets.size);
      publish();
    });
  });

  return {
    engine, http, io,
    async listen(port = 3001, host = '127.0.0.1') {
      await new Promise<void>((resolve, reject) => {
        http.once('error', reject);
        http.listen(port, host, () => { http.off('error', reject); resolve(); });
      });
      persist(true);
      interval = setInterval(() => {
        tickAndPublish();
        persist();
      }, options.tickMs ?? 100);
      return (http.address() as { port: number }).port;
    },
    async close() {
      if (closed) return;
      closed = true;
      clearInterval(interval);
      tiktok.disconnect();
      engine.setTikTokStatus(tiktok.getStatus());
      engine.tick();
      mock.disconnect();
      engine.setMockConnected(false);
      persist(true);
      await new Promise<void>(resolve => io.close(() => resolve()));
    },
  };
}
