export function id(length: number = 12): string {
  if (isNaN(length) || !Number.isInteger(length)) {
    throw new Error('Length must be a valid integer');
  }

  if (length <= 0) {
    throw new Error('Length must be greater than 0');
  }

  // 62 alphanumeric chars (A-Z, a-z, 0-9) for non-cryptographic identifiers
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt((Math.random() * charLength) | 0);
  }

  return result;
}
