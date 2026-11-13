import { Component, input } from '@angular/core';

/** Contenedor visual común de las pantallas de acceso (logo, título y contenido proyectado). */
@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.html',
})
export class AuthCard {
  readonly heading = input.required<string>();
  readonly subtitle = input<string>('');
}
