import type { GameState, Outcome } from '../../shared/game';
import type { AnimationFrame } from '../characters/AnimationManager';
import type { QualityLevel } from '../scene/quality';

export function resultPresentation(state: GameState) {
  const phase = state.status === 'PAUSED' ? state.pausedFrom : state.status;
  if (state.config.simpleMode && (phase === 'MATCH_END' || phase === 'ROUND_END')
    && Object.values(state.live.celebrations).some(lane => lane.active || lane.queued.length)) return null;
  const round = state.roundResults.at(-1);
  const outcome: Outcome | null = phase === 'MATCH_END' ? state.winner : phase === 'ROUND_END' ? round?.winner ?? null : null;
  if (!outcome) return null;
  return { id: `${state.matchId}:${state.round}:${phase}`, outcome, match: phase === 'MATCH_END',
    scores: phase === 'MATCH_END' ? state.totalScores : round!.scores };
}

export function effectBudget(level: QualityLevel, enabled: boolean, heavy: boolean, reduced: boolean) {
  if (!enabled) return { particles: 0, confetti: 0, stars: 0, flash: false };
  return { particles: reduced ? 0 : level === 'low' ? 12 : 64,
    confetti: reduced || !heavy ? 0 : level === 'low' ? 8 : level === 'high' ? 96 : 48,
    stars: reduced ? 0 : level === 'low' ? 3 : 8, flash: heavy && !reduced && level !== 'low' };
}

// Markers use the rendered clip clock, including delayed model loading or queued clips.
export function animationMarkers(frame: AnimationFrame) {
  if (!frame.name || /Idle|mixamo/.test(frame.name)) return [];
  return [{ kind: 'gift' as const, at: 0.05 }, { kind: 'combo' as const, at: 0.35 },
    { kind: frame.name === 'SIUUU' ? 'siuuu' as const : frame.name.startsWith('Messi ') ? 'messi' as const : 'crowd' as const,
      at: frame.name === 'SIUUU' ? 2.62 : 0.8 }, { kind: 'crowd' as const, at: frame.name === 'SIUUU' ? 2.95 : 1.3 }];
}
