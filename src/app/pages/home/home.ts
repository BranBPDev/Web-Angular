import { NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { HOME_SECTIONS } from './home.sections';

/** Portada: se construye a partir de las secciones activas de HOME_SECTIONS. */
@Component({
  selector: 'app-home',
  imports: [NgComponentOutlet],
  templateUrl: './home.html',
})
export class Home {
  protected readonly sections = HOME_SECTIONS.filter((section) => section.enabled);
}
