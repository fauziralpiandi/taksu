import { entropy } from './entropy';

function v4(): string {
  const hexDigits = '0123456789abcdef';
  const s = [];

  for (let i = 0; i < 8; i++) {
    s.push(hexDigits[(entropy.get() * 16) | 0]);
  }
  s.push('-');

  for (let i = 0; i < 4; i++) {
    s.push(hexDigits[(entropy.get() * 16) | 0]);
  }
  s.push('-');

  // Most common UUID variant
  s.push('4'); // Version 4 (random)
  for (let i = 0; i < 3; i++) {
    s.push(hexDigits[(entropy.get() * 16) | 0]);
  }
  s.push('-');

  // Variant bits: 10xx (RFC 4122):
  // guarantees cross-platform compatibility
  s.push(hexDigits[8 + ((entropy.get() * 4) | 0)]);
  for (let i = 0; i < 3; i++) {
    s.push(hexDigits[(entropy.get() * 16) | 0]);
  }
  s.push('-');

  for (let i = 0; i < 12; i++) {
    s.push(hexDigits[(entropy.get() * 16) | 0]);
  }

  return s.join('');
}

function simple(): string {
  const hexDigits = '0123456789abcdef';
  const s = [];

  for (let i = 0; i < 32; i++) {
    s.push(hexDigits[(entropy.get() * 16) | 0]);
  }

  return s.join('');
}

export const uuid = {
  v4,
  simple,
};
