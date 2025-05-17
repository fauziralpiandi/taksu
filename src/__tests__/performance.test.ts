import { describe, it, expect } from 'vitest';
import { entropy } from '../entropy';

describe('performance', () => {
  it('entropy.get() is comparable to Math.random() in speed', () => {
    const iterations = 100000;

    // Warm-up
    for (let i = 0; i < 1000; i++) {
      entropy.get();
      Math.random();
    }

    const entropyStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      entropy.get();
    }
    const entropyTime = performance.now() - entropyStart;

    const randomStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      Math.random();
    }
    const randomTime = performance.now() - randomStart;

    // Acceptable performance trade-off,
    // with margin for environmental variations
    const maxSlowerFactor = 2.2;
    expect(entropyTime).toBeLessThan(randomTime * maxSlowerFactor);

    console.log(`entropy.get(): ${entropyTime.toFixed(2)}ms`);
    console.log(`Math.random(): ${randomTime.toFixed(2)}ms`);
    console.log(`Ratio: ${(entropyTime / randomTime).toFixed(2)}x`);
  });
});
