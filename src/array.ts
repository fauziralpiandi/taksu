import { entropy } from './entropy';

function pick<T>(array: readonly T[]): T {
  if (!Array.isArray(array)) {
    throw new Error('Argument must be an array');
  }

  if (array.length === 0) {
    throw new Error('Cannot pick from an empty array');
  }

  // Bit-shift optimization for integer arrays faster
  // when array length is a power of 2 (common case)
  const len = array.length;
  const isPowerOf2 = (len & (len - 1)) === 0;

  // Fast path for power-of-2 length arrays
  const index = isPowerOf2
    ? (entropy.get() * len) >>> 0
    : Math.floor(entropy.get() * len);

  return array[index] as T;
}

function shuffle<T>(array: readonly T[], options?: { inPlace?: boolean }): T[] {
  if (!Array.isArray(array)) {
    throw new Error('Argument must be an array');
  }

  const len = array.length;
  if (len <= 1) return len ? [array[0] as T] : [];

  const isInPlace = options?.inPlace && !Object.isFrozen(array);

  let result: T[];
  if (isInPlace) {
    result = array as unknown as T[]; // Cast only when we're sure it's safe
  } else {
    // Use type assertion at array level for safety
    const safeArray = array as readonly T[];
    result = new Array<T>(len);
    for (let i = 0; i < len; i++) {
      result[i] = safeArray[i];
    }
  }

  // Fisher-Yates with optimized swapping
  for (let i = len - 1; i > 0; i--) {
    const j = Math.floor(entropy.get() * (i + 1));

    // Destructuring swap is optimized in modern JS engines
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export const array = {
  pick,
  shuffle,
};
