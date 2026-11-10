import { App } from './app';
import type { Env } from './config/env';

export default {
  fetch(request: Request, env: Env): Promise<Response> {
    return new App(env).handle(request);
  },
} satisfies ExportedHandler<Env>;
