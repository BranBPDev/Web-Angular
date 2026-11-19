import { Injectable, inject } from '@angular/core';
import { ApiClient } from '../http/api-client';
import { Experience } from '../models/experience.model';

@Injectable({ providedIn: 'root' })
export class ExperienceDao {
  private readonly api = inject(ApiClient);

  async list(): Promise<Experience[]> {
    return (await this.api.get<{ experience: Experience[] }>('/experience')).experience;
  }
}
