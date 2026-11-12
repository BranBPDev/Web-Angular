import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../core/config/app.constants';
import { AuthService } from '../../../core/services/auth.service';
import { SiteFooter } from '../site-footer/site-footer';
import { SiteHeader } from '../site-header/site-header';

/** Estructura común de las páginas con sesión iniciada: cabecera, contenido y pie. */
@Component({
  selector: 'app-shell',
  imports: [SiteHeader, SiteFooter],
  templateUrl: './app-shell.html',
})
export class AppShell {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected async logout(): Promise<void> {
    this.auth.logout();
    await this.router.navigateByUrl(APP_ROUTES.login);
  }
}
