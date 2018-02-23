import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ResumeModule } from './resume/resume.module';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';
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
    SkillModule,
    ProjectModule,
    ThemeModule,
    GraduationModule,

    // Mat
    MatModule,

    // Deps
    BrowserModule,
    HttpModule,
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
