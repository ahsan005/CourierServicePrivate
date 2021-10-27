import { MultipleProfilesComponent } from './multiple-profiles/multiple-profiles.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { TrackDeliveriesComponent } from './track-deliveries/track-deliveries.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { PaymentsComponent } from './payments/payments.component';
import { BookingSheetComponent } from './booking-sheet/booking-sheet.component';
import { BookingformComponent } from "./bookingform/bookingform.component";
import { UdashboardComponent } from "./udashboard/udashboard.component";
import { UserareaComponent } from "./userarea.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BulkBookingComponent } from "./bulk-booking/bulk-booking.component";
import { RequestsComponent } from "./requests/requests.component";

const routes: Routes = [
  {
    path: "",
    component: UserareaComponent,
    children: [
      {
        path: "dashboard",
        component: UdashboardComponent,

      },
      {
        path: "bform",
        component: BookingformComponent,
      },
      {
        path: "bbooking",
        component: BulkBookingComponent,
      },
      {
        path: "requests",
        component: RequestsComponent,
      }
      ,
      {
        path: "bsheet",
        component: BookingSheetComponent,
      }
      ,
      {
        path: "payments",
        component: PaymentsComponent,
      }
      ,
      {
        path: "order-report",
        component: OrderReportComponent,
      }
      ,
      {
        path: "track-deliveries",
        component: TrackDeliveriesComponent,
      }
      ,
      {
        path: "suggestions",
        component: SuggestionsComponent,
      }
      ,
      {
        path: "edit-profile",
        component: EditProfileComponent,
      }
      ,
      {
        path: "multiple-profiles",
        component: MultipleProfilesComponent,
      }
      ,
      {
        path: "change-password",
        component: ChangePasswordComponent,
      }
      ,
      {
        path: '',
        redirectTo: "dashboard",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserareaRoutingModule {}
