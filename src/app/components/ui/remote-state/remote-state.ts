import { Component, input } from '@angular/core';
import { RemoteState as RemoteStateSource } from '../../../utils/remote-list';

/** Muestra "cargando", el error o "sin contenido" según el estado de una lista remota; si hay datos, proyecta el contenido. */
@Component({
  selector: 'app-remote-state',
  templateUrl: './remote-state.html',
})
export class RemoteState {
  readonly source = input.required<RemoteStateSource>();
}
