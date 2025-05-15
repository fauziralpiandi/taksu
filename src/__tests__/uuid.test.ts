import { describe, it, expect } from 'vitest';
import { uuid } from '../uuid';

describe('uuid', () => {
  it('generates valid and unique v4 UUIDs', () => {
    const result = uuid();
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(result).toMatch(uuidV4Regex);

    const uuids = new Set();
    for (let i = 0; i < 100; i++) {
      const id = uuid();
      expect(id).toMatch(uuidV4Regex);
      uuids.add(id);
    }

    expect(uuids.size).toBe(100);
  });
});
