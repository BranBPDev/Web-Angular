import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_ITEMS } from '../../../config/nav.config';
import { UserMenu } from '../user-menu/user-menu';

/** Cabecera fija. Incluye un separador del mismo alto para que el contenido empiece justo debajo. */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, UserMenu],
  templateUrl: './header.html',
})
export class AppHeader {
  protected readonly navItems = NAV_ITEMS;
}
