import { Component, ElementRef, afterNextRender, signal, viewChild } from '@angular/core';
import { PROJECTS } from '../../../config/projects.config';
import { Icon } from '../../ui/icon/icon';
import { ProjectCard } from '../project-card/project-card';

/** Carrusel de proyectos realizados. Se desplaza con las flechas o deslizando el dedo / la rueda. */
@Component({
  selector: 'app-projects-carousel',
  imports: [Icon, ProjectCard],
  templateUrl: './projects-carousel.html',
  host: { '(window:resize)': 'updateEdges()' },
})
export class ProjectsCarousel {
  protected readonly projects = PROJECTS;

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  protected readonly canPrev = signal(false);
  protected readonly canNext = signal(false);

  constructor() {
    afterNextRender(() => this.updateEdges());
  }

  /** Desplaza el carrusel una tarjeta hacia la izquierda (-1) o la derecha (1). */
  protected move(direction: -1 | 1): void {
    const element = this.track().nativeElement;
    const card = element.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    const step = (card?.offsetWidth ?? element.clientWidth) + gap;
    element.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  /** Activa o desactiva las flechas según haya más tarjetas a cada lado. */
  updateEdges(): void {
    const element = this.track().nativeElement;
    this.canPrev.set(element.scrollLeft > 1);
    this.canNext.set(element.scrollLeft + element.clientWidth < element.scrollWidth - 1);
  }
}
