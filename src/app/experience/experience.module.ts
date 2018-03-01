import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatModule } from '../mat/mat.module';
import { SharedModule } from '../shared/shared.module';

import { EditExperienceComponent } from './edit-experience/edit-experience.component';
import { ExperiencesListComponent } from './experiences-list/experiences-list.component';

import { ExperienceRepositoryService } from '../shared/experience-repository.service';

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
        path: 'experiences',
        component: ExperiencesListComponent
      }
    ]),
  ],
  exports: [
    EditExperienceComponent,
    ExperiencesListComponent
  ],
  declarations: [
    EditExperienceComponent,
    ExperiencesListComponent
  ],
  entryComponents: [
    EditExperienceComponent
  ],
  providers: [
    ExperienceRepositoryService,
    { provide: 'ExperienceRepository', useExisting: ExperienceRepositoryService },
  ]
})
export class ExperienceModule { }
