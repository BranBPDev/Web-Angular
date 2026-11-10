import { HttpError } from '../core/errors';

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
    if (password.length < 8 || password.length > 128 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      throw HttpError.badRequest('WEAK_PASSWORD', 'La contraseña debe tener entre 8 y 128 caracteres, con letras y números.');
    }
    return password;
  }

  static code(value: unknown): string {
    const code = typeof value === 'string' ? value.trim() : '';
    if (!/^\d{6}$/.test(code)) throw HttpError.badRequest('INVALID_CODE', 'El código debe tener 6 dígitos.');
    return code;
  }

  static requiredText(value: unknown, field: string, maxLength = 4096): string {
    if (typeof value !== 'string' || value.length === 0 || value.length > maxLength) {
      throw HttpError.badRequest('INVALID_FIELD', `El campo ${field} no es válido.`);
    }
    return value;
  }
}
