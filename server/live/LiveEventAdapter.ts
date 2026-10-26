import type { LiveEvent, LiveResult } from '../../shared/live';

export interface LiveEventAdapter {
  readonly source: 'mock' | 'tiktok';
  readonly connected: boolean;
  connect(consumer: (event: LiveEvent) => LiveResult): void;
  disconnect(): void;
}
