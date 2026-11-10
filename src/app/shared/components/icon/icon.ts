import { Component, input } from '@angular/core';

export type IconName = 'eye' | 'eye-off' | 'lock' | 'user' | 'log-out' | 'shield-check' | 'mail' | 'zap' | 'globe';

/** Icono SVG en línea (sin dependencias). Hereda el color del texto con currentColor. */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  host: { 'aria-hidden': 'true', class: 'icon' },
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input<number>(20);
}
