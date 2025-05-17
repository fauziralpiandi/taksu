import { entropy } from './entropy';

function integer(min: number = 0, max: number = 100): number {
  if (isNaN(min) || isNaN(max)) {
    throw new Error('Min and max must be valid numbers');
  }

  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }

  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error('Min and max must be integers');
  }

  // +1 ensures inclusive upper bound,
  // avoiding common off-by-one errors
  return Math.floor(min + entropy.get() * (max - min + 1)); // Range: [min, max]
}

function float(min: number = 0, max: number = 1): number {
  if (isNaN(min) || isNaN(max)) {
    throw new Error('Min and max must be valid numbers');
  }

  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }

  return min + entropy.get() * (max - min); // Range: [min, max)
}

export const number = {
  integer,
  float,
};
