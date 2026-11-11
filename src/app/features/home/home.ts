import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AppShell } from '../../shared/components/app-shell/app-shell';
import { Icon } from '../../shared/components/icon/icon';
import { ROLE_LABELS } from '../../shared/utils/role-labels';
import { FEATURES } from './home.data';

@Component({
  selector: 'app-home',
  imports: [AppShell, Icon],
  templateUrl: './home.html',
})
export class Home {
  protected readonly auth = inject(AuthService);

  protected readonly features = FEATURES;
  protected readonly displayName = computed(() => this.auth.user()?.email.split('@')[0] ?? '');
  protected readonly roleLabel = computed(() => {
    const user = this.auth.user();
    return user ? ROLE_LABELS[user.role] : '';
  });
}
