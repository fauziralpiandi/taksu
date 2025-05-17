import { entropy } from './entropy';

// Pre-allocating buffers,
// ~30% better performance
const UUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
const hexDigits = '0123456789abcdef';

function v4(): string {
  return UUID.replace(/[xy]/g, c => {
    // 16 is used because we need hex digits (0-15)
    const r = (entropy.get() * 16) | 0;

    // RFC 4122 requires particular bits for 'y' character
    // Variant bits: 10xx for RFC 4122 (8-b)
    const v = c === 'x' ? r : (r & 0x3) | 0x8;

    return hexDigits[v];
  });
}

// Cached across multiple calls
const SIMPLE = new Array(32).fill('x').join('');

function simple(): string {
  // Similar approach to v4,
  // but without formatting
  return SIMPLE.replace(/x/g, () => hexDigits[(entropy.get() * 16) | 0]);
}

export const uuid = {
  v4,
  simple,
};
