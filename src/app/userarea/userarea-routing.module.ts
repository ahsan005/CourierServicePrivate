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
