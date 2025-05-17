import { entropy } from './entropy';

function hex(): string {
  // Across 16M+ possible colors
  const hex = Math.floor(entropy.get() * 0xffffff)
    .toString(16)
    .padStart(6, '0');

  return `#${hex}`;
}

function rgb(): string {
  const r = Math.floor(entropy.get() * 256); // 8-bit per channel (0-255)
  const g = Math.floor(entropy.get() * 256);
  const b = Math.floor(entropy.get() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

export const color = {
  hex,
  rgb,
};
