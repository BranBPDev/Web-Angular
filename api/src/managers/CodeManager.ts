import { SECURITY } from '../config/security';
import { HttpError } from '../core/errors';
import type { VerificationCodeDao } from '../daos/VerificationCodeDao';
import type { User } from '../models/User';
import type { CodePurpose } from '../models/VerificationCode';
import type { CodeHasher } from '../utils/CodeHasher';
import { generateNumericCode } from '../utils/random';

/**
 * Ciclo de vida de los códigos de verificación (alta de cuenta, cambio de contraseña…).
 * Lo comparten todas las operaciones que se confirman por correo.
 */
export class CodeManager {
  constructor(private readonly codes: VerificationCodeDao, private readonly hasher: CodeHasher) {}

  /** Genera y guarda un código nuevo. Devuelve el código en claro para enviarlo por correo. */
  async issue(user: User, purpose: CodePurpose, payload: string | null = null): Promise<string> {
    const existing = await this.codes.find(user.id, purpose);
    if (existing && Date.now() - existing.createdAt.getTime() < SECURITY.CODE_RESEND_COOLDOWN_SECONDS * 1000) {
      throw HttpError.tooManyRequests('RESEND_COOLDOWN', 'Espera un minuto antes de pedir otro código.');
    }
    const code = generateNumericCode(SECURITY.CODE_LENGTH);
    const expiresAt = new Date(Date.now() + SECURITY.CODE_TTL_MINUTES * 60_000);
    await this.codes.upsert(user.id, purpose, await this.hasher.hash(user.id, purpose, code), payload, expiresAt);
    return code;
  }

  /** Dato asociado a la operación pendiente, si existe. */
  async pendingPayload(user: User, purpose: CodePurpose): Promise<string | null> {
    return (await this.codes.find(user.id, purpose))?.payload ?? null;
  }

  /** Comprueba el código. Si es correcto lo consume y devuelve el dato asociado a la operación. */
  async consume(user: User, purpose: CodePurpose, code: string): Promise<string | null> {
    const record = await this.codes.find(user.id, purpose);
    if (!record) throw HttpError.badRequest('INVALID_CODE', 'El código no es correcto.');

    if (record.expiresAt.getTime() < Date.now()) {
      throw HttpError.badRequest('CODE_EXPIRED', 'El código ha caducado. Solicita uno nuevo.');
    }
    if (record.attempts >= SECURITY.CODE_MAX_ATTEMPTS) {
      throw HttpError.tooManyRequests('TOO_MANY_ATTEMPTS', 'Demasiados intentos. Solicita un código nuevo.');
    }
    if (!(await this.hasher.matches(user.id, purpose, code, record.codeHash))) {
      await this.codes.incrementAttempts(user.id, purpose);
      throw HttpError.badRequest('INVALID_CODE', 'El código no es correcto.');
    }

    await this.codes.delete(user.id, purpose);
    return record.payload;
  }

  discard(user: User, purpose: CodePurpose): Promise<void> {
    return this.codes.delete(user.id, purpose);
  }
}
