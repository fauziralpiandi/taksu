export function color(): string {
  // Generate uniform distribution across 16M+ possible RGB colors
  const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0');
  return `#${hex}`;
}
