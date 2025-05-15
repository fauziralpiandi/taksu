import { describe, it, expect } from 'vitest';
import { color } from '../color';

describe('color', () => {
  it('generates valid and diverse hex color codes', () => {
    const result = color();
    expect(result).toMatch(/^#[0-9A-F]{6}$/i);

    const colors = new Set();
    for (let i = 0; i < 100; i++) {
      colors.add(color());
    }

    expect(colors.size).toBeGreaterThan(90);
  });
});
