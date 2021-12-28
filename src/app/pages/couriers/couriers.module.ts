import { ReactiveFormsModule } from '@angular/forms';
import { NbButtonGroupModule, NbButtonModule, NbInputModule, NbCardModule, NbDatepicker, NbDatepickerModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouriersRoutingModule } from './couriers-routing.module';
import { CouriersComponent } from './couriers.component';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { EditEmployeeComponent } from './popup/edit-employee/edit-employee.component';


@NgModule({
  declarations: [
    CouriersComponent,

    ListComponent,
    AddComponent,
    EditEmployeeComponent
  ],
  imports: [
    CommonModule,
    CouriersRoutingModule,
    NgxPaginationModule,
    Ng2OrderModule,
    FormsModule,
    NbIconModule,
    NbEvaIconsModule,
    NbButtonGroupModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NgbDatepickerModule,
    NbSpinnerModule
  ]
})
export class CouriersModule { }
