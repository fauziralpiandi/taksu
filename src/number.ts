interface NumberOptions {
  min?: number;
  max?: number;
  float?: boolean;
}

export function number(options: NumberOptions = {}): number {
  const min = options.min !== undefined ? options.min : 0;
  const max = options.max !== undefined ? options.max : 1;

  if (isNaN(min) || isNaN(max)) {
    throw new Error('Min and max must be valid numbers');
  }

  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }

  if (options.float) {
    return min + Math.random() * (max - min); // Range: [min, max)
  }

  return Math.floor(min + Math.random() * (max - min + 1)); // Range: [min, max]
}
