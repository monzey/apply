import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatModule } from '../mat/mat.module';
import { SharedModule } from '../shared/shared.module';

import { ProjectsListComponent } from './projects-list/projects-list.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

import { ProjectRepositoryService } from '../shared/project-repository.service';

@NgModule({
  imports: [
    CommonModule,

    // Deps
    MatModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forRoot([
      {
        path: 'projects',
        component: ProjectsListComponent
      }
    ]),
  ],
  exports: [
    EditProjectComponent,
    ProjectsListComponent
  ],
  declarations: [
    ProjectsListComponent, 
    EditProjectComponent
  ],
  entryComponents: [
    EditProjectComponent
  ],
  providers: [
    ProjectRepositoryService,
    { provide: 'SideProjectRepository', useExisting: ProjectRepositoryService },
  ]
})
export class ProjectModule { }
