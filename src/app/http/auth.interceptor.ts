import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_BASE_URL } from '../config/api.config';
import { TokenManager } from '../managers/token.manager';

/** Añade el token de sesión solo a las peticiones dirigidas a nuestra API. */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(TokenManager).get();
  if (!token || !request.url.startsWith(inject(API_BASE_URL))) return next(request);
  return next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
