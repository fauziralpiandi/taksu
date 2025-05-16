// xorshift128+ PRNG: O(1) time,
// 128-bit state, period 2^128-1
let state0 = Date.now();
let state1 = Date.now() * 2 - 1;
let useSeeded = false;

function seed(value: number): void {
  state0 = value | 0;
  state1 = (value + 1) | 0;

  // Prime the sequence to avoid initial pattern bias
  for (let i = 0; i < 10; i++) next();

  useSeeded = true;
}

function reset(): void {
  useSeeded = false;
}

function next(): number {
  if (!useSeeded) return Math.random();

  // Xorshift operations:
  // Create avalanche effect on bit patterns
  let s1 = state0;
  let s0 = state1;
  state0 = s0;
  s1 ^= s1 << 23;
  s1 ^= s1 >> 17;
  s1 ^= s0;
  s1 ^= s0 >> 26;
  state1 = s1;

  return ((state0 + state1) >>> 0) / 0x100000000; // Modulo 2^32 via unsigned right shift
}

export const random = {
  seed,
  next,
  reset,
};
