import { Component, input } from '@angular/core';

export type BadgeVariant = 'neutral' | 'ok' | 'admin';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.html',
})
export class Badge {
  readonly variant = input<BadgeVariant>('neutral');
}
