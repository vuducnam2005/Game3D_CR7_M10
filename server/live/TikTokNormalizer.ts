import { createHash } from 'node:crypto';
import { z } from 'zod';
import { liveEventSchema, type GiftMapping, type LiveEvent } from '../../shared/live';
import { safeDisplay } from './LiveEventProcessor';

// v2.5.0 emits tiktok-live-proto/v3, not the older field names in README examples.
const numericId = z.union([z.string().regex(/^[1-9]\d{0,39}$/), z.number().int().positive().max(Number.MAX_SAFE_INTEGER), z.bigint().positive()]).transform(String);
const common = z.object({ msgId: numericId, roomId: numericId, createTime: numericId });
const user = z.object({ id: numericId, nickname: z.string().max(1000).optional(), displayId: z.string().max(1000).optional() });
const base = z.object({ common, user });
const giftSchema = base.extend({ giftId: numericId, repeatCount: z.number().int().min(1).max(10000),
  repeatEnd: z.union([z.literal(0), z.literal(1), z.boolean()]), groupId: numericId.optional(),
  gift: z.object({ type: z.number().int().min(0), name: z.string().max(1000) }),
});
export type TikTokContext = { matchId: string; round: number; scope: string; acceptAfter: number; mappings: GiftMapping[] };
const digest = (...parts: unknown[]) => createHash('sha256').update(JSON.stringify(parts)).digest('hex');

export class TikTokNormalizer {
  private seen = new Set<string>();
  private scope = '';
  normalize(type: 'gift' | 'comment' | 'follow' | 'like', raw: unknown, roomId: string, context: TikTokContext, now: number): LiveEvent {
    if (context.scope !== this.scope) { this.seen.clear(); this.scope = context.scope; }
    const data = base.parse(raw);
    if (data.common.roomId !== roomId) throw new Error('room');
    const time = Number(data.common.createTime);
    const timestamp = time < 1e12 ? time * 1000 : time;
    if (!Number.isSafeInteger(timestamp) || timestamp > now + 5000) throw new Error('timestamp');
    const stale = timestamp < context.acceptAfter || timestamp < now - 30000;
    const normalized = { eventId: digest(roomId, type, data.common.msgId), source: 'tiktok' as const, timestamp,
      matchId: context.matchId, round: context.round,
      user: { id: data.user.id, username: safeDisplay(data.user.displayId || data.user.nickname || 'viewer') },
      team: null as 'ronaldo' | 'messi' | null, metadata: { roomId, baseline: stale } };
    if (type === 'gift') {
      // Non-streak gifts may have protobuf's default groupId="0".
      const rawGift = z.object({ groupId: z.unknown().optional() }).parse(raw);
      const gift = giftSchema.parse({ ...z.record(z.string(), z.unknown()).parse(raw),
        groupId: rawGift.groupId === '0' || rawGift.groupId === 0 || rawGift.groupId === '' ? undefined : rawGift.groupId });
      const streak = gift.gift.type === 1;
      if (streak && !gift.groupId) throw new Error('streak identity');
      const streakId = digest(roomId, data.user.id, gift.giftId, streak ? gift.groupId : data.common.msgId);
      const first = !this.seen.has(streakId);
      if (first && this.seen.size >= 25000) throw new Error('normalizer capacity');
      normalized.metadata.baseline ||= streak && first && gift.repeatCount > 1;
      // An unseen partial/old streak belongs to no scoring round. Existing ledger
      // entries retain their original round and only consume this baseline count.
      if (first && normalized.metadata.baseline) normalized.round = 0;
      normalized.team = context.mappings.find(item => item.id === gift.giftId)?.team ?? null;
      const result = liveEventSchema.parse({ ...normalized, type, gift: { id: gift.giftId,
        name: safeDisplay(gift.gift.name), repeatCount: gift.repeatCount,
        repeatEnd: !streak || Boolean(gift.repeatEnd), streakId } });
      this.seen.add(streakId);
      return result;
    }
    if (stale) throw new Error('stale');
    if (type === 'like') {
      const { count } = base.extend({ count: z.number().int().min(1).max(10000) }).parse(raw);
      return liveEventSchema.parse({ ...normalized, type, count });
    }
    if (type === 'comment') {
      const text = base.extend({ comment: z.string().max(300) }).parse(raw).comment;
      const command = text.trim().toLowerCase();
      normalized.team = ['cr7', '!cr7'].includes(command) ? 'ronaldo' : ['m10', '!m10'].includes(command) ? 'messi' : null;
      return liveEventSchema.parse({ ...normalized, type, text });
    }
    return liveEventSchema.parse({ ...normalized, type });
  }
}
