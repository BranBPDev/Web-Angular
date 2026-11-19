import { Component, inject } from '@angular/core';
import { ProjectManager } from '../../../managers/project.manager';
import { ProjectCard } from '../../home/project-card/project-card';
import { RemoteState } from '../../ui/remote-state/remote-state';

/** Listado de proyectos con una tarjeta por fila a todo el ancho. */
@Component({
  selector: 'app-project-list',
  imports: [ProjectCard, RemoteState],
  templateUrl: './project-list.html',
})
export class ProjectList {
  private readonly manager = inject(ProjectManager);
  protected readonly source = this.manager.list;
  protected readonly projects = this.manager.list.items;

  constructor() {
    void this.manager.list.load();
  }
}
