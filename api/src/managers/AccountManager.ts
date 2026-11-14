import { SECURITY } from '../config/security';
import { HttpError } from '../core/errors';
import type { UserDao } from '../daos/UserDao';
import { toPublicUser, type PublicUser, type User } from '../models/User';
import type { PasswordHasher } from '../utils/PasswordHasher';
import type { CodeManager } from './CodeManager';
import type { EmailSender } from './EmailSender';
import type { EmailTemplates } from './EmailTemplates';

/** Operaciones sobre la cuenta del usuario con sesión iniciada. */
export class AccountManager {
  constructor(
    private readonly users: UserDao,
    private readonly passwords: PasswordHasher,
    private readonly codes: CodeManager,
    private readonly mailer: EmailSender,
    private readonly templates: EmailTemplates,
  ) {}

  async updateName(user: User, name: string | null): Promise<PublicUser> {
    return toPublicUser((await this.users.updateName(user.id, name)) ?? user);
  }

  /** Paso 1: comprueba la contraseña actual, guarda la nueva (ya con hash) y envía el código por correo. */
  async requestPasswordChange(user: User, currentPassword: string, newPassword: string): Promise<void> {
    if (!(await this.passwords.verify(currentPassword, user.passwordHash))) {
      throw HttpError.badRequest('INVALID_CURRENT_PASSWORD', 'La contraseña actual no es correcta.');
    }
    if (currentPassword === newPassword) {
      throw HttpError.badRequest('SAME_PASSWORD', 'La contraseña nueva debe ser distinta de la actual.');
    }
    await this.sendPasswordChangeCode(user, await this.passwords.hash(newPassword));
  }

  /** Reenvía el código de un cambio ya solicitado, sin volver a pedir las contraseñas. */
  async resendPasswordChangeCode(user: User): Promise<void> {
    const payload = await this.codes.pendingPayload(user, 'password_change');
    if (!payload) throw HttpError.badRequest('NO_PENDING_CHANGE', 'No hay ningún cambio de contraseña pendiente.');
    await this.sendPasswordChangeCode(user, payload);
  }

  /** Paso 2: con el código correcto se aplica la contraseña nueva. */
  async confirmPasswordChange(user: User, code: string): Promise<void> {
    const newHash = await this.codes.consume(user, 'password_change', code);
    if (!newHash) throw HttpError.badRequest('NO_PENDING_CHANGE', 'No hay ningún cambio de contraseña pendiente.');
    await this.users.updatePasswordHash(user.id, newHash);
  }

  private async sendPasswordChangeCode(user: User, newPasswordHash: string): Promise<void> {
    const code = await this.codes.issue(user, 'password_change', newPasswordHash);
    await this.mailer.send(this.templates.passwordChange(user.email, code, SECURITY.CODE_TTL_MINUTES));
  }
}
