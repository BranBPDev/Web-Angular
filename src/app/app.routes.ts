import { Routes } from '@angular/router';
import { adminGuard, authGuard, guestGuard } from './guards/auth.guard';
import { MainLayout } from './layouts/main-layout/main-layout';

/**
 * Todas las rutas de la web en un único sitio. La URL refleja la jerarquía.
 *   /                  portada
 *   /projects          proyectos            (detalle: /projects/<nombre>, como hija de 'projects')
 *   /experience        experiencia laboral
 *   /account           cuenta del usuario
 *   /admin             administración
 *   /login  /register  /verify              acceso (sin cabecera ni pie)
 *
 * Las páginas con sesión cuelgan de MainLayout, que aporta cabecera, migas de pan y pie una sola vez.
 * Las migas de pan se generan solas a partir de `data.breadcrumb` de cada ruta: una ruta sin ese dato no aparece.
 */
export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    data: { breadcrumb: 'Inicio' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'branbp.com',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'projects',
        title: 'Proyectos · branbp.com',
        data: { breadcrumb: 'Proyectos' },
        loadComponent: () => import('./pages/projects/projects').then((m) => m.ProjectsPage),
      },
      {
        path: 'experience',
        title: 'Experiencia · branbp.com',
        data: { breadcrumb: 'Experiencia' },
        loadComponent: () => import('./pages/experience/experience').then((m) => m.ExperiencePage),
      },
      {
        path: 'account',
        title: 'Mi cuenta · branbp.com',
        data: { breadcrumb: 'Mi cuenta' },
        loadComponent: () => import('./pages/account/account').then((m) => m.Account),
      },
      {
        path: 'admin',
        title: 'Administración · branbp.com',
        data: { breadcrumb: 'Administración' },
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
