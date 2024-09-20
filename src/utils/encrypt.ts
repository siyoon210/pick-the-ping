export function xorEncryptDecrypt(input: string): string {
  const key = "secret";
  return input.split('').map((char, i) => {
    return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length));
  }).join('');
}

export function base64Encrypt(input: string): string {
  return Buffer.from(input).toString('base64');
}

export function base64Decrypt(input: string): string {
  return Buffer.from(input, 'base64').toString('utf-8');
}