import { Component, input } from '@angular/core';

/** Contenedor visual común de las pantallas de acceso. */
@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.html',
})
export class AuthCard {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
}
