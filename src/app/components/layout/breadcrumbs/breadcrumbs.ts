import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbManager } from '../../../managers/breadcrumb.manager';

/** Migas de pan automáticas. No se muestran en la portada (solo hay un nivel). */
@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.html',
})
export class Breadcrumbs {
  protected readonly crumbs = inject(BreadcrumbManager).crumbs;
}
