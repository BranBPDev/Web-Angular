import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../config/app.constants';
import { SessionManager } from '../../../managers/session.manager';
import { AppFooter } from '../footer/footer';
import { AppHeader } from '../header/header';

/** Estructura común de las páginas con sesión iniciada: cabecera, contenido y pie. */
@Component({
  selector: 'app-shell',
  imports: [AppHeader, AppFooter],
  templateUrl: './shell.html',
})
export class AppShell {
  protected readonly session = inject(SessionManager);
  private readonly router = inject(Router);

  protected async logout(): Promise<void> {
    this.session.logout();
    await this.router.navigateByUrl(APP_ROUTES.login);
  }
}
