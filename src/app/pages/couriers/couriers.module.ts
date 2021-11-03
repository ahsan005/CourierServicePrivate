import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouriersRoutingModule } from './couriers-routing.module';
import { CouriersComponent } from './couriers.component';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    CouriersComponent,

    ListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    CouriersRoutingModule
  ]
})
export class CouriersModule { }
