import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../ui/icon/icon';

/** Cabecera fija. Incluye un separador del mismo alto para que el contenido empiece justo debajo. */
@Component({
  selector: 'app-header',
  imports: [RouterLink, Icon],
  templateUrl: './header.html',
})
export class AppHeader {
  readonly email = input<string | null>(null);
  readonly isAdmin = input<boolean>(false);
  readonly logout = output<void>();
}
