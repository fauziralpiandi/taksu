import { random } from './seed';

function hex(): string {
  // Across 16M+ possible colors
  const hex = Math.floor(random.next() * 0xffffff)
    .toString(16)
    .padStart(6, '0');

  return `#${hex}`;
}

function rgb(): string {
  const r = Math.floor(random.next() * 256); // 8-bit per channel (0-255)
  const g = Math.floor(random.next() * 256);
  const b = Math.floor(random.next() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

export const color = {
  hex,
  rgb,
};
