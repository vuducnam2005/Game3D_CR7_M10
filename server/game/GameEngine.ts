import { randomUUID } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import { commandSchema, DEFAULT_CONFIG, gameConfigSchema, gameStateSchema, timedStatusSchema,
  type GameConfig, type GameState, type TimedStatus } from '../../shared/game';
import { addPoints, emptyScores } from './ScoreManager';
import { finishRound, matchOutcome } from './RoundManager';
import { emptyLiveState, emptyTikTokStatus, SIMPLE_LIVE_CONFIG, type TikTokStatus, type LiveRuntime } from '../../shared/live';
import { LiveEventProcessor } from '../live/LiveEventProcessor';
import { DEFAULT_PRESENTATION } from '../../shared/presentation';
import { enqueueCelebration } from '../live/CelebrationQueue';

function initialState(config: GameConfig, revision = 0): GameState {
  return {
    matchId: randomUUID(), revision, config: structuredClone(config), status: 'WAITING', pausedFrom: null,
    round: 0, overtime: false, remainingMs: config.roundSeconds * 1000,
    scores: emptyScores(), totalScores: emptyScores(), roundWins: emptyScores(), combos: emptyScores(),
    teamMembers: [], giftHistory: [], topSupporters: [], roundResults: [], winner: null,
    live: emptyLiveState(config.simpleMode ? SIMPLE_LIVE_CONFIG : undefined), presentation: structuredClone(DEFAULT_PRESENTATION), leadChange: null,
    connection: { server: 'ONLINE', live: 'DISCONNECTED', mode: 'NONE', clients: 0, tiktok: emptyTikTokStatus() },
  };
}

export class GameEngine {
  private state: GameState;
  private lastTick: number;
  private live: LiveEventProcessor;

  constructor(config: GameConfig = DEFAULT_CONFIG, private readonly now: () => number = () => performance.timeOrigin + performance.now(), restored?: GameState, runtime?: LiveRuntime) {
    this.state = restored ? gameStateSchema.parse(restored) : initialState(gameConfigSchema.parse(config));
    if (restored && config.simpleMode && !this.state.config.simpleMode && this.state.status === 'WAITING' && this.state.round === 0
      && this.state.scores.ronaldo === 0 && this.state.scores.messi === 0 && this.state.giftHistory.length === 0) {
      this.state.config = gameConfigSchema.parse(config);
      this.state.remainingMs = this.state.config.roundSeconds * 1000;
      this.state.live.config = structuredClone(SIMPLE_LIVE_CONFIG);
    }
    this.lastTick = now();
    this.live = new LiveEventProcessor(runtime);
    if (restored) {
      const timed = timedStatusSchema.safeParse(this.state.status);
      // A server restart freezes the saved phase; downtime never consumes a match.
      if (timed.success) { this.state.status = 'PAUSED'; this.state.pausedFrom = timed.data; }
      this.state.connection = { server: 'ONLINE', live: 'DISCONNECTED', mode: 'NONE', clients: 0, tiktok: emptyTikTokStatus() };
      const savedLive = this.state.live;
      this.state.live = { ...savedLive, adapter: 'DISCONNECTED', feed: [], crowdUntil: 0, celebrations: emptyLiveState().celebrations, comboExpiresAt: { ronaldo: 0, messi: 0 } };
      this.state.combos = emptyScores();
      this.state.leadChange = null;
      this.state.revision++;
    }
  }

  getState(): GameState { return structuredClone(this.state); }
  getLiveRuntime(): LiveRuntime { return this.live.export(); }
  setMockConnected(connected: boolean) {
    this.state.connection.mode = 'MOCK';
    this.state.live.adapter = connected ? 'CONNECTED' : 'DISCONNECTED';
    this.state.revision++;
  }
  setTikTokStatus(status: TikTokStatus) {
    this.state.connection.tiktok = structuredClone(status);
    this.state.connection.mode = status.status === 'CONNECTED' ? 'TIKTOK' : 'MOCK';
    this.state.connection.live = status.status === 'CONNECTED' ? 'CONNECTED'
      : ['ERROR', 'RETRYING'].includes(status.status) ? 'ERROR' : 'DISCONNECTED';
    this.state.live.adapter = status.status === 'CONNECTED' ? 'DISCONNECTED' : 'CONNECTED';
    this.logTransport(status.message);
  }
  logTransport(message: string) {
    this.state.live.log.unshift({ id: randomUUID(), type: 'connection', message: message.slice(0, 240), timestamp: Math.floor(this.now()) });
    this.state.live.log.length = Math.min(80, this.state.live.log.length);
    this.state.revision++;
  }
  ingestLive(input: unknown) {
    this.tick();
    const previous = this.leader();
    const result = this.live.process(this.state, input, this.now());
    this.trackLead(previous);
    this.state.revision++;
    return result;
  }

