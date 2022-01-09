import {
  BarcodeGeneratorAllModule,
  QRCodeGeneratorAllModule,
  DataMatrixGeneratorAllModule,
} from "@syncfusion/ej2-angular-barcode-generator";
import { NgxPaginationModule } from "ngx-pagination";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminModule } from "./admin/admin.module";
import { NgModule } from "@angular/core";
import {
  NbButton,
  NbButtonModule,
  NbMenuModule,
  NbIconModule,
  NbCardModule,
  NbButtonGroupModule,
  NbInputModule,
  NbSelectModule,
  NbDatepickerModule,
  NbSpinnerModule,
  NbCheckboxModule,
} from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";

import { PagesRoutingModule } from "./pages-routing.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { PendingCustomersComponent } from "./pending-customers/pending-customers.component";
import { ActiveCustomersComponent } from "./active-customers/active-customers.component";

import { PricingComponent } from "./pricing/pricing.component";
import { SettingComponent } from "./setting/setting.component";
import { RouterModule } from "@angular/router";
import { Ng2OrderModule } from "ng2-order-pipe";
import { NbEvaIconsModule } from "@nebular/eva-icons";

import { NbDateFnsDateModule } from "@nebular/date-fns";
import { AppConfigurationComponent } from "./setting/app-configuration/app-configuration.component";
import { GeneralComponent } from "./setting/general/general.component";
import { NgxMaskModule } from "ngx-mask";
import { FinanceComponent } from "./finance/finance.component";

import { AddfinancialaccountComponent } from "./finance/popup/addfinancialaccount/addfinancialaccount.component";

@NgModule({
  imports: [
    RouterModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    AdminModule,
    FormsModule,
    NbButtonModule,
    NgxPaginationModule,
    NbSelectModule,
    NbDatepickerModule,
    Ng2OrderModule,
    NbEvaIconsModule,
    NbIconModule,
    NbCardModule,
    NbButtonGroupModule,
    NbInputModule,
    NbDateFnsDateModule,
    BarcodeGeneratorAllModule,
    QRCodeGeneratorAllModule,
    DataMatrixGeneratorAllModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    NbSelectModule,
    NbCheckboxModule,
    NgxMaskModule,
  ],
  declarations: [
    PagesComponent,
    PendingCustomersComponent,
    ActiveCustomersComponent,

    PricingComponent,
    SettingComponent,
    AppConfigurationComponent,
    GeneralComponent,
    FinanceComponent,
    AddfinancialaccountComponent,
  ],
})
export class PagesModule {}
