import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule
} from '@angular/material';
import { NgcFloatButtonModule } from 'ngc-float-button';

import { ResumeRepositoryService } from './shared/resume-repository.service';
import { ExperienceRepositoryService } from './shared/experience-repository.service';
import { ResumeSelectorService } from './shared/resume-selector.service';

import { AppComponent } from './app.component';
import { ResumesListComponent } from './resumes-list/resumes-list.component';
import { ResumeSelectorComponent } from './resume-selector/resume-selector.component';
import { ResumeGeneralComponent } from './resume-general/resume-general.component';
import { ExperiencesListComponent } from './experiences-list/experiences-list.component';
import { EditExperienceComponent } from './edit-experience/edit-experience.component';
import { EditResumeComponent } from './edit-resume/edit-resume.component';

@NgModule({
  declarations: [
    AppComponent,
    ResumesListComponent,
    ResumeSelectorComponent,
    ResumeGeneralComponent,
    ExperiencesListComponent,
    EditExperienceComponent,
    EditResumeComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgcFloatButtonModule,
    RouterModule.forRoot([
        {
            path: '',
            component: ResumesListComponent
        },
        {
            path: 'general',
            component: ResumeGeneralComponent
        },
        {
            path: 'experiences',
            component: ExperiencesListComponent
        }
    ]),
  ],
  providers: [ResumeRepositoryService, ExperienceRepositoryService, ResumeSelectorService],
  bootstrap: [AppComponent],
  entryComponents: [EditExperienceComponent, EditResumeComponent]
})
export class AppModule { }
