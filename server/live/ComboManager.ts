export function comboTier(count: number) {
  return count >= 20 ? 20 : count >= 10 ? 10 : count >= 5 ? 5 : count >= 3 ? 3 : 0;
}
export function comboPoints(previous: number, delta: number, unitPoints: number, multiplier: boolean) {
  if (!multiplier) return delta * unitPoints;
  // Sum each newly received gift's tier, so batching a streak cannot change its score.
  let points = 0;
  for (let index = previous + 1; index <= previous + delta; index++) {
    const factor = index >= 20 ? 5 : index >= 10 ? 3 : index >= 5 ? 2 : 1;
    points += unitPoints * factor;
  }
  return points;
}
