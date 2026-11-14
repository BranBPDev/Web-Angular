import { SECURITY } from '../config/security';
import type { Authorizer } from '../core/Authorizer';
import { jsonResponse, readJson } from '../core/http';
import type { AccountManager } from '../managers/AccountManager';
import { Validator } from '../utils/Validator';

/** Endpoints de la cuenta del usuario. Todos exigen sesión iniciada. */
export class AccountController {
  constructor(private readonly authorizer: Authorizer, private readonly account: AccountManager) {}

  updateName = async (request: Request): Promise<Response> => {
    const user = await this.authorizer.requireUser(request);
    const body = await readJson(request);
    return jsonResponse({ user: await this.account.updateName(user, Validator.name(body['name'])) });
  };

  requestPasswordChange = async (request: Request): Promise<Response> => {
    const user = await this.authorizer.requireUser(request);
    const body = await readJson(request);
    await this.account.requestPasswordChange(
      user,
      Validator.requiredText(body['currentPassword'], 'currentPassword', SECURITY.PASSWORD_MAX_LENGTH),
      Validator.newPassword(body['newPassword']),
    );
    return jsonResponse({ ok: true });
  };

  resendPasswordChange = async (request: Request): Promise<Response> => {
    const user = await this.authorizer.requireUser(request);
    await this.account.resendPasswordChangeCode(user);
    return jsonResponse({ ok: true });
  };

  confirmPasswordChange = async (request: Request): Promise<Response> => {
    const user = await this.authorizer.requireUser(request);
    const body = await readJson(request);
    await this.account.confirmPasswordChange(user, Validator.code(body['code']));
    return jsonResponse({ ok: true });
  };
}
