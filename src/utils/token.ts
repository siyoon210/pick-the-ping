import { randomBytes } from 'crypto';

export function generateRandomToken(size = 32): string {
  return randomBytes(size).toString('hex');
}