import { z } from 'zod';
import { animationSchema, emptyLiveState, emptyTikTokStatus, tikTokStatusSchema, liveConfigSchema, liveStateSchema, mockRequestSchema, type LiveResult } from './live';
import { DEFAULT_PRESENTATION, presentationSchema, presentationPatchSchema } from './presentation';

export const teamSchema = z.enum(['ronaldo', 'messi']);
export type Team = z.infer<typeof teamSchema>;
const count = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
const scoresSchema = z.object({ ronaldo: count, messi: count }).strict();
const outcomeSchema = z.enum(['ronaldo', 'messi', 'draw']);
export type Outcome = z.infer<typeof outcomeSchema>;
export type Scores = z.infer<typeof scoresSchema>;
export const gameConfigSchema = z.object({
  rounds: z.number().int().min(1).max(21),
  roundSeconds: z.number().int().min(1).max(3600),
  simpleMode: z.boolean().default(false),
  unlimitedTime: z.boolean().default(false),
  ronaldoSpeed: z.number().min(0.5).max(2.5).default(1),
  messiSpeed: z.number().min(0.5).max(2.5).default(1),
  countdownSeconds: z.number().int().min(0).max(30),
  roundBreakSeconds: z.number().int().min(0).max(60),
  tieBreaker: z.enum(['draw', 'overtime']),
  overtimeSeconds: z.number().int().min(1).max(3600),
  maxOvertimeRounds: z.number().int().min(1).max(5),
}).strict().refine(value => !value.simpleMode || (value.rounds === 1 && value.countdownSeconds === 0 && value.roundBreakSeconds === 0 && value.tieBreaker === 'draw'), 'Che do don gian chi co mot luot choi.');
export type GameConfig = z.infer<typeof gameConfigSchema>;
export const DEFAULT_CONFIG: GameConfig = {
  rounds: 3, roundSeconds: 120, simpleMode: false, unlimitedTime: false, ronaldoSpeed: 1, messiSpeed: 1, countdownSeconds: 3, roundBreakSeconds: 5,
  tieBreaker: 'draw', overtimeSeconds: 30, maxOvertimeRounds: 3,
};
export const statusSchema = z.enum(['WAITING', 'COUNTDOWN', 'PLAYING', 'PAUSED', 'ROUND_END', 'MATCH_END']);
export const timedStatusSchema = z.enum(['COUNTDOWN', 'PLAYING', 'ROUND_END']);
export type TimedStatus = z.infer<typeof timedStatusSchema>;
const memberSchema = z.object({ userId: z.string().max(128), username: z.string().max(80), team: teamSchema }).strict();
const supporterSchema = memberSchema.extend({ giftCount: count, contribution: count });
const giftSchema = z.object({
  eventId: z.string().max(256), userId: z.string().max(128), username: z.string().max(80),
  giftId: z.string().max(128), giftName: z.string().max(80), team: teamSchema,
  count, points: count, timestamp: count,
}).strict();
export const roundResultSchema = z.object({
  round: z.number().int().positive().max(26), overtime: z.boolean(), scores: scoresSchema, winner: outcomeSchema,
}).strict();
export type RoundResult = z.infer<typeof roundResultSchema>;
export const gameStateSchema = z.object({
  matchId: z.string().uuid(), revision: count, config: gameConfigSchema,
  status: statusSchema, pausedFrom: timedStatusSchema.nullable(), round: z.number().int().min(0).max(26),
  overtime: z.boolean(), remainingMs: z.number().min(0).max(3_600_000),
  scores: scoresSchema, totalScores: scoresSchema, roundWins: scoresSchema, combos: scoresSchema,
  teamMembers: z.array(memberSchema).max(10000), giftHistory: z.array(giftSchema).max(100),
  topSupporters: z.array(supporterSchema).max(6),
  live: liveStateSchema.default(() => emptyLiveState()),
  presentation: presentationSchema.default(() => structuredClone(DEFAULT_PRESENTATION)),
  leadChange: z.object({ team: teamSchema, endsAt: z.number().nonnegative() }).strict().nullable().default(null),
  roundResults: z.array(roundResultSchema).max(26), winner: outcomeSchema.nullable(),
  connection: z.object({
    server: z.literal('ONLINE'), live: z.enum(['DISCONNECTED', 'CONNECTED', 'ERROR']),
    mode: z.enum(['NONE', 'MOCK', 'TIKTOK']), clients: count,
    tiktok: tikTokStatusSchema.default(emptyTikTokStatus),
  }).strict(),
}).strict();
export type GameState = z.infer<typeof gameStateSchema>;
export const snapshotSchema = z.object({ serverTime: count, state: gameStateSchema }).strict();
export type GameSnapshot = z.infer<typeof snapshotSchema>;

const matchId = z.string().uuid();
export const commandSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('liveConnection'), matchId, action: z.enum(['connect', 'mock']) }).strict(),
  z.object({ type: z.literal('presentation'), matchId, patch: presentationPatchSchema }).strict(),
  z.object({ type: z.literal('animate'), matchId, team: teamSchema, animation: animationSchema }).strict(),
  z.object({ type: z.literal('liveConfig'), matchId, config: liveConfigSchema }).strict(),
  z.object({ type: z.literal('start'), matchId }).strict(),
  z.object({ type: z.literal('pause'), matchId }).strict(),
  z.object({ type: z.literal('resume'), matchId }).strict(),
  z.object({ type: z.literal('reset'), matchId }).strict(),
  z.object({ type: z.literal('finish'), matchId }).strict(),
  z.object({ type: z.literal('configure'), matchId, config: gameConfigSchema }).strict(),
  z.object({ type: z.literal('setTimer'), matchId, seconds: z.number().int().min(0).max(3600) }).strict(),
  z.object({
    type: z.literal('addScore'), matchId, round: z.number().int().positive().max(26),
    team: teamSchema, points: z.number().int().positive().max(1_000_000),
  }).strict(),
]);
export type GameCommand = z.infer<typeof commandSchema>;
export type CommandResult = { ok: true; snapshot: GameSnapshot } | { ok: false; error: string; snapshot: GameSnapshot };
export interface ServerToClientEvents { 'game:snapshot': (snapshot: GameSnapshot) => void }
export interface ClientToServerEvents {
  'game:command': (command: GameCommand, ack: (result: CommandResult) => void) => void;
  'game:sync': () => void;
  'live:mock': (request: z.infer<typeof mockRequestSchema>, ack: (result: MockResponse) => void) => void;
}
export type MockResponse = { ok: true; results: LiveResult[]; snapshot: GameSnapshot } | { ok: false; error: string; snapshot: GameSnapshot };
