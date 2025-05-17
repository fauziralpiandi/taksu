import { describe, it, expect } from 'vitest';
import { bool } from '../index';

describe('bool', () => {
  it('generates boolean values', () => {
    expect(typeof bool.probability()).toBe('boolean');
  });

  it('respects probability parameter', () => {
    const testProbability = (value: number, iterations = 1000): void => {
      let trueCount = 0;
      for (let i = 0; i < iterations; i++) {
        if (bool.probability(value)) trueCount++;
      }

      const ratio = trueCount / iterations;
      // Allow statistical variance within reason
      const tolerance = 0.1;
      expect(ratio).toBeGreaterThan(value - tolerance);
      expect(ratio).toBeLessThan(value + tolerance);
    };

    testProbability(0.5);
    testProbability(0.8);
    testProbability(0.2);
  });

  it('validates probability range', () => {
    expect(() => bool.probability(-0.1)).toThrow();
    expect(() => bool.probability(1.1)).toThrow();
    // Include exact boundaries
    expect(() => bool.probability(0)).not.toThrow();
    expect(() => bool.probability(1)).not.toThrow();
  });

  it('supports percentage-based chance', () => {
    expect(typeof bool.chance(50)).toBe('boolean');

    let trueCount = 0;
    const iterations = 1000;
    for (let i = 0; i < iterations; i++) {
      if (bool.chance(30)) trueCount++;
    }

    const ratio = trueCount / iterations;
    // ~30% chance
    expect(ratio).toBeGreaterThan(0.2);
    expect(ratio).toBeLessThan(0.4);

    expect(() => bool.chance(-10)).toThrow();
    expect(() => bool.chance(110)).toThrow();
  });
});
