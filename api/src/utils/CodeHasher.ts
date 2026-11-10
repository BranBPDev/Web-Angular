import { fromBase64, timingSafeEqual, toBase64 } from './encoding';
import type { Hmac } from './Hmac';

/** Guarda y comprueba códigos de verificación sin almacenarlos en claro. */
export class CodeHasher {
  constructor(private readonly hmac: Hmac) {}

  async hash(userId: string, code: string): Promise<string> {
    return toBase64(await this.hmac.sign(`code:${userId}:${code}`));
  }

  async matches(userId: string, code: string, expectedHash: string): Promise<boolean> {
    const actual = await this.hmac.sign(`code:${userId}:${code}`);
    return timingSafeEqual(actual, fromBase64(expectedHash));
  }
}
