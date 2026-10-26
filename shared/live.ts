import { z } from 'zod';

export const liveTeamSchema = z.enum(['ronaldo', 'messi']);
export type LiveTeam = z.infer<typeof liveTeamSchema>;
const id = z.string().trim().min(1).max(128);
const integer = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
export const animationSchema = z.enum(['SIUUU', 'Calma', 'Sleep', 'Power Pose', 'Point Up', 'Messi Celebrate', 'Messi Eat Cookie', 'Messi Victory']);
export const soundSchema = z.enum(['gift', 'chime', 'boost', 'none']);
export const effectSchema = z.enum(['red', 'blue', 'gold', 'none']);
export const giftMappingSchema = z.object({
  id, name: z.string().trim().min(1).max(60), team: liveTeamSchema,
  points: z.number().int().min(0).max(10000), animation: animationSchema,
  sound: soundSchema, effect: effectSchema, cooldownMs: z.number().int().min(0).max(30000),
  priority: z.number().int().min(0).max(3),
}).strict().refine(value => value.team === 'messi' ? value.animation.startsWith('Messi ') : !value.animation.startsWith('Messi '), 'Animation khong thuoc skeleton cua team.');
export type GiftMapping = z.infer<typeof giftMappingSchema>;
export const DEFAULT_MAPPINGS: GiftMapping[] = [
  { id: 'rose', name: 'Rose', team: 'ronaldo', points: 10, animation: 'SIUUU', sound: 'gift', effect: 'red', cooldownMs: 1000, priority: 1 },
  { id: 'cookie', name: 'Cookie', team: 'messi', points: 10, animation: 'Messi Celebrate', sound: 'gift', effect: 'blue', cooldownMs: 1000, priority: 1 },
];
export const SIMPLE_MAPPINGS: GiftMapping[] = [
  { ...DEFAULT_MAPPINGS[0], name: 'Flower', points: 1 },
  { ...DEFAULT_MAPPINGS[1], points: 1, animation: 'Messi Eat Cookie' },
];
export const liveConfigSchema = z.object({
  mappings: z.array(giftMappingSchema).min(1).max(30), allowTeamChange: z.boolean(),
  comboWindowMs: z.number().int().min(500).max(30000), comboMultiplier: z.boolean(),
  notificationCooldownMs: z.number().int().min(500).max(10000),
}).strict().refine(value => new Set(value.mappings.map(item => item.id)).size === value.mappings.length, 'Gift ID bi trung.');
export type LiveConfig = z.infer<typeof liveConfigSchema>;
export const DEFAULT_LIVE_CONFIG: LiveConfig = {
  mappings: DEFAULT_MAPPINGS, allowTeamChange: true, comboWindowMs: 5000, comboMultiplier: false, notificationCooldownMs: 1500,
};
export const SIMPLE_LIVE_CONFIG: LiveConfig = { ...DEFAULT_LIVE_CONFIG, mappings: SIMPLE_MAPPINGS };
const userSchema = z.object({ id, username: z.string().min(1).max(160) }).strict();
const base = {
  eventId: id, source: z.enum(['mock', 'tiktok']), timestamp: integer,
  matchId: z.string().uuid(), round: z.number().int().min(0).max(26), user: userSchema,
  // Informational only: the processor always resolves the authoritative team from rules.
  team: liveTeamSchema.nullable().optional(),
  metadata: z.object({ roomId: id, baseline: z.boolean() }).strict().optional(),
};
export const liveEventSchema = z.discriminatedUnion('type', [
  z.object({ ...base, type: z.literal('gift'), gift: z.object({
    id, name: z.string().max(80), repeatCount: z.number().int().min(1).max(10000), repeatEnd: z.boolean(), streakId: id.optional(),
  }).strict() }).strict(),
  z.object({ ...base, type: z.literal('follow') }).strict(),
  z.object({ ...base, type: z.literal('like'), count: z.number().int().min(1).max(10000) }).strict(),
  z.object({ ...base, type: z.literal('comment'), text: z.string().max(300) }).strict(),
]);
export type LiveEvent = z.infer<typeof liveEventSchema>;
export const tikTokStatusSchema = z.object({
  configured: z.boolean(), username: z.string().max(24).nullable(),
  status: z.enum(['UNCONFIGURED', 'DISCONNECTED', 'CONNECTING', 'CONNECTED', 'RETRYING', 'ERROR']),
  attempt: z.number().int().min(0).max(11), retryAt: integer.nullable(), roomId: id.nullable(),
  message: z.string().max(240),
}).strict();
export type TikTokStatus = z.infer<typeof tikTokStatusSchema>;
export function emptyTikTokStatus(): TikTokStatus {
  return { configured: false, username: null, status: 'UNCONFIGURED', attempt: 0, retryAt: null, roomId: null,
    message: 'Chua cau hinh TikTok. Mock san sang.' };
}
export const mockRequestSchema = z.object({
  requestId: z.string().uuid(), matchId: z.string().uuid(), round: z.number().int().min(0).max(26),
  user: userSchema, action: z.enum(['gift', 'follow', 'comment', 'streak', 'like']),
  giftId: id.optional(), count: z.number().int().min(1).max(100).optional(), text: z.string().max(300).optional(),
}).strict().superRefine((value, ctx) => {
  if ((value.action === 'gift' || value.action === 'streak') && !value.giftId) ctx.addIssue({ code: 'custom', message: 'Can giftId.' });
  if (value.action === 'comment' && !value.text) ctx.addIssue({ code: 'custom', message: 'Can text.' });
});
export type MockRequest = z.infer<typeof mockRequestSchema>;
export const cueSchema = z.object({
  id: z.string(), team: liveTeamSchema, animation: animationSchema, sound: soundSchema, effect: effectSchema,
  count: integer, tier: z.number().int().min(0).max(20), priority: z.number().int().min(0).max(3),
  cooldownMs: integer, startedAt: z.number().nonnegative(), endsAt: z.number().nonnegative(),
}).strict();
export type CelebrationCue = z.infer<typeof cueSchema>;
const laneSchema = z.object({ active: cueSchema.nullable(), queued: z.array(cueSchema).max(4), readyAt: z.number().nonnegative() }).strict();
export const feedSchema = z.object({
  id: z.string(), kind: z.enum(['gift', 'follow', 'join']), username: z.string().max(80),
  team: liveTeamSchema.nullable(), text: z.string().max(240), expiresAt: z.number().nonnegative(),
}).strict();
export const liveStateSchema = z.object({
  config: liveConfigSchema, adapter: z.enum(['CONNECTED', 'DISCONNECTED']), followerCount: integer, giftCount: integer,
  likeCount: integer.default(0), crowdUntil: integer.default(0),
  comboExpiresAt: z.object({ ronaldo: z.number(), messi: z.number() }).strict(),
  celebrations: z.object({ ronaldo: laneSchema, messi: laneSchema }).strict(),
  feed: z.array(feedSchema).max(8),
  log: z.array(z.object({ id: z.string(), type: z.string().max(20), message: z.string().max(240), timestamp: integer }).strict()).max(80),
  droppedEffects: integer, suppressedNotices: integer,
}).strict();
export type LiveState = z.infer<typeof liveStateSchema>;
export function emptyLiveState(config: LiveConfig = DEFAULT_LIVE_CONFIG): LiveState {
  return { config: structuredClone(config), adapter: 'DISCONNECTED', followerCount: 0, giftCount: 0, likeCount: 0, crowdUntil: 0,
    comboExpiresAt: { ronaldo: 0, messi: 0 },
    celebrations: { ronaldo: { active: null, queued: [], readyAt: 0 }, messi: { active: null, queued: [], readyAt: 0 } },
    feed: [], log: [], droppedEffects: 0, suppressedNotices: 0 };
}
export type LiveResult = { status: 'accepted' | 'duplicate' | 'ignored'; points: number; giftCount: number; message: string };
export const runtimeSchema = z.object({
  events: z.array(z.tuple([z.string(), z.string()])).max(50000),
  streaks: z.array(z.tuple([z.string(), z.object({ matchId: z.string().uuid(), round: integer,
    received: integer, closed: z.boolean(), mapping: giftMappingSchema.nullable() }).strict()])).max(25000),
  followers: z.array(z.string()).max(10000),
  supporters: z.array(z.object({ userId: z.string(), username: z.string().max(80), team: liveTeamSchema, giftCount: integer, contribution: integer }).strict()).max(20000),
  lastNoticeAt: z.number(),
}).strict();
export type LiveRuntime = z.infer<typeof runtimeSchema>;
export function emptyLiveRuntime(): LiveRuntime { return { events: [], streaks: [], followers: [], supporters: [], lastNoticeAt: -10000 }; }
