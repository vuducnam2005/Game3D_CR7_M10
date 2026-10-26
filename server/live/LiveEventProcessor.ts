import { createHash, randomUUID } from 'node:crypto';
import type { GameState } from '../../shared/game';
import { SIMPLE_MAPPINGS, emptyLiveRuntime, liveEventSchema, type LiveRuntime, type LiveResult, type LiveEvent } from '../../shared/live';
import { addPoints } from '../game/ScoreManager';
import { comboPoints, comboTier } from './ComboManager';
import { enqueueCelebration, tickCelebrations } from './CelebrationQueue';

function gameGift(state: GameState, id: string, name: string) {
  const configured = state.live.config.mappings.find(item => item.id === id);
  if (!state.config.simpleMode) return configured ?? null;
  if (configured && ['rose', 'cookie'].includes(configured.id)) {
    const canonical = SIMPLE_MAPPINGS.find(item => item.id === configured.id)!;
    return { ...structuredClone(configured), team: canonical.team, points: 1, animation: configured.id === 'cookie' ? 'Messi Eat Cookie' : canonical.animation };
  }
  const normalized = name.normalize('NFKC').trim().toLowerCase();
  if (id === 'rose' || ['rose', 'flower', 'hoa hồng', 'hoa hong'].includes(normalized)) return SIMPLE_MAPPINGS[0];
  if (id === 'cookie' || ['cookie', 'biscuit', 'bánh quy', 'banh quy'].includes(normalized)) return SIMPLE_MAPPINGS[1];
  return null;
}

