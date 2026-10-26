import { describe, expect, it } from 'vitest';
import { calculateNormalization, type CharacterBounds } from '../src/characters/CharacterNormalizer';

describe('calculateNormalization', () => {
  it('centers X/Z, moves the geometric ground to zero, and preserves uniform scale', () => {
    const bounds: CharacterBounds = {
      min: [-1, -0.5, -0.25],
      max: [1, 1.5, 0.75],
      size: [2, 2, 1],
      center: [0, 0.5, 0.25],
    };

    const result = calculateNormalization(bounds, 3);

    expect(result.scale).toBe(1.5);
    expect(result.offset).toEqual([0, 0.5, -0.25]);
    expect(result.normalizedBounds.min.toArray()).toEqual([-1, 0, -0.5]);
    expect(result.normalizedBounds.max.toArray()).toEqual([1, 2, 0.5]);
  });

  it('rejects invalid dimensions instead of silently rendering an invisible model', () => {
    const bounds: CharacterBounds = {
      min: [0, 0, 0],
      max: [0, 0, 0],
      size: [0, 0, 0],
      center: [0, 0, 0],
    };

    expect(() => calculateNormalization(bounds, 3)).toThrow('Source height must be positive');
  });

  it('can preserve a verified animation floor below the rest-pose soles', () => {
    const bounds: CharacterBounds = { min: [-1, 0.012, -1], max: [1, 1.838, 1], size: [2, 1.826, 2], center: [0, 0.925, 0] };
    const result = calculateNormalization(bounds, 3.15, 0);
    expect(result.offset[1]).toBe(0);
    expect(result.normalizedBounds.min.y).toBeCloseTo(0.012);
    expect(() => calculateNormalization(bounds, 3.15, NaN)).toThrow('Ground height must be finite');
  });
});
