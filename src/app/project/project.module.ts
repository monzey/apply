import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectsListComponent } from './projects-list/projects-list.component';

@NgModule({
  imports: [
    CommonModule,

    // Routes
    RouterModule.forRoot([
      {
        path: 'projects',
        component: ProjectsListComponent
      }
    ]),
  ],
  declarations: [ProjectsListComponent]
})
export class ProjectModule { }
