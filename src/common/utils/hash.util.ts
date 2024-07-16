import * as crypto from 'crypto';

/**
 *
 * @param length size of the salt
 * @returns a salt with the specified length
 */
export function generateSalt(length: number = 16): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 *
 * @param input inputed password
 * @param salt random salt
 * @returns password hash generated with the selected algorithm (default is sha512)
 */
export function hashPassword(
  input: string,
  salt: string,
  algorithm: string = 'sha512',
): string {
  const hash = crypto
    .pbkdf2Sync(input, salt, 1000, 64, algorithm)
    .toString('hex');
  return hash;
}

/**
 *
 * @param input inputed password
 * @param savedHash salted and hashed password
 * @param savedSalt salt used to hash the password
 * @returns
 */
export function verifyPassword(
  input: string,
  savedHash: string,
  savedSalt: string,
): boolean {
  const hash = crypto
    .pbkdf2Sync(input, savedSalt, 1000, 64, 'sha512')
    .toString('hex');
  return savedHash === hash;
}
