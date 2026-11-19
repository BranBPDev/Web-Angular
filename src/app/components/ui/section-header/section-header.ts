import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Cabecera de una sección: etiqueta, título y, opcionalmente, un enlace a su página completa. */
@Component({
  selector: 'app-section-header',
  imports: [RouterLink],
  templateUrl: './section-header.html',
})
export class SectionHeader {
  readonly eyebrow = input<string>('');
  readonly heading = input.required<string>();
  readonly link = input<string>('');
  readonly linkLabel = input<string>('');
}
