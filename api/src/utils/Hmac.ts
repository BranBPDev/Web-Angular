import { utf8 } from './encoding';

/** Firma HMAC-SHA256 con una clave secreta. */
export class Hmac {
  private key?: Promise<CryptoKey>;

  constructor(private readonly secret: string) {}

  async sign(data: string): Promise<Uint8Array> {
    this.key ??= crypto.subtle.importKey('raw', utf8(this.secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    return new Uint8Array(await crypto.subtle.sign('HMAC', await this.key, utf8(data)));
  }
}
