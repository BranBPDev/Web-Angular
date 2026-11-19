export type ProjectKind = 'web' | 'repo';

export interface Project {
  id: string;
  name: string;
  url: string;
  /** Ruta pública de la captura (p. ej. /projects/creiss.jpg). */
  image: string;
  kind: ProjectKind;
}
