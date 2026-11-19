import type { ExperienceDao } from '../daos/ExperienceDao';
import type { ProjectDao } from '../daos/ProjectDao';
import type { Experience } from '../models/Experience';
import type { Project } from '../models/Project';

/** Contenido público de la web (proyectos y experiencia laboral). */
export class ContentManager {
  constructor(private readonly projects: ProjectDao, private readonly experiences: ExperienceDao) {}

  listProjects(): Promise<Project[]> {
    return this.projects.listVisible();
  }

  listExperience(): Promise<Experience[]> {
    return this.experiences.listVisible();
  }
}
