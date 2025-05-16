import { random } from './seed';

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

  return Math.floor(min + random.next() * (max - min + 1)); // Range: [min, max]
}

function float(min: number = 0, max: number = 1): number {
  if (isNaN(min) || isNaN(max)) {
    throw new Error('Min and max must be valid numbers');
  }

  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }

  return min + random.next() * (max - min); // Range: [min, max)
}

export const number = {
  integer,
  float,
};
