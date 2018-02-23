import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ThemesListComponent } from './themes-list/themes-list.component';

@NgModule({
  imports: [
    CommonModule,

    // Routes
    RouterModule.forRoot([
      {
        path: 'themes',
        component: ThemesListComponent
      }
    ]),
  ],
  declarations: [ThemesListComponent]
})
export class ThemeModule { }
