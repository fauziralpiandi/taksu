import { describe, it, expect } from 'vitest';
import { color } from '../index';

describe('color', () => {
  it('generates valid and diverse hex color codes', () => {
    const result = color.hex();
    expect(result).toMatch(/^#[0-9A-F]{6}$/i);

    // With 16.7M possible colors,
    // we expect high uniqueness even in small samples
    // <90 unique values would indicate serious bias
    const colors = new Set();
    for (let i = 0; i < 100; i++) {
      colors.add(color.hex());
    }

    expect(colors.size).toBeGreaterThan(90);
  });

  it('generates valid RGB color values', () => {
    const rgb = color.rgb();
    expect(typeof rgb).toBe('string');
    expect(rgb).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);

    const match = rgb.match(/rgb\((\d+), (\d+), (\d+)\)/);

    if (match) {
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      // 8-bit per channel
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(255);
      expect(g).toBeGreaterThanOrEqual(0);
      expect(g).toBeLessThanOrEqual(255);
      expect(b).toBeGreaterThanOrEqual(0);
      expect(b).toBeLessThanOrEqual(255);
    } else {
      expect(match).not.toBeNull();
    }
  });
});
