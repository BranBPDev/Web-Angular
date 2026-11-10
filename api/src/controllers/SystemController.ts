import { jsonResponse } from '../core/http';

export class SystemController {
  constructor(private readonly googleClientId: string) {}

  /** El Client ID de Google es público: el frontend lo necesita para mostrar el acceso con Google. */
  config = async (): Promise<Response> => jsonResponse({ googleClientId: this.googleClientId });

  health = async (): Promise<Response> => jsonResponse({ status: 'ok' });
}
