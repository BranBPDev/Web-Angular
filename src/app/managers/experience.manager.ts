import { Injectable, inject } from '@angular/core';
import { ExperienceDao } from '../daos/experience.dao';
import { Experience } from '../models/experience.model';
import { RemoteList } from '../utils/remote-list';

/** Experiencia laboral (se carga una sola vez y se comparte entre la portada y su página). */
@Injectable({ providedIn: 'root' })
export class ExperienceManager {
  private readonly dao = inject(ExperienceDao);
  readonly list = new RemoteList<Experience>(() => this.dao.list());
}
