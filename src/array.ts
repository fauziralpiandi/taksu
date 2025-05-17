import { entropy } from './entropy';

type ShuffleOptions = {
  inPlace?: boolean;
};

function pick<T>(array: readonly T[]): T {
  if (!Array.isArray(array)) {
    throw new Error('Argument must be an array');
  }

  if (array.length === 0) {
    throw new Error('Cannot pick from an empty array');
  }

  const index = Math.floor(entropy.get() * array.length);
  return array[index] as T;
}

function shuffle<T>(array: readonly T[], options?: ShuffleOptions): T[] {
  if (!Array.isArray(array)) {
    throw new Error('Argument must be an array');
  }

  const len = array.length;
  if (len <= 1) return len ? [array[0] as T] : [];

  const shouldModifyInPlace = options?.inPlace && !Object.isFrozen(array);

  let result: T[];

  if (shouldModifyInPlace) {
    result = array as unknown as T[]; // Cast only when we're sure it's safe
  } else {
    result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(array[i]);
    }
  }

  // Fisher-Yates - O(n) and avoids modulo bias
  for (let i = len - 1; i > 0; i--) {
    // Biased implementations use % here,
    // causing skewed distributions
    const j = Math.floor(entropy.get() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }

  return result;
}

export const array = {
  pick,
  shuffle,
};
