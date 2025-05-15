import { describe, it, expect } from 'vitest';
import { number } from '../number';

describe('number', () => {
  it('generates numbers within specified ranges', () => {
    const testRange = (
      options: Parameters<typeof number>[0] = {},
      iterations = 100,
    ): void => {
      const min = options.min ?? 0;
      const max = options.max ?? 1;

      for (let i = 0; i < iterations; i++) {
        const result = number(options);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
      }
    };

    testRange();
    testRange({ min: 10, max: 20 });
    testRange({ min: -50, max: 50 });
  });

  it('handles integer and float generation correctly', () => {
    for (let i = 0; i < 50; i++) {
      expect(Number.isInteger(number({ min: 1, max: 100 }))).toBe(true);
    }

    let hasFloat = false;
    for (let i = 0; i < 50; i++) {
      const result = number({ min: 1, max: 10, float: true });
      if (result !== Math.floor(result)) {
        hasFloat = true;
        break;
      }
    }
    expect(hasFloat).toBe(true);
  });

  it('validates input parameters', () => {
    expect(() => number({ min: 10, max: 5 })).toThrow();
    expect(() => number({ min: 0, max: 0 })).not.toThrow();
  });
});
