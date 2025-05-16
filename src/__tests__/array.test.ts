import { describe, it, expect } from 'vitest';
import { array } from '../index';

describe('array utilities', () => {
  describe('pick', () => {
    it('returns an item from the array and throws on empty', () => {
      const testArray = [1, 2, 3, 4, 5];
      expect(testArray).toContain(array.pick(testArray));
      expect(() => array.pick([])).toThrow();
    });
  });

  describe('shuffle', () => {
    it('returns a new array with same elements in different order', () => {
      const testArray = [1, 2, 3, 4, 5];
      const result = array.shuffle(testArray);
      expect(result).not.toBe(testArray);
      expect(result.sort()).toEqual(testArray.sort());
      expect(array.shuffle([])).toEqual([]);
    });
  });
});
