import { NbMenuModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { ThemeModule } from './../@theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserareaRoutingModule } from './userarea-routing.module';
import { UdashboardComponent } from './udashboard/udashboard.component';
import { UserareaComponent } from './userarea.component';
import { StatusCardComponent } from './udashboard/status-card/status-card.component';
import { BookingformComponent } from './bookingform/bookingform.component';
import { BulkBookingComponent } from './bulk-booking/bulk-booking.component';
import { RequestsComponent } from './requests/requests.component';
// import { ThemeModule } from '../@theme/theme.module';


@NgModule({
  declarations: [
    UdashboardComponent,
    UserareaComponent,
    StatusCardComponent,
    BookingformComponent,
    BulkBookingComponent,
    RequestsComponent
  ],
  imports: [
    CommonModule,
    UserareaRoutingModule,
    ThemeModule,
    NbIconModule,
    NbMenuModule,
    NbCardModule
  ]
})
export class UserareaModule { }
