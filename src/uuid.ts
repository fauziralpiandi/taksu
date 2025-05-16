import { random } from './seed';

function v4(): string {
  const hexDigits = '0123456789abcdef';
  const s = [];

  for (let i = 0; i < 8; i++) {
    s.push(hexDigits[(random.next() * 16) | 0]);
  }
  s.push('-');

  for (let i = 0; i < 4; i++) {
    s.push(hexDigits[(random.next() * 16) | 0]);
  }
  s.push('-');

  s.push('4'); // Version 4 (random) - most common UUID variant
  for (let i = 0; i < 3; i++) {
    s.push(hexDigits[(random.next() * 16) | 0]);
  }
  s.push('-');

  s.push(hexDigits[8 + ((random.next() * 4) | 0)]); // Variant bits: 10xx (RFC 4122)
  for (let i = 0; i < 3; i++) {
    s.push(hexDigits[(random.next() * 16) | 0]);
  }
  s.push('-');

  for (let i = 0; i < 12; i++) {
    s.push(hexDigits[(random.next() * 16) | 0]);
  }

  return s.join('');
}

function simple(): string {
  const hexDigits = '0123456789abcdef';
  const s = [];

  for (let i = 0; i < 32; i++) {
    s.push(hexDigits[(random.next() * 16) | 0]);
  }

  return s.join('');
}

export const uuid = {
  v4,
  simple,
};
