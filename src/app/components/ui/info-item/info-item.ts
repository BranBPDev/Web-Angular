import { Component, input } from '@angular/core';

/** Pareja etiqueta + valor (el valor se proyecta como contenido). */
@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.html',
})
export class InfoItem {
  readonly label = input.required<string>();
}
