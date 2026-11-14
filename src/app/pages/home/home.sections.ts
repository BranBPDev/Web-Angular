import { Type } from '@angular/core';
import { ProjectsCarousel } from '../../components/home/projects-carousel/projects-carousel';

export interface HomeSection {
  id: string;
  enabled: boolean;
  component: Type<unknown>;
}

/**
 * Secciones de la portada, en orden de aparición.
 * Activar o desactivar una sección es cambiar su `enabled`; añadir una nueva es añadir una línea.
 */
export const HOME_SECTIONS: readonly HomeSection[] = [
  { id: 'projects', enabled: true, component: ProjectsCarousel },
];
