import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from './forms/forms.module';
import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { NbButton, NbButtonModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PendingCustomersComponent } from './pending-customers/pending-customers.component';
import { ActiveCustomersComponent } from './active-customers/active-customers.component';
import { CustomerPaymentsComponent } from './customer-payments/customer-payments.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { ShipmentReportComponent } from './shipment-report/shipment-report.component';
import { PricingComponent } from './pricing/pricing.component';
import { SettingComponent } from './setting/setting.component';
import { DataTablesModule } from "angular-datatables";
import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    AdminModule,
    FormsModule,
    NbButtonModule,
    NgxPaginationModule,
    DataTablesModule,
    Ng2OrderModule
  ],
  declarations: [
    PagesComponent,
    PendingCustomersComponent,
    ActiveCustomersComponent,
    CustomerPaymentsComponent,
    OrderReportComponent,
    ShipmentReportComponent,
    PricingComponent,
    SettingComponent,
  ],
})
export class PagesModule {
}
