import { describe, it, expect } from 'vitest';
import { bool } from '../bool';

describe('bool', () => {
  it('generates boolean values', () => {
    expect(typeof bool()).toBe('boolean');
  });

  it('respects probability parameter', () => {
    const testProbability = (probability: number, iterations = 1000): void => {
      let trueCount = 0;
      for (let i = 0; i < iterations; i++) {
        if (bool(probability)) trueCount++;
      }

      const ratio = trueCount / iterations;
      const tolerance = 0.1;

      expect(ratio).toBeGreaterThan(probability - tolerance);
      expect(ratio).toBeLessThan(probability + tolerance);
    };

    testProbability(0.5);
    testProbability(0.8);
    testProbability(0.2);
  });

  it('validates probability range', () => {
    expect(() => bool(-0.1)).toThrow();
    expect(() => bool(1.1)).toThrow();
    expect(() => bool(0)).not.toThrow();
    expect(() => bool(1)).not.toThrow();
  });
});
