import { Component, computed, inject } from '@angular/core';
import { AppShell } from '../../components/layout/shell/shell';
import { Badge } from '../../components/ui/badge/badge';
import { FeatureCard } from '../../components/ui/feature-card/feature-card';
import { Hero } from '../../components/ui/hero/hero';
import { InfoItem } from '../../components/ui/info-item/info-item';
import { Panel } from '../../components/ui/panel/panel';
import { SessionManager } from '../../managers/session.manager';
import { ROLE_LABELS } from '../../utils/role-labels';
import { FEATURES } from './home.data';

@Component({
  selector: 'app-home',
  imports: [AppShell, Hero, FeatureCard, Panel, InfoItem, Badge],
  templateUrl: './home.html',
})
export class Home {
  protected readonly session = inject(SessionManager);

  protected readonly features = FEATURES;
  protected readonly displayName = computed(() => this.session.user()?.email.split('@')[0] ?? '');
  protected readonly roleLabel = computed(() => {
    const user = this.session.user();
    return user ? ROLE_LABELS[user.role] : '';
  });
}
