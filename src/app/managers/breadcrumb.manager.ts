import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { Breadcrumb } from '../models/breadcrumb.model';

type BreadcrumbLabel = string | ((route: ActivatedRouteSnapshot) => string);

/**
 * Migas de pan automáticas: se construyen recorriendo las rutas activas.
 * Cada ruta que quiera aparecer declara `data: { breadcrumb: 'Etiqueta' }` en app.routes.ts.
 * La etiqueta puede ser una función para rutas dinámicas (p. ej. el nombre de un proyecto).
 */
@Injectable({ providedIn: 'root' })
export class BreadcrumbManager {
  private readonly router = inject(Router);

  readonly crumbs = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.build()),
    ),
    { initialValue: [] as Breadcrumb[] },
  );

  private build(): Breadcrumb[] {
    const crumbs: Breadcrumb[] = [];
    let url = '';
    let route: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;

    while (route) {
      const segment = route.url.map((part) => part.path).join('/');
      if (segment) url += `/${segment}`;

      const label = this.labelOf(route);
      if (label) crumbs.push({ label, url: url || '/' });
      route = route.firstChild;
    }
    return crumbs;
  }

  private labelOf(route: ActivatedRouteSnapshot): string | null {
    const label = route.routeConfig?.data?.['breadcrumb'] as BreadcrumbLabel | undefined;
    if (!label) return null;
    return typeof label === 'function' ? label(route) : label;
  }
}