export function safeDisplay(text: string, max = 80) {
  return text.normalize('NFKC').replace(/[<>"&\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, '').trim().slice(0, max) || 'viewer';
}

export class LiveEventProcessor {
  private events: Map<string, string>;
  private streaks: Map<string, LiveRuntime['streaks'][number][1]>;
  private followers: Set<string>;
  private supporters: Map<string, LiveRuntime['supporters'][number]>;
  private lastNoticeAt: number;

  constructor(saved: LiveRuntime = emptyLiveRuntime()) {
    this.events = new Map(saved.events.map(([key, fingerprint]) => [key,
      /^[a-f0-9]{64}$/.test(fingerprint) ? fingerprint : createHash('sha256').update(fingerprint).digest('hex')]));
    this.streaks = new Map(structuredClone(saved.streaks));
    this.followers = new Set(saved.followers);
    this.supporters = new Map(saved.supporters.map(item => [JSON.stringify([item.userId, item.team]), { ...item }]));
    this.lastNoticeAt = saved.lastNoticeAt;
  }
  export(): LiveRuntime {
    return structuredClone({ events: [...this.events], streaks: [...this.streaks], followers: [...this.followers], supporters: [...this.supporters.values()], lastNoticeAt: this.lastNoticeAt });
  }

  process(state: GameState, input: unknown, now: number): LiveResult {
    const event = liveEventSchema.parse(input);
    if (event.matchId !== state.matchId) throw new Error('Event thuoc tran cu.');
    const userId = createHash('sha256').update(JSON.stringify([event.source, event.user.id])).digest('hex');
    const eventKey = JSON.stringify([event.source, event.eventId]);
    const identity = createHash('sha256').update(JSON.stringify(event.type === 'gift'
      ? [event.type, userId, event.gift.id, event.gift.streakId ?? event.eventId]
      : [event.type, userId, event.type === 'comment' ? event.text.trim().toLowerCase() : event.type === 'like' ? event.count : ''])).digest('hex');
    const seen = this.events.get(eventKey);
    if (seen && seen !== identity) throw new Error('Event ID da duoc dung cho du lieu khac.');
    if (!seen && this.events.size >= 50000) throw new Error('Event ledger day (50000); tao tran moi de tiep tuc.');
    const result = (status: LiveResult['status'], message: string, points = 0, giftCount = 0): LiveResult => {
      this.events.set(eventKey, identity);
      if (status !== 'duplicate') {
        state.live.log.unshift({ id: randomUUID(), type: event.type, message: safeDisplay(message, 240), timestamp: Math.floor(now) });
        state.live.log.length = Math.min(80, state.live.log.length);
      }
      return { status, message, points, giftCount };
    };
    if (event.type !== 'gift' && seen) return result('duplicate', 'Event da xu ly.');
    const username = safeDisplay(event.user.username);

    if (event.type === 'gift') {
      const gift = event.gift;
      const key = JSON.stringify([event.source, userId, gift.id, gift.streakId ?? event.eventId]);
      let streak = this.streaks.get(key);
      if (!streak && this.streaks.size >= 25000) throw new Error('Streak ledger day (25000); tao tran moi de tiep tuc.');
      if (streak?.closed) return result('duplicate', 'Streak da ket thuc.');
      streak ??= { matchId: event.matchId, round: event.round, received: 0, closed: false,
        mapping: structuredClone(gameGift(state, gift.id, gift.name)) };
      const delta = Math.max(0, gift.repeatCount - streak.received);
      const mapping = streak.mapping;
      const eligible = !event.metadata?.baseline && state.status === 'PLAYING' && event.round === state.round && streak.round === state.round && mapping !== null;
      if (eligible && delta > 0) {
        const team = mapping.team;
        const previousCombo = state.live.comboExpiresAt[team] > now ? state.combos[team] : 0;
        const points = state.config.simpleMode ? delta : comboPoints(previousCombo, delta, mapping.points, state.live.config.comboMultiplier);
        const scores = points ? addPoints(state.scores, team, points) : { ...state.scores };
        const totals = points ? addPoints(state.totalScores, team, points) : { ...state.totalScores };
        const supporterKey = JSON.stringify([userId, team]);
        if (!this.supporters.has(supporterKey) && this.supporters.size >= 20000) throw new Error('Supporter limit reached.');
        const supporter = this.supporters.get(supporterKey) ?? { userId, username, team, giftCount: 0, contribution: 0 };
        state.scores = scores;
        state.totalScores = totals;
        state.combos[team] = state.config.simpleMode ? 0 : previousCombo + delta;
        state.live.comboExpiresAt[team] = state.config.simpleMode ? 0 : now + state.live.config.comboWindowMs;
        state.live.giftCount += delta;
        supporter.username = username;
        supporter.giftCount += delta;
        supporter.contribution += points;
        this.supporters.set(supporterKey, supporter);
        const ranked = [...this.supporters.values()].sort((a, b) => b.contribution - a.contribution || b.giftCount - a.giftCount || a.userId.localeCompare(b.userId));
        state.topSupporters = (['ronaldo', 'messi'] as const).flatMap(team => ranked.filter(item => item.team === team).slice(0, 3).map(item => ({ ...item })));
        state.giftHistory.unshift({ eventId: event.eventId, userId, username, giftId: gift.id, giftName: safeDisplay(mapping.name, 60), team, count: delta, points, timestamp: Math.floor(now) });
        state.giftHistory.length = Math.min(100, state.giftHistory.length);
        this.feed(state, { id: randomUUID(), kind: 'gift', username, team, text: `${safeDisplay(mapping.name, 60)} x${delta} / +${points}`, expiresAt: now + 5000 });
        enqueueCelebration(state.live, mapping, delta, state.config.simpleMode ? 0 : comboTier(state.combos[team]), now, state.config[team === 'ronaldo' ? 'ronaldoSpeed' : 'messiSpeed'], state.config.simpleMode);
        streak.received = Math.max(streak.received, gift.repeatCount);
        streak.closed = gift.repeatEnd;
        this.streaks.set(key, streak);
        return result('accepted', `${username}: ${safeDisplay(mapping.name, 60)} x${delta}, +${points}`, points, delta);
      }
      // Consume ineligible increments too: paused/out-of-round gifts must not reappear on resume.
      streak.received = Math.max(streak.received, gift.repeatCount);
      streak.closed = gift.repeatEnd;
      this.streaks.set(key, streak);
      return result(delta === 0 ? 'duplicate' : 'ignored', !mapping ? `Gift ${gift.id} (${gift.name}) chua co mapping.` : delta === 0 ? 'Khong co gift moi.' : event.metadata?.baseline ? 'Gift TikTok cu/partial streak: chi ghi moc, khong cong diem.' : 'Gift ngoai hiep PLAYING, khong cong diem.');
    }

    if (event.type === 'like') {
      if (!Number.isSafeInteger(state.live.likeCount + event.count)) throw new Error('Like count limit reached.');
      state.live.likeCount += event.count;
      if (!state.live.crowdUntil) state.live.crowdUntil = Math.floor(now + 2000);
      return result('accepted', `${username}: ${event.count} likes / crowd cheer, +0 points.`);
    }

    if (event.type === 'follow') {
      if (this.followers.has(userId)) return result('duplicate', 'User da follow trong tran nay.');
      if (this.followers.size >= 10000) throw new Error('Follower limit reached.');
      this.followers.add(userId);
      state.live.followerCount = this.followers.size;
      const team = state.teamMembers.find(member => member.userId === userId)?.team ?? null;
      this.notice(state, username, team, 'follow', `Welcome @${username}`, now);
      return result('accepted', `Welcome @${username}`);
    }

    const text = event.text.trim().toLowerCase();
    const team = ['cr7', '!cr7'].includes(text) ? 'ronaldo' : ['m10', '!m10'].includes(text) ? 'messi' : null;
    if (!team) return result('ignored', 'Comment khong phai lenh chon team.');
    const member = state.teamMembers.find(item => item.userId === userId);
    if (member?.team === team) return result('duplicate', 'User da o team nay.');
    if (member && !state.live.config.allowTeamChange) return result('ignored', 'Doi team dang bi tat.');
    if (!member && state.teamMembers.length >= 10000) throw new Error('Team member limit reached.');
    if (member) { member.team = team; member.username = username; }
    else state.teamMembers.push({ userId, username, team });
    this.notice(state, username, team, 'join', `@${username} joined ${team === 'ronaldo' ? 'CR7' : 'M10'}`, now);
    return result('accepted', `@${username} joined ${team}`);
  }

  tick(state: GameState, now: number) {
    let changed = tickCelebrations(state.live, now, { ronaldo: state.config.ronaldoSpeed, messi: state.config.messiSpeed }, state.config.simpleMode);
    if (state.live.crowdUntil && now >= state.live.crowdUntil) { state.live.crowdUntil = 0; changed = true; }
    for (const team of ['ronaldo', 'messi'] as const) {
      if (state.combos[team] && now >= state.live.comboExpiresAt[team]) { state.combos[team] = 0; changed = true; }
    }
    const feed = state.live.feed.filter(item => item.expiresAt > now);
    if (feed.length !== state.live.feed.length) { state.live.feed = feed; changed = true; }
    return changed;
  }

  private feed(state: GameState, item: GameState['live']['feed'][number]) {
    state.live.feed.unshift(item);
    state.live.feed.length = Math.min(8, state.live.feed.length);
  }
  private notice(state: GameState, username: string, team: GameState['live']['feed'][number]['team'], kind: 'follow' | 'join', text: string, now: number) {
    if (now - this.lastNoticeAt < state.live.config.notificationCooldownMs) { state.live.suppressedNotices++; return; }
    this.lastNoticeAt = now;
    this.feed(state, { id: randomUUID(), kind, username, team, text, expiresAt: now + 5000 });
  }
}
