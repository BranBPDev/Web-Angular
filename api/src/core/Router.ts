import { HttpError } from './errors';

export type Handler = (request: Request) => Promise<Response>;

interface Route { method: string; path: string; handler: Handler }

export class Router {
  private readonly routes: Route[] = [];

  get(path: string, handler: Handler): this { return this.add('GET', path, handler); }
  post(path: string, handler: Handler): this { return this.add('POST', path, handler); }

  private add(method: string, path: string, handler: Handler): this {
    this.routes.push({ method, path, handler });
    return this;
  }

  dispatch(request: Request): Promise<Response> {
    const { pathname } = new URL(request.url);
    const samePath = this.routes.filter((r) => r.path === pathname);
    if (samePath.length === 0) throw HttpError.notFound('NOT_FOUND', 'Recurso no encontrado.');
    const route = samePath.find((r) => r.method === request.method);
    if (!route) throw new HttpError(405, 'METHOD_NOT_ALLOWED', 'Método no permitido.');
    return route.handler(request);
  }
}