  tick(): boolean {
    const current = this.now();
    let elapsed = Math.max(0, current - this.lastTick);
    this.lastTick = current;
    let changed = false;
    // Unlimited mode keeps the current round open until the operator pauses or resets it.
    if (this.state.config.unlimitedTime && this.state.status === 'PLAYING') {
      changed = this.live.tick(this.state, current);
      if (this.state.leadChange && current >= this.state.leadChange.endsAt) { this.state.leadChange = null; changed = true; }
      if (changed) this.state.revision++;
      return changed;
    }
    // Carry excess elapsed time across phase boundaries, even after an event-loop stall.
    while (timedStatusSchema.safeParse(this.state.status).success) {
      if (this.state.config.unlimitedTime && this.state.status === 'PLAYING') break;
      if (elapsed < this.state.remainingMs) {
        if (elapsed > 0) { this.state.remainingMs -= elapsed; changed = true; }
        break;
      }
      elapsed -= this.state.remainingMs;
      this.state.remainingMs = 0;
      this.transition();
      changed = true;
    }
    changed = this.live.tick(this.state, current) || changed;
    if (this.state.leadChange && current >= this.state.leadChange.endsAt) { this.state.leadChange = null; changed = true; }
    if (changed) this.state.revision++;
    return changed;
  }

  execute(input: unknown): void {
    this.tick();
    const parsed = commandSchema.safeParse(input);
    if (!parsed.success) throw new Error('Lenh hoac cau hinh khong hop le.');
    const command = parsed.data;
    const state = this.state;
    if (command.matchId !== state.matchId) throw new Error('Tran da thay doi. Hay dong bo lai truoc khi dieu khien.');
    switch (command.type) {
      case 'liveConnection':
        throw new Error('Lenh ket noi phai duoc xu ly boi game server.');
      case 'start':
        this.require(state.status === 'WAITING', 'Chi bat dau khi WAITING.');
        this.beginRound();
        break;
      case 'pause': {
        const phase = timedStatusSchema.safeParse(state.status);
        this.require(phase.success, 'Khong co timer dang chay de tam dung.');
        state.pausedFrom = phase.data!;
        state.status = 'PAUSED';
        break;
      }
      case 'resume':
        this.require(state.status === 'PAUSED' && state.pausedFrom !== null, 'Tran chua tam dung.');
        state.status = state.pausedFrom!;
        state.pausedFrom = null;
        break;
      case 'reset': {
        const connection = { ...state.connection };
        this.state = initialState(state.config, state.revision);
        this.state.connection = connection;
        this.state.presentation = structuredClone(state.presentation);
        this.state.live = emptyLiveState(state.live.config);
        this.state.live.adapter = state.live.adapter;
        this.live = new LiveEventProcessor();
        break;
      }
      case 'finish': {
        this.require(state.config.simpleMode && state.round === 1 && (state.status === 'PLAYING' || (state.status === 'PAUSED' && state.pausedFrom === 'PLAYING')), 'Chi ket thuc luot dang choi.');
        const result = finishRound(state);
        state.roundResults.push(result);
        if (result.winner !== 'draw') state.roundWins[result.winner]++;
        state.winner = result.winner;
        state.status = 'MATCH_END';
        state.pausedFrom = null;
        state.remainingMs = 0;
        break;
      }
      case 'presentation':
        state.presentation = { ...state.presentation, ...command.patch, hud: { ...state.presentation.hud, ...command.patch.hud } };
        break;
      case 'animate':
        this.require(command.animation.startsWith('Messi ') === (command.team === 'messi'), 'Animation khong thuoc skeleton cua team.');
        enqueueCelebration(state.live, { id: 'manual', name: 'Manual animation', team: command.team, points: 0,
          animation: command.animation, sound: 'none', effect: command.team === 'messi' ? 'blue' : 'red', cooldownMs: 500, priority: 1 }, 0, 0, this.now());
        state.live.log.unshift({ id: randomUUID(), type: 'animation', message: `${command.team}: ${command.animation} (preview, +0 points)`, timestamp: Math.floor(this.now()) });
        state.live.log = state.live.log.slice(0, 80);
        break;
      case 'liveConfig':
        this.require(state.status === 'WAITING', 'Chi doi live config khi WAITING.');
        state.live.config = structuredClone(command.config);
        break;
      case 'configure':
        this.require(state.status === 'WAITING', 'Chi doi cau hinh khi WAITING; reset de tao tran moi.');
        state.config = structuredClone(command.config);
        state.remainingMs = command.config.roundSeconds * 1000;
        break;
      case 'setTimer':
        this.require(state.status === 'PLAYING' || (state.status === 'PAUSED' && state.pausedFrom === 'PLAYING'), 'Chi chinh timer cua hiep dang choi.');
        state.remainingMs = command.seconds * 1000;
        break;
      case 'addScore': {
        const previous = this.leader();
        this.require(state.status === 'PLAYING', 'Chi nhan diem khi PLAYING.');
        this.require(state.round === command.round, 'Hiep da thay doi; diem cu khong duoc ap dung cho hiep moi.');
        const scores = addPoints(state.scores, command.team, command.points);
        const totals = addPoints(state.totalScores, command.team, command.points);
        state.scores = scores;
        state.totalScores = totals;
        if (state.config.simpleMode) {
          const mapping = command.team === 'ronaldo'
            ? { id: 'rose', name: 'Rose', team: 'ronaldo' as const, points: 1, animation: 'SIUUU' as const, sound: 'gift' as const, effect: 'red' as const, cooldownMs: 1000, priority: 1 }
            : { id: 'cookie', name: 'Cookie', team: 'messi' as const, points: 1, animation: 'Messi Eat Cookie' as const, sound: 'gift' as const, effect: 'blue' as const, cooldownMs: 1000, priority: 1 };
          enqueueCelebration(state.live, mapping, command.points, 0, this.now(), state.config[command.team === 'ronaldo' ? 'ronaldoSpeed' : 'messiSpeed'], true);
        }
        this.trackLead(previous);
        break;
      }
    }
    this.state.revision++;
    this.tick();
  }

