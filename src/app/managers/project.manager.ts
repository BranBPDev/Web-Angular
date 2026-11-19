import { Injectable, inject } from '@angular/core';
import { ProjectDao } from '../daos/project.dao';
import { Project } from '../models/project.model';
import { RemoteList } from '../utils/remote-list';

/** Proyectos de la web (se cargan una sola vez y se comparten entre el carrusel y la página). */
@Injectable({ providedIn: 'root' })
export class ProjectManager {
  private readonly dao = inject(ProjectDao);
  readonly list = new RemoteList<Project>(() => this.dao.list());
}
