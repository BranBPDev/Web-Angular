import { Component } from '@angular/core';
import { ProjectList } from '../../components/projects/project-list/project-list';
import { Hero } from '../../components/ui/hero/hero';

@Component({
  selector: 'app-projects',
  imports: [Hero, ProjectList],
  templateUrl: './projects.html',
})
export class ProjectsPage {}
