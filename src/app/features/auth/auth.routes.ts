import { Routes } from '@angular/router';
import { guestGuard } from '../../core/guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesión · branbp.com',
    canActivate: [guestGuard],
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    title: 'Crear cuenta · branbp.com',
    canActivate: [guestGuard],
    loadComponent: () => import('./register/register').then((m) => m.Register),
  },
  {
    path: 'verify',
    title: 'Verificar correo · branbp.com',
    canActivate: [guestGuard],
    loadComponent: () => import('./verify/verify').then((m) => m.Verify),
  },
];
