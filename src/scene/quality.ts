export type QualityLevel = 'low' | 'standard' | 'high';
export type QualityChoice = QualityLevel | 'auto';

export const QUALITY = {
  low: { dpr: 1, shadowSize: 0, crowdRows: 3, crowdColumns: 40, stars: 60 },
  standard: { dpr: 1.5, shadowSize: 1024, crowdRows: 5, crowdColumns: 64, stars: 110 },
  high: { dpr: 2, shadowSize: 2048, crowdRows: 6, crowdColumns: 80, stars: 160 },
} as const;

export function shouldReduceQuality(samples: readonly number[]): boolean {
  return samples.length >= 3 && samples.slice(-3).every(milliseconds => milliseconds > 35);
}
