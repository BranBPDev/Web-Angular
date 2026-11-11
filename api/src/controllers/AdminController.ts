import type { Authorizer } from '../core/Authorizer';
import { jsonResponse } from '../core/http';

export class AdminController {
  constructor(private readonly authorizer: Authorizer) {}

  /** Comprueba en el servidor que el usuario es administrador (base para los futuros endpoints del CMS). */
  check = async (request: Request): Promise<Response> => {
    const user = await this.authorizer.requireRole(request, 'admin');
    return jsonResponse({ ok: true, role: user.role });
  };
}
