import { NbCardModule } from '@nebular/theme';
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
    NbCardModule
  ]
})
export class AdminModule { }
