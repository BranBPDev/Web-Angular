import { Component, ElementRef, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../config/app.constants';
import { SessionManager } from '../../../managers/session.manager';
import { Icon } from '../../ui/icon/icon';

/** Icono de usuario que despliega el menú de la cuenta (cuenta, administración y cerrar sesión). */
@Component({
  selector: 'app-user-menu',
  imports: [RouterLink, Icon],
  templateUrl: './user-menu.html',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'close()',
  },
})
export class UserMenu {
  protected readonly session = inject(SessionManager);
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly open = signal(false);
  protected readonly displayName = computed(() => {
    const user = this.session.user();
    return user ? (user.name ?? user.email.split('@')[0]) : '';
  });

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  close(): void {
    this.open.set(false);
  }

  onDocumentClick(event: Event): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.close();
  }

  protected async logout(): Promise<void> {
    this.close();
    this.session.logout();
    await this.router.navigateByUrl(APP_ROUTES.login);
  }
}
