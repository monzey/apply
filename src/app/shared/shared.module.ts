import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatModule } from '../mat/mat.module';

import { EmptyComponent } from './empty/empty.component';

@NgModule({
  imports: [
    CommonModule,

    // Deps
    MatModule,
  ],
  declarations: [
    EmptyComponent
  ],
  exports: [
    EmptyComponent
  ]
})
export class SharedModule { }
