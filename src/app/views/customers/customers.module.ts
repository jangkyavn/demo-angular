import { NgModule } from '@angular/core';
import {NgxMaskModule, IConfig} from 'ngx-mask';

import { SharedModule } from '@shared/shared.module';

import { CustomersRoutingModule } from './customers-routing.module';

import { UserAddEditModalComponent } from './user-add-edit-modal/user-add-edit-modal.component';

@NgModule({
  imports: [
    SharedModule,
    CustomersRoutingModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [CustomersRoutingModule.components, UserAddEditModalComponent],
  entryComponents: [UserAddEditModalComponent]
})
export class CustomersModule { }
