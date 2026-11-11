import { HttpError } from './errors';
import type { BearerAuth } from './BearerAuth';
import type { UserDao } from '../daos/UserDao';
import { hasRole, type UserRole } from '../models/Role';
import type { User } from '../models/User';

/**
 * Autorización: identifica al usuario por su sesión y comprueba su rol.
 * El rol se lee siempre de la base de datos (no del token), así que cambiarlo allí surte efecto al instante.
 */
export class Authorizer {
  constructor(private readonly bearer: BearerAuth, private readonly users: UserDao) {}

  async requireUser(request: Request): Promise<User> {
    const userId = await this.bearer.authenticate(request);
    const user = await this.users.findById(userId);
    if (!user || !user.verifiedAt) throw HttpError.unauthorized('UNAUTHORIZED', 'Sesión no válida o caducada.');
    return user;
  }

  async requireRole(request: Request, role: UserRole): Promise<User> {
    const user = await this.requireUser(request);
    if (!hasRole(user.role, role)) throw HttpError.forbidden('FORBIDDEN', 'No tienes permisos para esta acción.');
    return user;
  }
}
