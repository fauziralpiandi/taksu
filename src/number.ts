import { entropy } from './entropy';

function integer(min: number = 0, max: number = 100): number {
  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }

  if (isNaN(min) || isNaN(max)) {
    throw new Error('Min and max must be valid numbers');
  }

  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error('Min and max must be integers');
  }

  // Special case for common single-value scenarios
  if (min === max) return min;

  const range = max - min + 1;

  // Bitwise OR for integer conversion,
  // when possible (small numbers)
  if (range < 0x20000000) {
    return min + ((entropy.get() * range) | 0);
  }

  // Fall back for larger ranges,
  // to avoid precision issues
  return Math.floor(min + entropy.get() * range); // Range: [min, max]
}

function float(min: number = 0, max: number = 1): number {
  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }

  if (isNaN(min) || isNaN(max)) {
    throw new Error('Min and max must be valid numbers');
  }

  // Special case for common single-value scenarios
  if (min === max) return min;

  const range = max - min;

  return min + entropy.get() * range; // Range: [min, max)
}

export const number = {
  integer,
  float,
};
