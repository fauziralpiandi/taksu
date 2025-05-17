import { entropy } from './entropy';

function probability(value: number = 0.5): boolean {
  if (isNaN(value)) {
    throw new Error('Probability value must be a valid number');
  }

  if (value < 0 || value > 1) {
    throw new Error('Probability value must be between 0 and 1');
  }

  return entropy.get() < value; // True with P(value), false with P(1-value)
}

function chance(percentage: number): boolean {
  if (isNaN(percentage)) {
    throw new Error('Percentage must be a valid number');
  }

  if (percentage < 0 || percentage > 100) {
    throw new Error('Percentage must be between 0 and 100');
  }

  return entropy.get() * 100 < percentage;
}

export const bool = {
  probability,
  chance,
};
