import { describe, it, expect } from 'vitest';
import { entropy } from '../entropy';

describe('entropy', () => {
  it('produces values in [0,1) range', () => {
    for (let i = 0; i < 1000; i++) {
      const value = entropy.get();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it('has uniform distribution', () => {
    // Chi-square test with 10 buckets
    const buckets = Array(10).fill(0);
    const iterations = 10000;
    const expectedPerBucket = iterations / buckets.length;

    for (let i = 0; i < iterations; i++) {
      const value = entropy.get();
      const bucketIndex = Math.floor(value * buckets.length);
      buckets[bucketIndex]++;
    }

    let chiSquare = 0;
    for (const count of buckets) {
      const deviation = count - expectedPerBucket;
      chiSquare += (deviation * deviation) / expectedPerBucket;
    }

    // Critical value for 99.9% confidence
    expect(chiSquare).toBeLessThan(27.88);
  });

  it('generates values with adequate bit-level entropy', () => {
    const iterations = 10000;
    const bitPatterns = Array(8).fill(0);

    for (let i = 0; i < iterations; i++) {
      const value = entropy.get();
      const bits = Math.floor(value * 256) & 0xff;

      for (let bit = 0; bit < 8; bit++) {
        if ((bits & (1 << bit)) !== 0) {
          bitPatterns[bit]++;
        }
      }
    }

    const tolerance = 0.1;

    for (let bit = 0; bit < 8; bit++) {
      const ratio = bitPatterns[bit] / iterations;
      expect(ratio).toBeGreaterThan(0.5 - tolerance);
      expect(ratio).toBeLessThan(0.5 + tolerance);
    }
  });

  it('shows no obvious correlation between sequential values', () => {
    const pairs = 5000;
    let sumProduct = 0,
      sumX = 0,
      sumY = 0,
      sumXsquared = 0,
      sumYsquared = 0;

    for (let i = 0; i < pairs; i++) {
      const x = entropy.get();
      const y = entropy.get();

      sumProduct += x * y;
      sumX += x;
      sumY += y;
      sumXsquared += x * x;
      sumYsquared += y * y;
    }

    // Pearson correlation coefficient
    const numerator = pairs * sumProduct - sumX * sumY;
    const denominator = Math.sqrt(
      (pairs * sumXsquared - sumX * sumX) * (pairs * sumYsquared - sumY * sumY),
    );
    const correlation = denominator === 0 ? 0 : numerator / denominator;
    expect(Math.abs(correlation)).toBeLessThan(0.05);
  });
});
