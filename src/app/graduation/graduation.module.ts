import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GraduationsListComponent } from './graduations-list/graduations-list.component';

@NgModule({
  imports: [
    CommonModule,

    // Routes
    RouterModule.forRoot([
      {
        path: 'graduations',
        component: GraduationsListComponent
      },
    ]),
  ],
  declarations: [GraduationsListComponent]
})
export class GraduationModule { }
