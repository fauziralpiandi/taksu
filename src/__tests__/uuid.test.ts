import { describe, it, expect } from 'vitest';
import { uuid } from '../index';

describe('uuid', () => {
  it('generates valid and unique v4 UUIDs', () => {
    const result = uuid.v4();
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(result).toMatch(uuidV4Regex);

    const uuids = new Set();
    for (let i = 0; i < 100; i++) {
      const id = uuid.v4();
      expect(id).toMatch(uuidV4Regex);
      uuids.add(id);
    }

    expect(uuids.size).toBe(100);
  });

  it('v4 method produces valid UUID v4 format', () => {
    const result = uuid.v4();
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(result).toMatch(uuidV4Regex);
  });

  it('simple method produces valid simplified UUID format', () => {
    const result = uuid.simple();
    // 32 hex characters = 128 bits of entropy
    expect(result.length).toBe(32);
    expect(result).toMatch(/^[0-9a-f]{32}$/i);
    expect(result).not.toContain('-');

    const uuids = new Set();
    for (let i = 0; i < 100; i++) {
      uuids.add(uuid.simple());
    }

    expect(uuids.size).toBe(100);
  });
});
