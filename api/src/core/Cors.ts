export class Cors {
  private readonly allowed: Set<string>;

  constructor(allowedOrigins: string) {
    this.allowed = new Set(allowedOrigins.split(',').map((o) => o.trim()).filter(Boolean));
  }

  headersFor(request: Request): Record<string, string> {
    const headers: Record<string, string> = { Vary: 'Origin' };
    const origin = request.headers.get('Origin');
    if (origin && this.allowed.has(origin)) {
      headers['Access-Control-Allow-Origin'] = origin;
      headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
      headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
      headers['Access-Control-Max-Age'] = '86400';
    }
    return headers;
  }
}
