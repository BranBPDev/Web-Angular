import { Component } from '@angular/core';
import { ExperienceList } from '../../components/experience/experience-list/experience-list';
import { Hero } from '../../components/ui/hero/hero';

@Component({
  selector: 'app-experience',
  imports: [Hero, ExperienceList],
  templateUrl: './experience.html',
})
export class ExperiencePage {}
