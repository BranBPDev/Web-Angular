export type ProjectKind = 'web' | 'repo';

export interface Project {
  name: string;
  url: string;
  /** Ruta de la captura dentro de public/projects/ */
  image: string;
  kind: ProjectKind;
}
