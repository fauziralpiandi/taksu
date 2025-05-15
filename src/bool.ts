export function bool(probability: number = 0.5): boolean {
  if (isNaN(probability)) {
    throw new Error('Probability must be a valid number');
  }

  if (probability < 0 || probability > 1) {
    throw new Error('Probability must be between 0 and 1');
  }

  return Math.random() < probability; // True with P(probability), false with P(1-probability)
}
