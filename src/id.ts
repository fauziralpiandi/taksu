import { entropy } from './entropy';

function alphanumeric(length: number = 12): string {
  if (isNaN(length) || !Number.isInteger(length)) {
    throw new Error('Length must be a valid integer');
  }

  if (length <= 0) {
    throw new Error('Length must be greater than 0');
  }

  // 62 chars (A-Z, a-z, 0-9)
  // ~36 bits of entropy per 6 chars
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt((entropy.get() * charLength) | 0);
  }

  return result;
}

function numeric(length: number = 12): string {
  if (isNaN(length) || !Number.isInteger(length)) {
    throw new Error('Length must be a valid integer');
  }

  if (length <= 0) {
    throw new Error('Length must be greater than 0');
  }

  const characters = '0123456789'; // Useful for PIN/OTP generation
  const charLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt((entropy.get() * charLength) | 0);
  }

  return result;
}

export const id = {
  alphanumeric,
  numeric,
};
