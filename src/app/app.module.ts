import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ResumeModule } from './resume/resume.module';
import { ProjectModule } from './project/project.module';
import { ThemeModule } from './theme/theme.module';
import { ExperienceModule } from './experience/experience.module';
import { GraduationModule } from './graduation/graduation.module';

import { MatModule } from './mat/mat.module';

import { RepositoryContainerService } from './shared/repository-container.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Internal modules
    ResumeModule,
    ExperienceModule,
    ProjectModule,
    ThemeModule,
    GraduationModule,

    // Mat
    MatModule,

    // Deps
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    RepositoryContainerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
