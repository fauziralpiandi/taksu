export function uuid(): string {
  const hexDigits = '0123456789abcdef';
  const s = [];

  for (let i = 0; i < 8; i++) {
    s.push(hexDigits[(Math.random() * 16) | 0]);
  }
  s.push('-');

  for (let i = 0; i < 4; i++) {
    s.push(hexDigits[(Math.random() * 16) | 0]);
  }
  s.push('-');

  s.push('4'); // RFC 4122 version 4 UUID
  for (let i = 0; i < 3; i++) {
    s.push(hexDigits[(Math.random() * 16) | 0]);
  }
  s.push('-');

  s.push(hexDigits[8 + ((Math.random() * 4) | 0)]); // RFC 4122 variant (8, 9, A, or B)
  for (let i = 0; i < 3; i++) {
    s.push(hexDigits[(Math.random() * 16) | 0]);
  }
  s.push('-');

  for (let i = 0; i < 12; i++) {
    s.push(hexDigits[(Math.random() * 16) | 0]);
  }

  return s.join('');
}
