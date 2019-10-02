import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportsRoutingModule } from './import-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ImportsRoutingModule
  ],
  declarations: [ImportsRoutingModule.components]
})
export class ImportModule { }
