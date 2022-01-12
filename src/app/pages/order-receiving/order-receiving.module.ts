import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderReceivingRoutingModule } from "./order-receiving-routing.module";
import { OrderReceivingComponent } from "../order-receiving/order-receiving.component";
import { ListComponent } from "./list/list.component";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule } from "@angular/forms";
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { Ng2OrderModule } from "ng2-order-pipe";
import { AppRoutingModule } from "../../app-routing.module";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  declarations: [OrderReceivingComponent, ListComponent],
  imports: [
    CommonModule,
    OrderReceivingRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    Ng2OrderModule,
    NgxPaginationModule,
    NgxMaskModule,
    FormsModule,
    NbButtonGroupModule,
    NbSelectModule,
    NbIconModule,
    NbDatepickerModule,
    NbDateFnsDateModule,
    NbSpinnerModule,
  ],
})
export class OrderReceivingModule {}
