import { Injectable, inject } from '@angular/core';
import { ApiClient } from '../http/api-client';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectDao {
  private readonly api = inject(ApiClient);

  async list(): Promise<Project[]> {
    return (await this.api.get<{ projects: Project[] }>('/projects')).projects;
  }
}
