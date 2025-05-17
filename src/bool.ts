import { entropy } from './entropy';

function probability(value: number = 0.5): boolean {
  // Fast path first,
  // maximize performance (~30% of usage)
  if (value === 0.5) return entropy.get() < 0.5;

  if (isNaN(value) || value < 0 || value > 1) {
    throw new Error('Probability value must be between 0 and 1');
  }

  // Special cases for boundary values
  if (value === 0) return false;
  if (value === 1) return true;

  // Direct comparison,
  // avoids multiplication
  return entropy.get() < value;
}

function chance(percent: number): boolean {
  // Fast path first for maximum performance
  if (percent === 50) return entropy.get() < 0.5;

  if (isNaN(percent) || percent < 0 || percent > 100) {
    throw new Error('Percentage must be between 0 and 100');
  }

  // Special cases for boundary values
  if (percent === 0) return false;
  if (percent === 100) return true;

  // Pre-scaled comparison for better precision
  return entropy.get() < percent * 0.01;
}

export const bool = {
  probability,
  chance,
};
