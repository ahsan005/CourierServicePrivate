import { ViewOrderAssignmentComponent } from "./view-order-assignment/view-order-assignment.component";

import { ItemsReceivedOutstationsComponent } from "./items-received-outstations/items-received-outstations.component";
import { ItemsReceivedLahoreComponent } from "./items-received-lahore/items-received-lahore.component";
import { DispatchOrdersComponent } from "./dispatch-orders/dispatch-orders.component";
import { DeliveryRunSheetComponent } from "./delivery-run-sheet/delivery-run-sheet.component";

import { BookedOrdersComponent } from "./booked-orders/booked-orders.component";
import { RequestsComponent } from "./requests.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: RequestsComponent,
    children: [
      {
        path: "booked-orders",
        component: BookedOrdersComponent,
      },

      {
        path: "delivery-run",
        component: DeliveryRunSheetComponent,
      },
      {
        path: "dispatch-orders",
        component: DispatchOrdersComponent,
      },
      {
        path: "items-received-lhr",
        component: ItemsReceivedLahoreComponent,
      },
      {
        path: "items-received-out",
        component: ItemsReceivedOutstationsComponent,
      },

      {
        path: "order-assignment",
        component: ViewOrderAssignmentComponent,
      },

      {
        path: "order-assignment",
        component: ViewOrderAssignmentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule {}
