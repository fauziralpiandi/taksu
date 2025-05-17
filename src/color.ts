import { entropy } from './entropy';

const HEX_CHARS = '0123456789abcdef';

function hex(): string {
  // Each pair of hex characters
  // represents 8 bits (0-255)
  const r = (entropy.get() * 256) | 0;
  const g = (entropy.get() * 256) | 0;
  const b = (entropy.get() * 256) | 0;

  // Across 16M+ possible colors
  return (
    '#' +
    HEX_CHARS[(r >> 4) & 0xf] +
    HEX_CHARS[r & 0xf] +
    HEX_CHARS[(g >> 4) & 0xf] +
    HEX_CHARS[g & 0xf] +
    HEX_CHARS[(b >> 4) & 0xf] +
    HEX_CHARS[b & 0xf]
  );
}

function rgb(): string {
  // Bitwise OR is faster than Math.floor
  const r = (entropy.get() * 256) | 0;
  const g = (entropy.get() * 256) | 0;
  const b = (entropy.get() * 256) | 0;
  // 8-bit per channel (0-255)

  // String concatenation is slightly more efficient
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

export const color = {
  hex,
  rgb,
};
