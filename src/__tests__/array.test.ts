import { describe, it, expect } from 'vitest';
import { pick, shuffle, sample } from '../array';

describe('array utilities', () => {
  describe('pick', () => {
    it('returns an item from the array and throws on empty', () => {
      const array = [1, 2, 3, 4, 5];
      expect(array).toContain(pick(array));
      expect(() => pick([])).toThrow();
    });
  });

  describe('shuffle', () => {
    it('returns a new array with same elements in different order', () => {
      const array = [1, 2, 3, 4, 5];
      const result = shuffle(array);

      expect(result).not.toBe(array);
      expect(result.sort()).toEqual(array.sort());
      expect(shuffle([])).toEqual([]);
    });
  });

  describe('sample', () => {
    it('returns unique items by default', () => {
      const array = [1, 2, 3, 4, 5];
      const result = sample(array, 3);

      expect(result.length).toBe(3);
      expect(new Set(result).size).toBe(3);
      expect(result.every(item => array.includes(item))).toBe(true);
    });

    it('handles edge cases correctly', () => {
      const array = [1, 2, 3];

      expect(sample(array, 0)).toEqual([]);
      expect(() => sample(array, 4)).toThrow();
      expect(() => sample(array, -1)).toThrow();
    });

    it('allows duplicates when specified', () => {
      const array = [1];
      const result = sample(array, 3, { allowDuplicates: true });

      expect(result).toHaveLength(3);
      expect(result.every(item => item === 1)).toBe(true);
    });
  });
});