  setClientCount(clients: number): void {
    if (this.state.connection.clients !== clients) { this.state.connection.clients = clients; this.state.revision++; }
  }

  private require(condition: boolean, message: string): asserts condition {
    if (!condition) throw new Error(message);
  }

  private leader() {
    const { ronaldo, messi } = this.state.scores;
    return ronaldo === messi ? null : ronaldo > messi ? 'ronaldo' : 'messi';
  }

  private trackLead(previous: ReturnType<GameEngine['leader']>) {
    const team = this.leader();
    if (team && team !== previous) this.state.leadChange = { team, endsAt: this.now() + 3000 };
    else if (!team) this.state.leadChange = null;
  }

  private enter(status: TimedStatus, seconds: number) {
    this.state.status = status;
    this.state.remainingMs = status === 'PLAYING' && this.state.config.unlimitedTime ? 0 : seconds * 1000;
  }

  private beginRound() {
    this.state.leadChange = null;
    this.state.round++;
    this.state.overtime = this.state.round > this.state.config.rounds;
    this.state.scores = emptyScores();
    this.state.combos = emptyScores();
    this.state.live.comboExpiresAt = { ronaldo: 0, messi: 0 };
    for (const lane of Object.values(this.state.live.celebrations)) lane.queued = [];
    this.enter('COUNTDOWN', this.state.config.countdownSeconds);
  }

  private transition() {
    const state = this.state;
    if (state.status === 'COUNTDOWN') this.enter('PLAYING', state.overtime ? state.config.overtimeSeconds : state.config.roundSeconds);
    else if (state.status === 'PLAYING') {
      const result = finishRound(state);
      state.roundResults.push(result);
      if (result.winner !== 'draw') state.roundWins[result.winner]++;
      this.enter('ROUND_END', state.config.roundBreakSeconds);
    } else if (state.status === 'ROUND_END') {
      const outcome = matchOutcome(state);
      if (outcome !== null) { state.status = 'MATCH_END'; state.winner = outcome; }
      else this.beginRound();
    }
  }
}
