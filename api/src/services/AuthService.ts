import { SECURITY } from '../config/security';
import { HttpError } from '../core/errors';
import type { UserDao } from '../daos/UserDao';
import type { VerificationCodeDao } from '../daos/VerificationCodeDao';
import { toPublicUser, type PublicUser, type User } from '../models/User';
import type { CodeHasher } from '../utils/CodeHasher';
import type { JwtService } from '../utils/JwtService';
import { PasswordHasher } from '../utils/PasswordHasher';
import { generateNumericCode } from '../utils/random';
import type { EmailSender } from './EmailSender';
import type { EmailTemplates } from './EmailTemplates';
import type { GoogleIdentityVerifier } from './GoogleIdentityVerifier';

export interface Session {
  token: string;
  user: PublicUser;
}

export class AuthService {
  constructor(
    private readonly users: UserDao,
    private readonly codes: VerificationCodeDao,
    private readonly passwords: PasswordHasher,
    private readonly codeHasher: CodeHasher,
    private readonly jwt: JwtService,
    private readonly mailer: EmailSender,
    private readonly templates: EmailTemplates,
    private readonly google: GoogleIdentityVerifier,
  ) {}

  async register(email: string, password: string): Promise<void> {
    const passwordHash = await this.passwords.hash(password);
    let user = await this.users.findByEmail(email);

    if (user?.verifiedAt) throw HttpError.conflict('EMAIL_TAKEN', 'Este correo ya está registrado.');
    if (user) {
      await this.users.updatePasswordHash(user.id, passwordHash); // registro previo sin verificar
    } else {
      user = await this.users.create(email, passwordHash);
    }
    await this.issueCode(user);
  }

  async resendCode(email: string): Promise<void> {
    const user = await this.users.findByEmail(email);
    if (!user || user.verifiedAt) return; // misma respuesta exista o no: no se revelan cuentas
    await this.issueCode(user);
  }

  async verifyCode(email: string, code: string): Promise<Session> {
    const invalid = HttpError.badRequest('INVALID_CODE', 'El código no es correcto.');
    const user = await this.users.findByEmail(email);
    const record = user ? await this.codes.findByUserId(user.id) : null;
    if (!user || !record) throw invalid;

    if (record.expiresAt.getTime() < Date.now()) {
      throw HttpError.badRequest('CODE_EXPIRED', 'El código ha caducado. Solicita uno nuevo.');
    }
    if (record.attempts >= SECURITY.CODE_MAX_ATTEMPTS) {
      throw HttpError.tooManyRequests('TOO_MANY_ATTEMPTS', 'Demasiados intentos. Solicita un código nuevo.');
    }
    if (!(await this.codeHasher.matches(user.id, code, record.codeHash))) {
      await this.codes.incrementAttempts(user.id);
      throw invalid;
    }

    const verified = (await this.users.markVerified(user.id)) ?? user;
    await this.codes.delete(user.id);
    return this.createSession(verified);
  }

  async login(email: string, password: string): Promise<Session> {
    const user = await this.users.findByEmail(email);
    // Se calcula siempre un hash para que el tiempo no delate si el correo existe.
    const valid = await this.passwords.verify(password, user?.passwordHash ?? PasswordHasher.DUMMY_HASH);
    if (!user || !valid) throw HttpError.unauthorized('INVALID_CREDENTIALS', 'Correo o contraseña incorrectos.');
    if (!user.verifiedAt) throw HttpError.forbidden('EMAIL_NOT_VERIFIED', 'Debes verificar tu correo antes de entrar.');
    return this.createSession(user);
  }

  /** Verificación automática: Google certifica que el usuario controla ese correo. */
  async verifyWithGoogle(email: string, idToken: string): Promise<Session> {
    const googleEmail = await this.google.verifiedEmail(idToken);
    if (googleEmail !== email) {
      throw HttpError.badRequest('EMAIL_MISMATCH', `La cuenta de Google (${googleEmail}) no coincide con el correo del registro.`);
    }
    const user = await this.users.findByEmail(email);
    if (!user) throw HttpError.notFound('USER_NOT_FOUND', 'No hay ningún registro con ese correo.');

    const verified = user.verifiedAt ? user : ((await this.users.markVerified(user.id)) ?? user);
    await this.codes.delete(user.id);
    return this.createSession(verified);
  }

  async currentUser(userId: string): Promise<PublicUser> {
    const user = await this.users.findById(userId);
    if (!user) throw HttpError.unauthorized('UNAUTHORIZED', 'Sesión no válida o caducada.');
    return toPublicUser(user);
  }

  private async issueCode(user: User): Promise<void> {
    const existing = await this.codes.findByUserId(user.id);
    if (existing && Date.now() - existing.createdAt.getTime() < SECURITY.CODE_RESEND_COOLDOWN_SECONDS * 1000) {
      throw HttpError.tooManyRequests('RESEND_COOLDOWN', 'Espera un minuto antes de pedir otro código.');
    }
    const code = generateNumericCode(SECURITY.CODE_LENGTH);
    const expiresAt = new Date(Date.now() + SECURITY.CODE_TTL_MINUTES * 60_000);
    await this.codes.upsert(user.id, await this.codeHasher.hash(user.id, code), expiresAt);
    await this.mailer.send(this.templates.verification(user.email, code, SECURITY.CODE_TTL_MINUTES));
  }

  private async createSession(user: User): Promise<Session> {
    return { token: await this.jwt.sign(user.id), user: toPublicUser(user) };
  }
}
