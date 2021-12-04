import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbMenuModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbButtonModule, NbDatepickerModule, NbButtonGroupModule, NbSpinnerModule } from '@nebular/theme';
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
import { BookingSheetComponent } from './booking-sheet/booking-sheet.component';
import { PaymentsComponent } from './payments/payments.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { TrackDeliveriesComponent } from './track-deliveries/track-deliveries.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MultipleProfilesComponent } from './multiple-profiles/multiple-profiles.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditComponent } from './multiple-profiles/edit/edit.component';
import { AddProfileComponent } from './multiple-profiles/add-profile/add-profile.component';
import { EditRequestComponent } from './requests/popup/edit-request/edit-request.component';
// import { ThemeModule } from '../@theme/theme.module';


@NgModule({
  declarations: [
    UdashboardComponent,
    UserareaComponent,
    StatusCardComponent,
    BookingformComponent,
    BulkBookingComponent,
    RequestsComponent,
    BookingSheetComponent,
    PaymentsComponent,
    OrderReportComponent,
    TrackDeliveriesComponent,
    SuggestionsComponent,
    EditProfileComponent,
    MultipleProfilesComponent,
    ChangePasswordComponent,
    EditComponent,
    AddProfileComponent,
    EditRequestComponent,
  ],
  imports: [
    CommonModule,
    UserareaRoutingModule,
    ThemeModule,
    NbIconModule,
    NbMenuModule,
    NbCardModule,
    RouterModule,
    FormsModule,
    NbSelectModule,
    NbButtonModule,
    NbDatepickerModule,
    NbInputModule,
    ReactiveFormsModule,
    NbButtonGroupModule,
    NgxPaginationModule,
    NbDateFnsDateModule,
    NbSpinnerModule

  ]
})
export class UserareaModule { }
