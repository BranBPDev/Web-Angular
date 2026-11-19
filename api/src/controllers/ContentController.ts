import { jsonResponse } from '../core/http';
import type { ContentManager } from '../managers/ContentManager';

/** Endpoints públicos de contenido. */
export class ContentController {
  constructor(private readonly content: ContentManager) {}

  projects = async (): Promise<Response> => jsonResponse({ projects: await this.content.listProjects() });

  experience = async (): Promise<Response> => jsonResponse({ experience: await this.content.listExperience() });
}
