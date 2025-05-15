import { describe, it, expect } from 'vitest';
import { id } from '../id';

describe('id', () => {
  it('generates alphanumeric strings of specified length', () => {
    const testId = id(20);

    expect(testId.length).toBe(20);
    expect(testId).toMatch(/^[A-Za-z0-9]+$/);
    expect(id().length).toBe(12);
  });

  it('validates length parameter', () => {
    expect(() => id(0)).toThrow();
    expect(() => id(-5)).toThrow();
  });

  it('produces unique IDs across multiple calls', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(id(8));
    }

    expect(ids.size).toBe(100);
  });
});
