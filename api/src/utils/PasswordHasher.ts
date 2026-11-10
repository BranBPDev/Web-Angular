import { fromBase64, timingSafeEqual, toBase64, utf8 } from './encoding';

/**
 * Hash de contraseñas con PBKDF2-SHA256 y sal aleatoria.
 * Formato guardado: pbkdf2-sha256$iteraciones$sal$hash
 * Es un hash de una sola dirección: la contraseña no se puede descifrar, solo comprobar.
 */
export class PasswordHasher {
  private static readonly SCHEME = 'pbkdf2-sha256';
  private static readonly ITERATIONS = 100_000; // máximo que permite WebCrypto en Workers
  private static readonly SALT_BYTES = 16;
  private static readonly KEY_BYTES = 32;

  /** Hash válido pero inservible: se usa para igualar tiempos cuando el usuario no existe. */
  static readonly DUMMY_HASH = [
    PasswordHasher.SCHEME,
    PasswordHasher.ITERATIONS,
    toBase64(new Uint8Array(PasswordHasher.SALT_BYTES)),
    toBase64(new Uint8Array(PasswordHasher.KEY_BYTES)),
  ].join('$');

  async hash(password: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(PasswordHasher.SALT_BYTES));
    const derived = await this.derive(password, salt, PasswordHasher.ITERATIONS);
    return [PasswordHasher.SCHEME, PasswordHasher.ITERATIONS, toBase64(salt), toBase64(derived)].join('$');
  }

  async verify(password: string, stored: string): Promise<boolean> {
    const [scheme, iterations, salt, hash] = stored.split('$');
    if (scheme !== PasswordHasher.SCHEME || !iterations || !salt || !hash) return false;
    const derived = await this.derive(password, fromBase64(salt), Number(iterations));
    return timingSafeEqual(derived, fromBase64(hash));
  }

  private async derive(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
    const key = await crypto.subtle.importKey('raw', utf8(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
      key,
      PasswordHasher.KEY_BYTES * 8,
    );
    return new Uint8Array(bits);
  }
}
