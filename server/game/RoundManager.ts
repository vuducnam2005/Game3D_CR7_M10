import type { GameState, Outcome, RoundResult } from '../../shared/game';
import { decideWinner } from './ScoreManager';

export function finishRound(state: GameState): RoundResult {
  return { round: state.round, overtime: state.overtime, scores: { ...state.scores }, winner: decideWinner(state.scores) };
}

export function matchOutcome(state: GameState): Outcome | null {
  if (state.round < state.config.rounds) return null;
  const winner = decideWinner(state.roundWins);
  if (winner !== 'draw') return winner;
  if (state.config.tieBreaker === 'draw' || state.round >= state.config.rounds + state.config.maxOvertimeRounds) return 'draw';
  return null;
}
