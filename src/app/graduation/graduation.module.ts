import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatModule } from '../mat/mat.module';
import { SharedModule } from '../shared/shared.module';

import { GraduationsListComponent } from './graduations-list/graduations-list.component';

import { GraduationRepositoryService } from '../shared/graduation-repository.service';
import { EditGraduationComponent } from './edit-graduation/edit-graduation.component';

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
        path: 'graduations',
        component: GraduationsListComponent
      },
    ]),
  ],
  declarations: [
    GraduationsListComponent,
    EditGraduationComponent
  ],
  entryComponents: [
    EditGraduationComponent,
  ],
  providers: [
    GraduationRepositoryService,
    { provide: 'GraduationRepository', useExisting: GraduationRepositoryService },
  ]
})
export class GraduationModule { }
