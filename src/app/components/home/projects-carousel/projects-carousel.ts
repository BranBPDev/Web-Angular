import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { CAROUSEL } from '../../../config/app.constants';
import { ProjectManager } from '../../../managers/project.manager';
import { Project } from '../../../models/project.model';
import { mod } from '../../../utils/math';
import { prefersReducedMotion } from '../../../utils/media';
import { RepeatingTimer } from '../../../utils/repeating-timer';
import { RemoteState } from '../../ui/remote-state/remote-state';
import { SectionHeader } from '../../ui/section-header/section-header';
import { ProjectCard } from '../project-card/project-card';

type Shift = 'next' | 'prev' | null;
type SlotState = 'center' | 'near' | 'hidden';

/** Posiciones que se dibujan alrededor de la activa: dos ocultas, dos laterales y la central. */
const SLOT_OFFSETS = [-2, -1, 0, 1, 2] as const;

/**
 * Carrusel circular de proyectos. Se ven tres tarjetas a la vez y la del centro es la activa.
 * Avanza solo, se puede deslizar y se controla con los puntos de abajo. Al llegar al último vuelve al primero.
 *
 * Funcionamiento: se dibujan 5 posiciones fijas. Para avanzar se desplaza la pista una tarjeta (animación CSS) y,
 * al terminar, se cambia el proyecto activo y la pista vuelve a su sitio sin animación.
 */
@Component({
  selector: 'app-projects-carousel',
  imports: [ProjectCard, SectionHeader, RemoteState],
  templateUrl: './projects-carousel.html',
})
export class ProjectsCarousel {
  private readonly manager = inject(ProjectManager);
  protected readonly source = this.manager.list;
  protected readonly projects = this.manager.list.items;

  private readonly active = signal(0);
  protected readonly shift = signal<Shift>(null);
  private readonly shiftValue = computed(() => (this.shift() === 'next' ? 1 : this.shift() === 'prev' ? -1 : 0));

  protected readonly count = computed(() => this.projects().length);
  protected readonly slots = computed(() => {
    const list = this.projects();
    if (list.length === 0) return [];
    return SLOT_OFFSETS.map((offset) => ({ offset, project: list[mod(this.active() + offset, list.length)] as Project }));
  });
  /** Proyecto resaltado en los puntos: cambia en cuanto empieza la animación. */
  protected readonly dotIndex = computed(() => (this.count() ? mod(this.active() + this.shiftValue(), this.count()) : 0));

  private readonly timer = new RepeatingTimer(() => this.advance(1), CAROUSEL.autoplayMs);
  private autoplay = false;
  private queued = 0;
  private queuedDirection: 1 | -1 = 1;
  private fallback?: ReturnType<typeof setTimeout>;
  private swipeStartX: number | null = null;
  private suppressClick = false;

  constructor() {
    void this.manager.list.load();

    afterNextRender(() => {
      this.autoplay = !prefersReducedMotion();
      this.resume();
    });
    inject(DestroyRef).onDestroy(() => {
      this.timer.stop();
      clearTimeout(this.fallback);
    });
  }

  /** Estado visual de una posición teniendo en cuenta la animación en curso. */
  protected stateOf(offset: number): SlotState {
    const distance = Math.abs(offset - this.shiftValue());
    if (distance === 0) return 'center';
    return distance === 1 && this.count() >= 3 ? 'near' : 'hidden';
  }

  /** Muestra el proyecto indicado por el punto, avanzando por el camino más corto. */
  protected goTo(index: number): void {
    const count = this.count();
    const distance = mod(index - this.dotIndex(), count);
    if (count < 2 || distance === 0 || this.shift() !== null) return;

    const forward = distance <= count / 2;
    this.queued = (forward ? distance : count - distance) - 1;
    this.queuedDirection = forward ? 1 : -1;
    this.advance(forward ? 1 : -1);
    this.restartAutoplay();
  }

  protected onTransitionEnd(event: TransitionEvent): void {
    if (event.target === event.currentTarget && event.propertyName === 'transform') this.finishStep();
  }

  protected onPointerEnter(event: PointerEvent): void {
    if (event.pointerType === 'mouse') this.timer.stop();
  }

  protected resume(): void {
    if (this.autoplay) this.timer.start();
  }

  protected onPointerDown(event: PointerEvent): void {
    this.swipeStartX = event.clientX;
    this.suppressClick = false;
  }

  protected onPointerUp(event: PointerEvent): void {
    if (this.swipeStartX === null) return;
    const delta = event.clientX - this.swipeStartX;
    this.swipeStartX = null;
    if (Math.abs(delta) < CAROUSEL.swipePx) return;

    this.suppressClick = true; // el gesto no debe abrir un enlace
    if (this.advance(delta < 0 ? 1 : -1)) this.restartAutoplay();
  }

  protected onPointerCancel(): void {
    this.swipeStartX = null;
  }

  protected onClick(event: Event): void {
    if (!this.suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    this.suppressClick = false;
  }

  private advance(direction: 1 | -1): boolean {
    if (this.count() < 2 || this.shift() !== null) return false;
    this.shift.set(direction === 1 ? 'next' : 'prev');
    clearTimeout(this.fallback);
    this.fallback = setTimeout(() => this.finishStep(), CAROUSEL.fallbackMs);
    return true;
  }

  private finishStep(): void {
    const current = this.shift();
    if (!current) return;
    clearTimeout(this.fallback);

    this.active.update((index) => mod(index + (current === 'next' ? 1 : -1), this.count()));
    this.shift.set(null);

    if (this.queued > 0) {
      this.queued--;
      // Se espera un instante para que la pista vuelva a su sitio antes de la siguiente animación.
      setTimeout(() => this.advance(this.queuedDirection), 50);
    }
  }

  private restartAutoplay(): void {
    if (this.autoplay) this.timer.start();
  }
}
