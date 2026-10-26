import type { Outcome, Scores, Team } from '../../shared/game';

export function emptyScores(): Scores { return { ronaldo: 0, messi: 0 }; }
export function decideWinner(scores: Scores): Outcome {
  if (scores.ronaldo === scores.messi) return 'draw';
  return scores.ronaldo > scores.messi ? 'ronaldo' : 'messi';
}
export function addPoints(scores: Scores, team: Team, points: number): Scores {
  if (!Number.isSafeInteger(points) || points <= 0 || !Number.isSafeInteger(scores[team] + points)) {
    throw new Error('Diem phai la so nguyen duong va khong vuot gioi han an toan.');
  }
  return { ...scores, [team]: scores[team] + points };
}
