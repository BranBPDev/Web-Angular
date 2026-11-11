import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Solo usuarios con sesión. */
export const authGuard: CanActivateFn = () =>
  inject(AuthService).isAuthenticated() ? true : inject(Router).createUrlTree(['/login']);

/** Solo visitantes sin sesión (login, registro, verificación). */
export const guestGuard: CanActivateFn = () =>
  inject(AuthService).isAuthenticated() ? inject(Router).createUrlTree(['/']) : true;

/**
 * Solo administradores. Es una comodidad de la interfaz: la seguridad real
 * la aplica siempre el servidor en cada endpoint de administración.
 */
export const adminGuard: CanActivateFn = () =>
  inject(AuthService).isAdmin() ? true : inject(Router).createUrlTree(['/']);
