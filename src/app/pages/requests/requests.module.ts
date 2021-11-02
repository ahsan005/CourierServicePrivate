import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { BookedOrdersComponent } from './booked-orders/booked-orders.component';
import { ItemsReceivedLahoreComponent } from './items-received-lahore/items-received-lahore.component';
import { DeliveryRunSheetComponent } from './delivery-run-sheet/delivery-run-sheet.component';
import { ViewOrderAssignmentComponent } from './view-order-assignment/view-order-assignment.component';
import { ItemsReceivedOutstationsComponent } from './items-received-outstations/items-received-outstations.component';
import { DispatchOrdersComponent } from './dispatch-orders/dispatch-orders.component';
import { AssignedComponent } from './assigned/assigned.component';
import { DeliveredComponent } from './delivered/delivered.component';
import { ReturnedComponent } from './returned/returned.component';
import { CancelledNotReceivedComponent } from './cancelled-not-received/cancelled-not-received.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';


@NgModule({
  declarations: [
    RequestsComponent,
    BookedOrdersComponent,
    ItemsReceivedLahoreComponent,
    DeliveryRunSheetComponent,
    ViewOrderAssignmentComponent,
    ItemsReceivedOutstationsComponent,
    DispatchOrdersComponent,
    AssignedComponent,
    DeliveredComponent,
    ReturnedComponent,
    CancelledNotReceivedComponent,
    PendingOrdersComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule
  ]
})
export class RequestsModule { }
