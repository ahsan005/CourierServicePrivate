import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { FormsModule } from '@angular/forms';
import { NbCardModule, NbButtonGroupModule, NbButton, NbButtonModule, NbInputModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { StatusCardsComponent } from './status-cards/status-cards.component';
import { OrderPieComponent } from './order-pie/order-pie.component';

import { RecentBookedOrdersComponent } from './recent-booked-orders/recent-booked-orders.component';




@NgModule({
  declarations: [
    AdminComponent,
    StatusCardsComponent,
    OrderPieComponent,
    RecentBookedOrdersComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule,
    NbCardModule,
    NbButtonGroupModule,
    FormsModule,
    NbButtonModule,
    NbInputModule,
    Ng2SmartTableModule,
    NgxPaginationModule

  ]
})
export class AdminModule { }
