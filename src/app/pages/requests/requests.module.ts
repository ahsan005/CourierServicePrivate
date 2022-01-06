import { NgxMaskModule } from "ngx-mask";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import {
  NbSelectModule,
  NbDatepickerModule,
  NbButtonGroupModule,
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RequestsRoutingModule } from "./requests-routing.module";
import { RequestsComponent } from "./requests.component";
import { BookedOrdersComponent } from "./booked-orders/booked-orders.component";
import { ItemsReceivedLahoreComponent } from "./items-received-lahore/items-received-lahore.component";
import { DeliveryRunSheetComponent } from "./delivery-run-sheet/delivery-run-sheet.component";
import { ViewOrderAssignmentComponent } from "./view-order-assignment/view-order-assignment.component";
import { ItemsReceivedOutstationsComponent } from "./items-received-outstations/items-received-outstations.component";
import { DispatchOrdersComponent } from "./dispatch-orders/dispatch-orders.component";
import { AssignedComponent } from "./assigned/assigned.component";
import { DeliveredComponent } from "./delivered/delivered.component";
import { ReturnedComponent } from "./returned/returned.component";
import { CancelledNotReceivedComponent } from "./cancelled-not-received/cancelled-not-received.component";
import { PendingOrdersComponent } from "./pending-orders/pending-orders.component";
import { DataTablesModule } from "angular-datatables";
import { Ng2OrderModule } from "ng2-order-pipe";
import { NbDateFnsDateModule } from "@nebular/date-fns";
import { EditRequestComponent } from "./popup/edit-request/edit-request.component";

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
    PendingOrdersComponent,
    EditRequestComponent,
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    NbSelectModule,
    NbDatepickerModule,
    NbButtonGroupModule,
    NbInputModule,
    NbButtonModule,
    NgxPaginationModule,
    NbCardModule,
    FormsModule,
    DataTablesModule,
    Ng2OrderModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonGroupModule,
    ReactiveFormsModule,
    NbDateFnsDateModule,
    NbSpinnerModule,
    NgMultiSelectDropDownModule,
    NgxMaskModule,
  ],
})
export class RequestsModule {}
