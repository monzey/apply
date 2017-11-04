import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
    MatCardModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ResumesListComponent } from './resumes-list/resumes-list.component';
import { ResumeSelectorComponent } from './resume-selector/resume-selector.component';
import { ResumeGeneralComponent } from './resume-general/resume-general.component';

@NgModule({
  declarations: [
    AppComponent,
    ResumesListComponent,
    ResumeSelectorComponent,
    ResumeGeneralComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
