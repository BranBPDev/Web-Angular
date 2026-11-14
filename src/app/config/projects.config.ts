import { Project } from '../models/project.model';

/**
 * Proyectos que muestra el carrusel de la portada. Para añadir uno basta con
 * añadir una entrada aquí y dejar su captura en public/projects/.
 */
export const PROJECTS: readonly Project[] = [
  { name: 'eurostarshotels.com', url: 'https://eurostarshotels.com', image: '/projects/eurostarshotels.jpg', kind: 'web' },
  { name: 'creiss.es', url: 'https://creiss.es', image: '/projects/creiss.jpg', kind: 'web' },
  { name: 'HermesApp', url: 'https://github.com/BranBPDev/HermesApp', image: '/projects/hermesapp.jpg', kind: 'repo' },
  { name: 'Web-Angular', url: 'https://github.com/BranBPDev/Web-Angular', image: '/projects/web-angular.jpg', kind: 'repo' },
];
