import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatCardModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ResumesListComponent } from './resumes-list/resumes-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ResumesListComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    RouterModule.forRoot([
        {
            path: '',
            component: ResumesListComponent
        }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
