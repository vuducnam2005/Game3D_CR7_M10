import { randomUUID } from 'node:crypto';
import type { GiftMapping, LiveState } from '../../shared/live';

export const ANIMATION_MS: Record<GiftMapping['animation'], number> = {
  SIUUU: 3984, Calma: 3000, Sleep: 3000, 'Power Pose': 3000, 'Point Up': 3000,
  'Messi Celebrate': 3200, 'Messi Eat Cookie': 3000, 'Messi Victory': 5300,
};
export function enqueueCelebration(live: LiveState, mapping: GiftMapping, count: number, tier: number, now: number, speed = 1, onePerGift = false) {
  const lane = live.celebrations[mapping.team];
  const merge = lane.queued.find(item => item.animation === mapping.animation && item.effect === mapping.effect && item.sound === mapping.sound);
  if (merge) {
    merge.count += count; merge.tier = Math.max(merge.tier, tier); merge.priority = Math.max(merge.priority, mapping.priority);
    merge.cooldownMs = Math.max(merge.cooldownMs, mapping.cooldownMs);
    lane.queued.sort((a, b) => b.priority - a.priority);
    return;
  }
  if (lane.queued.length === 4) {
    const lowest = lane.queued.reduce((a, item, index) => item.priority < lane.queued[a].priority ? index : a, 0);
    live.droppedEffects++;
    if (lane.queued[lowest].priority >= mapping.priority) return;
    lane.queued.splice(lowest, 1);
  }
  lane.queued.push({ id: randomUUID(), team: mapping.team, animation: mapping.animation,
    sound: mapping.sound, effect: mapping.effect, cooldownMs: mapping.cooldownMs,
    count, tier, priority: mapping.priority, startedAt: 0, endsAt: 0 });
  lane.queued.sort((a, b) => b.priority - a.priority);
  tickCelebrations(live, now, { ronaldo: mapping.team === 'ronaldo' ? speed : 1, messi: mapping.team === 'messi' ? speed : 1 }, onePerGift);
}
export function tickCelebrations(live: LiveState, now: number, speeds = { ronaldo: 1, messi: 1 }, onePerGift = false) {
  let changed = false;
  for (const team of ['ronaldo', 'messi'] as const) {
    const lane = live.celebrations[team];
    if (lane.active && now >= lane.active.endsAt) { lane.active = null; changed = true; }
    if (!lane.active && lane.queued.length && now >= lane.readyAt) {
      const cue = lane.queued.shift()!;
      if (onePerGift && cue.count > 1) lane.queued.unshift({ ...cue, id: randomUUID(), count: cue.count - 1 });
      if (onePerGift) cue.count = 1;
      cue.startedAt = now;
      cue.endsAt = now + ANIMATION_MS[cue.animation] / speeds[team];
      lane.active = cue;
      lane.readyAt = Math.max(cue.endsAt, now + cue.cooldownMs);
      changed = true;
    }
  }
  return changed;
}
