import { fromBase64Url, timingSafeEqual, toBase64Url, utf8 } from './encoding';
import type { Hmac } from './Hmac';

export interface JwtPayload { sub: string; iat: number; exp: number }

/** JWT HS256 mínimo para las sesiones. */
export class JwtService {
  constructor(private readonly hmac: Hmac, private readonly ttlSeconds: number) {}

  async sign(subject: string): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    const header = toBase64Url(utf8(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
    const payload = toBase64Url(utf8(JSON.stringify({ sub: subject, iat: now, exp: now + this.ttlSeconds })));
    const signature = toBase64Url(await this.hmac.sign(`${header}.${payload}`));
    return `${header}.${payload}.${signature}`;
  }

  async verify(token: string): Promise<JwtPayload | null> {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts as [string, string, string];
    try {
      const expected = await this.hmac.sign(`${header}.${payload}`);
      if (!timingSafeEqual(expected, fromBase64Url(signature))) return null;
      const data = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as JwtPayload;
      return data.exp > Math.floor(Date.now() / 1000) ? data : null;
    } catch {
      return null;
    }
  }
}
