import { NgxPaginationModule } from 'ngx-pagination';

import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { NbButton, NbButtonModule, NbMenuModule, NbIconModule, NbCardModule, NbButtonGroupModule, NbInputModule, NbSelectModule, NbDatepickerModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PendingCustomersComponent } from './pending-customers/pending-customers.component';
import { ActiveCustomersComponent } from './active-customers/active-customers.component';
import { CustomerPaymentsComponent } from './customer-payments/customer-payments.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { ShipmentReportComponent } from './shipment-report/shipment-report.component';
import { PricingComponent } from './pricing/pricing.component';
import { SettingComponent } from './setting/setting.component';

import { Ng2OrderModule } from 'ng2-order-pipe';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AddPaymentComponent } from './customer-payments/add-payment/add-payment.component';
import { NbDateFnsDateModule } from '@nebular/date-fns';

@NgModule({
  imports: [
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
    AddPaymentComponent,
  ],
})
export class PagesModule {
}
