import { randomBytes } from 'crypto';

export function generateRandomToken(size = 16): string {
  return randomBytes(size).toString('hex');
}