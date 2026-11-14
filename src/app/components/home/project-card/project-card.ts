import { Component, computed, input } from '@angular/core';
import { Project } from '../../../models/project.model';
import { Icon } from '../../ui/icon/icon';

/** Tarjeta de un proyecto: imagen, nombre y enlace en forma de botón. */
@Component({
  selector: 'app-project-card',
  imports: [Icon],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  readonly project = input.required<Project>();

  protected readonly kindLabel = computed(() => (this.project().kind === 'web' ? 'Sitio web' : 'Repositorio'));
  protected readonly actionLabel = computed(() => (this.project().kind === 'web' ? 'Visitar web' : 'Ver repositorio'));
}
