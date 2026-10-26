import { liveEventSchema, mockRequestSchema, type LiveEvent, type LiveResult } from '../../shared/live';
import type { LiveEventAdapter } from './LiveEventAdapter';

export class MockEventAdapter implements LiveEventAdapter {
  readonly source = 'mock';
  private consumer: ((event: LiveEvent) => LiveResult) | null = null;
  get connected() { return this.consumer !== null; }
  connect(consumer: (event: LiveEvent) => LiveResult) { this.consumer = consumer; }
  disconnect() { this.consumer = null; }

  emit(input: unknown): LiveResult[] {
    if (!this.consumer) throw new Error('Mock adapter chua ket noi.');
    const request = mockRequestSchema.parse(input);
    const base = { eventId: request.requestId, source: this.source, timestamp: Date.now(), matchId: request.matchId, round: request.round, user: request.user };
    const events: unknown[] = [];
    if (request.action === 'follow') events.push({ ...base, type: 'follow' });
    else if (request.action === 'like') events.push({ ...base, type: 'like', count: request.count ?? 1 });
    else if (request.action === 'comment') events.push({ ...base, type: 'comment', text: request.text });
    else {
      const count = request.count ?? 1;
      const counts = request.action === 'streak' ? [...new Set([1, Math.ceil(count / 2), count])] : [count];
      for (const repeatCount of counts) events.push({ ...base, eventId: `${request.requestId}-${repeatCount}`, type: 'gift',
        gift: { id: request.giftId, name: request.giftId, repeatCount, repeatEnd: request.action !== 'streak', streakId: request.requestId } });
      if (request.action === 'streak') {
        events.push(events.at(-1));
        events.push({ ...base, eventId: `${request.requestId}-end`, type: 'gift',
          gift: { id: request.giftId, name: request.giftId, repeatCount: count, repeatEnd: true, streakId: request.requestId } });
      }
    }
    return events.map(event => this.consumer!(liveEventSchema.parse(event)));
  }
}
