import { Routes } from '@angular/router';
import { adminGuard, authGuard, guestGuard } from './guards/auth.guard';

/**
 * Todas las rutas de la web en un único sitio. Convención: la URL refleja la jerarquía.
 *   /                  portada
 *   /login             /register            /verify
 *   /admin             /admin/<subpágina>   (las subpáginas se añaden como hijas de 'admin')
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'branbp.com',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'admin',
    title: 'Administración · branbp.com',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
  },
  {
    path: 'login',
    title: 'Iniciar sesión · branbp.com',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    title: 'Crear cuenta · branbp.com',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: 'verify',
    title: 'Verificar correo · branbp.com',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/verify/verify').then((m) => m.Verify),
  },
  { path: '**', redirectTo: '' },
];
