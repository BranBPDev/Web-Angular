/** Error con código HTTP y código de aplicación que se devuelve al cliente. */
export class HttpError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) {
    super(message);
    this.name = 'HttpError';
  }

  static badRequest(code: string, message: string): HttpError { return new HttpError(400, code, message); }
  static unauthorized(code: string, message: string): HttpError { return new HttpError(401, code, message); }
  static forbidden(code: string, message: string): HttpError { return new HttpError(403, code, message); }
  static notFound(code: string, message: string): HttpError { return new HttpError(404, code, message); }
  static conflict(code: string, message: string): HttpError { return new HttpError(409, code, message); }
  static tooManyRequests(code: string, message: string): HttpError { return new HttpError(429, code, message); }
}
