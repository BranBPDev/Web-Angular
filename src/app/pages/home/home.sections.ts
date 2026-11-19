import { Type } from '@angular/core';
import { ExperienceSection } from '../../components/home/experience-section/experience-section';
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
  { id: 'experience', enabled: true, component: ExperienceSection },
];
