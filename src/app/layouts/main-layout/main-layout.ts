import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFooter } from '../../components/layout/footer/footer';
import { AppHeader } from '../../components/layout/header/header';

/**
 * Estructura común de todas las páginas con sesión: cabecera, contenido y pie.
 * Se aplica una sola vez en las rutas (app.routes.ts); las pantallas de acceso no la usan.
 */
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, AppHeader, AppFooter],
  templateUrl: './main-layout.html',
})
export class MainLayout {}
