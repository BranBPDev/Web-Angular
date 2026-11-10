import { InjectionToken } from '@angular/core';

/** URL base de la API (Worker de Cloudflare en api.branbp.com). */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'https://api.branbp.com/api',
});
