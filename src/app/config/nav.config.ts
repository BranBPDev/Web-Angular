import { APP_ROUTES } from './app.constants';

export interface NavItem {
  label: string;
  path: string;
}

/** Páginas que aparecen en la cabecera, en orden. Para añadir una, basta con añadir una línea. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Proyectos', path: APP_ROUTES.projects },
  { label: 'Experiencia', path: APP_ROUTES.experience },
];
