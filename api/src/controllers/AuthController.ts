import type { BearerAuth } from '../core/BearerAuth';
import { jsonResponse, readJson } from '../core/http';
import type { AuthService } from '../services/AuthService';
import { Validator } from '../utils/Validator';

export class AuthController {
  constructor(private readonly auth: AuthService, private readonly bearer: BearerAuth) {}

  register = async (request: Request): Promise<Response> => {
    const body = await readJson(request);
    await this.auth.register(Validator.email(body['email']), Validator.newPassword(body['password']));
    return jsonResponse({ ok: true }, 201);
  };

  resend = async (request: Request): Promise<Response> => {
    const body = await readJson(request);
    await this.auth.resendCode(Validator.email(body['email']));
    return jsonResponse({ ok: true });
  };

  verify = async (request: Request): Promise<Response> => {
    const body = await readJson(request);
    return jsonResponse(await this.auth.verifyCode(Validator.email(body['email']), Validator.code(body['code'])));
  };

  login = async (request: Request): Promise<Response> => {
    const body = await readJson(request);
    return jsonResponse(await this.auth.login(Validator.email(body['email']), Validator.requiredText(body['password'], 'password', 128)));
  };

  google = async (request: Request): Promise<Response> => {
    const body = await readJson(request);
    return jsonResponse(await this.auth.verifyWithGoogle(Validator.email(body['email']), Validator.requiredText(body['idToken'], 'idToken')));
  };

  me = async (request: Request): Promise<Response> => {
    const userId = await this.bearer.authenticate(request);
    return jsonResponse({ user: await this.auth.currentUser(userId) });
  };
}
