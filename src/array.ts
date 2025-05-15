type SamplingOptions = {
  allowDuplicates?: boolean;
};

export function pick<T>(array: readonly T[]): T {
  if (!Array.isArray(array)) {
    throw new Error('Argument must be an array');
  }

  if (array.length === 0) {
    throw new Error('Cannot pick from an empty array');
  }

  const index = Math.floor(Math.random() * array.length);
  return array[index] as T;
}

export function shuffle<T>(array: readonly T[]): T[] {
  if (!Array.isArray(array)) {
    throw new Error('Argument must be an array');
  }

  const len = array.length;
  if (len === 0) return [];

  const result: T[] = [];
  for (let i = 0; i < len; i++) {
    result.push(array[i]);
  }

  let i = len;
  let j = 0;
  let temp: T;

  // Fisher-Yates algorithm for uniform distribution
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = result[j];
    result[j] = result[i];
    result[i] = temp;
  }

  return result;
}

export function sample<T>(
  array: readonly T[],
  count: number,
  options: SamplingOptions = {},
): T[] {
  if (!Array.isArray(array)) {
    throw new Error('First argument must be an array');
  }

  if (array.length === 0) {
    return [];
  }

  if (isNaN(count) || !Number.isInteger(count)) {
    throw new Error('Count must be a valid integer');
  }

  if (count < 0) {
    throw new Error('Count cannot be negative');
  }

  if (count === 0) {
    return [];
  }

  if (!options.allowDuplicates && count > array.length) {
    throw new Error(
      'Cannot sample more items than available in the array without duplicates',
    );
  }

  if (options.allowDuplicates) {
    const result: T[] = [];
    for (let i = 0; i < count; i++) {
      result.push(pick(array));
    }
    return result;
  } else {
    const shuffled = shuffle(array);
    return shuffled.slice(0, count) as T[];
  }
}
