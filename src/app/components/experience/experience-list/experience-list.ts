import { Component, inject } from '@angular/core';
import { ExperienceManager } from '../../../managers/experience.manager';
import { RemoteState } from '../../ui/remote-state/remote-state';
import { ExperienceItem } from '../experience-item/experience-item';

/** Experiencia laboral: elementos que alternan el lado de la imagen. */
@Component({
  selector: 'app-experience-list',
  imports: [ExperienceItem, RemoteState],
  templateUrl: './experience-list.html',
})
export class ExperienceList {
  private readonly manager = inject(ExperienceManager);
  protected readonly source = this.manager.list;
  protected readonly items = this.manager.list.items;

  constructor() {
    void this.manager.list.load();
  }
}
