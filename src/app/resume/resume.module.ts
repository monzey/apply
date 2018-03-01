import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatModule } from '../mat/mat.module';
import { SharedModule } from '../shared/shared.module';

import { EditResumeComponent } from './edit-resume/edit-resume.component';
import { ResumeGeneralComponent } from './resume-general/resume-general.component';
import { ResumeSelectorComponent } from './resume-selector/resume-selector.component'
import { ResumesListComponent } from './resumes-list/resumes-list.component';
import { DuplicateResumeThingComponent } from './duplicate-resume-thing/duplicate-resume-thing.component';

import { ResumeRepositoryService } from '../shared/resume-repository.service';
import { ResumeSelectorService } from '../shared/resume-selector.service';

@NgModule({
  imports: [
    CommonModule,

    // Deps
    MatModule,
    SharedModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forRoot([
      {
        path: '',
        component: ResumesListComponent
      },
      {
        path: 'general',
        component: ResumeGeneralComponent
      }
    ]),
  ],
  exports: [
    EditResumeComponent,
    ResumeGeneralComponent,
    ResumeSelectorComponent,
    ResumesListComponent,
    DuplicateResumeThingComponent
  ],
  declarations: [
    EditResumeComponent,
    ResumeGeneralComponent,
    ResumeSelectorComponent,
    ResumesListComponent,
    DuplicateResumeThingComponent
  ],
  entryComponents: [
    EditResumeComponent,
    DuplicateResumeThingComponent
  ],
  providers: [
    ResumeRepositoryService, 
    ResumeSelectorService,
    { provide: 'ResumeRepository', useExisting: ResumeRepositoryService }
  ]
})
export class ResumeModule { }
