import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Icon } from '../../shared/components/icon/icon';
import { SiteFooter } from '../../shared/components/site-footer/site-footer';
import { SiteHeader } from '../../shared/components/site-header/site-header';
import { FEATURES } from './home.data';

@Component({
  selector: 'app-home',
  imports: [SiteHeader, SiteFooter, Icon],
  templateUrl: './home.html',
})
export class Home {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly features = FEATURES;
  protected readonly displayName = computed(() => this.auth.user()?.email.split('@')[0] ?? '');

  protected async logout(): Promise<void> {
    this.auth.logout();
    await this.router.navigateByUrl('/login');
  }
}
