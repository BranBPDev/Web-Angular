import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APP_ROUTES } from '../config/app.constants';
import { AuthService } from '../services/auth.service';

/** Solo usuarios con sesión. */
export const authGuard: CanActivateFn = () =>
  inject(AuthService).isAuthenticated() ? true : inject(Router).createUrlTree([APP_ROUTES.login]);

/** Solo visitantes sin sesión (login, registro, verificación). */
export const guestGuard: CanActivateFn = () =>
  inject(AuthService).isAuthenticated() ? inject(Router).createUrlTree([APP_ROUTES.home]) : true;

/**
 * Solo administradores. Es una comodidad de la interfaz: la seguridad real
 * la aplica siempre el servidor en cada endpoint de administración.
 */
export const adminGuard: CanActivateFn = () =>
  inject(AuthService).isAdmin() ? true : inject(Router).createUrlTree([APP_ROUTES.home]);
