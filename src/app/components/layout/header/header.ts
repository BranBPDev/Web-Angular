import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserMenu } from '../user-menu/user-menu';

/** Cabecera fija. Incluye un separador del mismo alto para que el contenido empiece justo debajo. */
@Component({
  selector: 'app-header',
  imports: [RouterLink, UserMenu],
  templateUrl: './header.html',
})
export class AppHeader {}
