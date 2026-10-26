import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { z } from 'zod';
import { gameStateSchema, type GameState } from '../shared/game';
import { decideWinner, emptyScores } from './game/ScoreManager';
import { matchOutcome } from './game/RoundManager';
import { emptyLiveRuntime, runtimeSchema, type LiveRuntime } from '../shared/live';

const storedSchema = z.object({ version: z.union([z.literal(1), z.literal(2)]), savedAt: z.number().int().nonnegative(), state: gameStateSchema,
  runtime: runtimeSchema.optional() }).strict();

function validateConsistency(state: GameState) {
  const completed = state.status === 'ROUND_END' || state.status === 'MATCH_END'
    || (state.status === 'PAUSED' && state.pausedFrom === 'ROUND_END');
  const expectedResults = state.round - (state.round > 0 && !completed ? 1 : 0);
  if (state.roundResults.length !== expectedResults
    || (state.status === 'PAUSED') !== (state.pausedFrom !== null)
    || (state.status === 'WAITING') !== (state.round === 0)
    || state.round > state.config.rounds + state.config.maxOvertimeRounds
    || state.overtime !== (state.round > state.config.rounds)
    || (state.status === 'MATCH_END') !== (state.winner !== null)) throw new Error('Inconsistent match state.');
  const totals = emptyScores();
  const wins = emptyScores();
  state.roundResults.forEach((round, index) => {
    if (round.round !== index + 1 || round.overtime !== (round.round > state.config.rounds)
      || round.winner !== decideWinner(round.scores)) throw new Error('Inconsistent round result.');
    totals.ronaldo += round.scores.ronaldo;
    totals.messi += round.scores.messi;
    if (round.winner !== 'draw') wins[round.winner]++;
  });
  for (const team of ['ronaldo', 'messi'] as const) {
    const expectedTotal = totals[team] + (completed ? 0 : state.scores[team]);
    if (state.totalScores[team] !== expectedTotal || state.roundWins[team] !== wins[team]
      || (completed && state.scores[team] !== state.roundResults.at(-1)?.scores[team])) throw new Error('Inconsistent scores.');
  }
  if (state.winner !== null && (state.winner !== matchOutcome(state) || state.remainingMs !== 0)) throw new Error('Inconsistent match result.');
}

export class SnapshotStore {
  private runtime: LiveRuntime = emptyLiveRuntime();
  constructor(readonly path: string) {}

  load(): GameState | undefined {
    if (!existsSync(this.path)) return undefined;
    try {
      const saved = storedSchema.parse(JSON.parse(readFileSync(this.path, 'utf8')));
      if (saved.version === 2 && !saved.runtime) throw new Error('Missing idempotency ledger.');
      validateConsistency(saved.state);
      this.runtime = saved.runtime ?? emptyLiveRuntime();
      if (saved.version === 2 && this.runtime.followers.length !== saved.state.live.followerCount) throw new Error('Inconsistent follower count.');
      const giftCount = this.runtime.supporters.reduce((sum, supporter) => sum + supporter.giftCount, 0);
      if (giftCount !== saved.state.live.giftCount) throw new Error('Inconsistent gift ledger.');
      if (new Set(this.runtime.events.map(([key]) => key)).size !== this.runtime.events.length
        || new Set(this.runtime.streaks.map(([key]) => key)).size !== this.runtime.streaks.length
        || new Set(this.runtime.followers).size !== this.runtime.followers.length) throw new Error('Duplicate ledger keys.');
      if (giftCount > 0 && (!this.runtime.events.length || !this.runtime.streaks.length)) throw new Error('Missing gift deduplication keys.');
      return saved.state;
    } catch (error) {
      throw new Error(`Khong the doc snapshot ${this.path}. File duoc giu nguyen; kiem tra/sao luu file truoc khi khoi dong lai.`, { cause: error });
    }
  }

  getRuntime(): LiveRuntime { return structuredClone(this.runtime); }
  save(state: GameState, runtime: LiveRuntime = emptyLiveRuntime()) {
    const saved = storedSchema.parse({ version: 2, savedAt: Date.now(), state, runtime });
    mkdirSync(dirname(this.path), { recursive: true });
    const temporary = `${this.path}.tmp`;
    writeFileSync(temporary, JSON.stringify(saved, null, 2), 'utf8');
    renameSync(temporary, this.path);
  }
}
