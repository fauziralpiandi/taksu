import { describe, it, expect } from 'vitest';
import { id } from '../index';

describe('id', () => {
  it('generates alphanumeric strings of specified length', () => {
    const testId = id.alphanumeric(20);
    expect(testId.length).toBe(20);
    expect(testId).toMatch(/^[A-Za-z0-9]+$/);
    expect(id.alphanumeric().length).toBe(12);
  });

  it('validates length parameter', () => {
    expect(() => id.alphanumeric(0)).toThrow();
    expect(() => id.alphanumeric(-5)).toThrow();
  });

  it('produces unique IDs across multiple calls', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(id.alphanumeric(8));
    }

    expect(ids.size).toBe(100);
  });

  it('generates numeric-only strings', () => {
    const testId = id.numeric(10);
    expect(testId.length).toBe(10);
    expect(testId).toMatch(/^[0-9]+$/);
    expect(testId).not.toMatch(/[A-Za-z]/);
    expect(id.numeric().length).toBe(12);
  });

  it('ensures alphanumeric works', () => {
    const testId = id.alphanumeric(18);
    expect(testId.length).toBe(18);
    expect(testId).toMatch(/^[A-Za-z0-9]+$/);
    expect(id.alphanumeric().length).toBe(12);
  });
});
