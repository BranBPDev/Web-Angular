import { Component, input } from '@angular/core';
import { Icon, IconName } from '../icon/icon';

@Component({
  selector: 'app-feature-card',
  imports: [Icon],
  templateUrl: './feature-card.html',
})
export class FeatureCard {
  readonly icon = input.required<IconName>();
  readonly heading = input.required<string>();
  readonly description = input.required<string>();
}
