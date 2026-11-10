import { HttpError } from './errors';
import type { JwtService } from '../utils/JwtService';

/** Extrae y valida el JWT de la cabecera Authorization: Bearer <token>. */
export class BearerAuth {
  constructor(private readonly jwt: JwtService) {}

  async authenticate(request: Request): Promise<string> {
    const header = request.headers.get('Authorization') ?? '';
    const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
    const payload = token ? await this.jwt.verify(token) : null;
    if (!payload) throw HttpError.unauthorized('UNAUTHORIZED', 'Sesión no válida o caducada.');
    return payload.sub;
  }
}
