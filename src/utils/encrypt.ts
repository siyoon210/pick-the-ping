export function base64Encrypt(input: string): string {
  return Buffer.from(input).toString('base64');
}

export function base64Decrypt(input: string): string {
  return Buffer.from(input, 'base64').toString('utf-8');
}