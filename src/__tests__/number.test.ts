import { describe, it, expect } from 'vitest';
import { number } from '../index';

describe('number', () => {
  it('generates integer values in specified range', () => {
    for (let i = 0; i < 50; i++) {
      const result = number.integer(10, 20);
      expect(result).toBeGreaterThanOrEqual(10);
      expect(result).toBeLessThanOrEqual(20);
      expect(Number.isInteger(result)).toBe(true);
    }

    const defaultResult = number.integer();
    expect(defaultResult).toBeGreaterThanOrEqual(0);
    expect(defaultResult).toBeLessThanOrEqual(100);
    expect(Number.isInteger(defaultResult)).toBe(true);
    expect(() => number.integer(20, 10)).toThrow();
  });

  it('generates float values in specified range', () => {
    for (let i = 0; i < 50; i++) {
      const result = number.float(10, 20);
      expect(result).toBeGreaterThanOrEqual(10);
      expect(result).toBeLessThan(20); // < 20, not <= 20
    }

    let hasNonInteger = false;
    for (let i = 0; i < 50; i++) {
      const result = number.float(1, 100);
      if (result !== Math.floor(result)) {
        hasNonInteger = true;
        break;
      }
    }

    expect(hasNonInteger).toBe(true);
    expect(() => number.float(20, 10)).toThrow();
  });
});
