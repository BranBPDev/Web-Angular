import { HttpError } from './errors';

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw HttpError.badRequest('INVALID_JSON', 'El cuerpo de la petición no es válido.');
  }
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw HttpError.badRequest('INVALID_JSON', 'El cuerpo de la petición no es válido.');
  }
  return body as Record<string, unknown>;
}

export function withHeaders(response: Response, headers: Record<string, string>): Response {
  const out = new Response(response.body, response);
  for (const [name, value] of Object.entries(headers)) out.headers.set(name, value);
  return out;
}
