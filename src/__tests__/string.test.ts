import { describe, it, expect } from 'vitest';
import { string } from '../index';

describe('string utilities', () => {
  describe('random', () => {
    it('generates a random string with default parameters', () => {
      // Default contract: 8 chars, 62-symbol space
      const result = string.random();
      expect(result).toHaveLength(8);
      expect(result).toMatch(/^[A-Za-z0-9]+$/);
    });

    it('generates a random string with custom length', () => {
      const length = 16;
      const result = string.random(length);
      expect(result).toHaveLength(length);
    });

    it('generates a random string with custom charset', () => {
      const result = string.random(8, 'ABC');
      expect(result).toHaveLength(8);
      expect(result).toMatch(/^[ABC]+$/);
    });

    it('throws error with invalid parameters', () => {
      // Fail-fast over silent error propagation
      expect(() => string.random(-1)).toThrow();
      expect(() => string.random(0)).toThrow();
      expect(() => string.random(10, '')).toThrow();
    });
  });

  describe('alphanumeric', () => {
    it('generates alphanumeric string with default parameters', () => {
      const result = string.alphanumeric();
      expect(result).toHaveLength(8);
      expect(result).toMatch(/^[A-Za-z0-9]+$/);
    });

    it('generates alphanumeric string with custom length', () => {
      const length = 12;
      const result = string.alphanumeric(length);
      expect(result).toHaveLength(length);
    });

    it('generates string with only uppercase letters when specified', () => {
      const result = string.alphanumeric(10, {
        uppercase: true,
        lowercase: false,
        numbers: false,
      });
      expect(result).toHaveLength(10);
      expect(result).toMatch(/^[A-Z]+$/);
    });

    it('generates string with only lowercase letters when specified', () => {
      const result = string.alphanumeric(10, {
        uppercase: false,
        lowercase: true,
        numbers: false,
      });
      expect(result).toHaveLength(10);
      expect(result).toMatch(/^[a-z]+$/);
    });

    it('generates string with only numbers when specified', () => {
      const result = string.alphanumeric(10, {
        uppercase: false,
        lowercase: false,
        numbers: true,
      });
      expect(result).toHaveLength(10);
      expect(result).toMatch(/^[0-9]+$/);
    });

    it('throws error with invalid parameters', () => {
      // Contract enforcement prevents silent failures
      expect(() => string.alphanumeric(-1)).toThrow();
      expect(() => string.alphanumeric(0)).toThrow();
    });
  });

  describe('pattern', () => {
    it('replaces pattern tokens with appropriate random characters', () => {
      const result = string.pattern('###-AA-aa-??-***');
      expect(result).toMatch(
        /^[0-9]{3}-[A-Z]{2}-[a-z]{2}-[A-Za-z]{2}-[A-Za-z0-9]{3}$/,
      );
    });

    it('leaves non-token characters unchanged', () => {
      // Template semantics: non-tokens are literals
      const result = string.pattern('ID: ###');
      expect(result).toMatch(/^ID: [0-9]{3}$/);
    });

    it('works with empty templates', () => {
      // Empty input rejection prevents ambiguity
      expect(() => string.pattern('')).toThrow();
    });

    it('handles a mix of token and non-token characters', () => {
      // Common case: serial numbers, order IDs, etc.
      const template = 'Order-#####-??';
      const result = string.pattern(template);
      expect(result).toMatch(/^Order-[0-9]{5}-[A-Za-z]{2}$/);
    });
  });
});
