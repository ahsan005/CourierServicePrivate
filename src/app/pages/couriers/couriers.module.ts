import { NbButtonGroupModule, NbButtonModule, NbInputModule, NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouriersRoutingModule } from './couriers-routing.module';
import { CouriersComponent } from './couriers.component';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { Ng2OrderModule } from 'ng2-order-pipe';


@NgModule({
  declarations: [
    CouriersComponent,

    ListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    CouriersRoutingModule,
    NgxPaginationModule,
    Ng2OrderModule,
    FormsModule,
    NbButtonGroupModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule
  ]
})
export class CouriersModule { }
