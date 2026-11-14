import { Routes } from '@angular/router';
import { guestGuard, adminGuard, authGuard } from './guards/auth.guard';
import { MainLayout } from './layouts/main-layout/main-layout';

/**
 * Todas las rutas de la web en un único sitio. La URL refleja la jerarquía.
 *   /                  portada
 *   /account           cuenta del usuario
 *   /admin             administración   (subpáginas: /admin/<nombre>, como hijas de 'admin')
 *   /login  /register  /verify          acceso (sin cabecera ni pie)
 *
 * Las páginas con sesión cuelgan de MainLayout, que aporta cabecera y pie una sola vez.
 */
export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'branbp.com',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'account',
        title: 'Mi cuenta · branbp.com',
        loadComponent: () => import('./pages/account/account').then((m) => m.Account),
      },
      {
        path: 'admin',
        title: 'Administración · branbp.com',
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
      },
    ],
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
