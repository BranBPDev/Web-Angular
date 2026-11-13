import { HttpError } from '../core/errors';

interface TokenInfo {
  aud?: string;
  iss?: string;
  email?: string;
  email_verified?: string | boolean;
}

/** Valida un ID token de Google y devuelve el correo verificado por Google. */
export class GoogleIdentityVerifier {
  constructor(private readonly clientId: string) {}

  get enabled(): boolean {
    return this.clientId.length > 0;
  }

  async verifiedEmail(idToken: string): Promise<string> {
    if (!this.enabled) throw new HttpError(503, 'GOOGLE_DISABLED', 'La verificación con Google no está disponible.');

    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
    if (!response.ok) throw HttpError.unauthorized('INVALID_GOOGLE_TOKEN', 'No se pudo validar la cuenta de Google.');

    const info = (await response.json()) as TokenInfo;
    const trustedIssuer = info.iss === 'accounts.google.com' || info.iss === 'https://accounts.google.com';
    const emailVerified = info.email_verified === true || info.email_verified === 'true';
    if (info.aud !== this.clientId || !trustedIssuer || !emailVerified || !info.email) {
      throw HttpError.unauthorized('INVALID_GOOGLE_TOKEN', 'No se pudo validar la cuenta de Google.');
    }
    return info.email.toLowerCase();
  }
}
