import { Component, computed, input } from '@angular/core';
import { Project } from '../../../models/project.model';
import { Icon } from '../../ui/icon/icon';

export type ProjectCardLayout = 'vertical' | 'horizontal';

/**
 * Tarjeta de un proyecto: imagen, nombre y enlace en forma de botón.
 * Vertical (carrusel): imagen arriba, título y botón debajo. Horizontal (página de proyectos): imagen a un lado.
 */
@Component({
  selector: 'app-project-card',
  imports: [Icon],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly layout = input<ProjectCardLayout>('vertical');

  protected readonly kindLabel = computed(() => (this.project().kind === 'web' ? 'Sitio web' : 'Repositorio'));
  protected readonly actionLabel = computed(() => (this.project().kind === 'web' ? 'Visitar web' : 'Ver repositorio'));
  protected readonly displayUrl = computed(() => this.project().url.replace(/^https?:\/\//, ''));
}
