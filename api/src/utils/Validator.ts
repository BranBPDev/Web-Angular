import { SECURITY } from '../config/security';
import { HttpError } from '../core/errors';

const CODE_PATTERN = new RegExp(`^\\d{${SECURITY.CODE_LENGTH}}$`);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validación y normalización de los datos de entrada. */
export class Validator {
  static email(value: unknown): string {
    const email = typeof value === 'string' ? value.trim().toLowerCase() : '';
    if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
      throw HttpError.badRequest('INVALID_EMAIL', 'El correo electrónico no es válido.');
    }
    return email;
  }

  static newPassword(value: unknown): string {
    const password = typeof value === 'string' ? value : '';
    if (password.length < SECURITY.PASSWORD_MIN_LENGTH || password.length > SECURITY.PASSWORD_MAX_LENGTH || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      throw HttpError.badRequest('WEAK_PASSWORD', `La contraseña debe tener entre ${SECURITY.PASSWORD_MIN_LENGTH} y ${SECURITY.PASSWORD_MAX_LENGTH} caracteres, con letras y números.`);
    }
    return password;
  }

  /** Nombre opcional: se limpian los espacios y un texto vacío significa "sin nombre". */
  static name(value: unknown): string | null {
    const name = typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
    if (name.length > SECURITY.NAME_MAX_LENGTH) {
      throw HttpError.badRequest('INVALID_NAME', `El nombre no puede superar ${SECURITY.NAME_MAX_LENGTH} caracteres.`);
    }
    return name.length > 0 ? name : null;
  }

  static code(value: unknown): string {
    const code = typeof value === 'string' ? value.trim() : '';
    if (!CODE_PATTERN.test(code)) {
      throw HttpError.badRequest('INVALID_CODE', `El código debe tener ${SECURITY.CODE_LENGTH} dígitos.`);
    }
    return code;
  }

  static requiredText(value: unknown, field: string, maxLength = 4096): string {
    if (typeof value !== 'string' || value.length === 0 || value.length > maxLength) {
      throw HttpError.badRequest('INVALID_FIELD', `El campo ${field} no es válido.`);
    }
    return value;
  }
}
