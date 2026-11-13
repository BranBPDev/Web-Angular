import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
})
export class Hero {
  readonly eyebrow = input<string>('');
  readonly heading = input.required<string>();
  readonly text = input<string>('');
}
