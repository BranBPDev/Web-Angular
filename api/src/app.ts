import type { Env } from './config/env';
import { AuthController } from './controllers/AuthController';
import { SystemController } from './controllers/SystemController';
import { BearerAuth } from './core/BearerAuth';
import { Cors } from './core/Cors';
import { HttpError } from './core/errors';
import { jsonResponse, withHeaders } from './core/http';
import { Router } from './core/Router';
import { UserDao } from './daos/UserDao';
import { VerificationCodeDao } from './daos/VerificationCodeDao';
import { Database } from './db/Database';
import { AuthService } from './services/AuthService';
import { ResendEmailSender } from './services/EmailSender';
import { GoogleIdentityVerifier } from './services/GoogleIdentityVerifier';
import { CodeHasher } from './utils/CodeHasher';
import { Hmac } from './utils/Hmac';
import { JwtService } from './utils/JwtService';
import { PasswordHasher } from './utils/PasswordHasher';

const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

/** Raíz de composición: crea las dependencias y registra las rutas. */
export class App {
  private readonly router = new Router();
  private readonly cors: Cors;

  constructor(env: Env) {
    const db = new Database(env.NEON_DATABASE_URL);
    const hmac = new Hmac(env.JWT_SECRET);
    const jwt = new JwtService(hmac, SESSION_TTL_SECONDS);

    const authService = new AuthService(
      new UserDao(db),
      new VerificationCodeDao(db),
      new PasswordHasher(),
      new CodeHasher(hmac),
      jwt,
      new ResendEmailSender(env.RESEND_API_KEY, env.EMAIL_FROM),
      new GoogleIdentityVerifier(env.GOOGLE_CLIENT_ID ?? ''),
    );
    const auth = new AuthController(authService, new BearerAuth(jwt));
    const system = new SystemController(env.GOOGLE_CLIENT_ID ?? '');

    this.cors = new Cors(env.ALLOWED_ORIGINS);
    this.router
      .get('/api/health', system.health)
      .get('/api/config', system.config)
      .post('/api/auth/register', auth.register)
      .post('/api/auth/resend', auth.resend)
      .post('/api/auth/verify', auth.verify)
      .post('/api/auth/login', auth.login)
      .post('/api/auth/google', auth.google)
      .get('/api/auth/me', auth.me);
  }

  async handle(request: Request): Promise<Response> {
    const corsHeaders = this.cors.headersFor(request);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });

    try {
      return withHeaders(await this.router.dispatch(request), corsHeaders);
    } catch (error) {
      if (error instanceof HttpError) {
        return withHeaders(jsonResponse({ code: error.code, message: error.message }, error.status), corsHeaders);
      }
      console.error('Error no controlado', error);
      return withHeaders(jsonResponse({ code: 'INTERNAL_ERROR', message: 'Error interno del servidor.' }, 500), corsHeaders);
    }
  }
}
