import { Component } from '@angular/core';
import { ExperienceList } from '../../experience/experience-list/experience-list';
import { SectionHeader } from '../../ui/section-header/section-header';

/** Sección de la portada con la experiencia laboral. */
@Component({
  selector: 'app-experience-section',
  imports: [SectionHeader, ExperienceList],
  templateUrl: './experience-section.html',
})
export class ExperienceSection {}
