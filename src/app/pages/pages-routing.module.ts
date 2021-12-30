import { AddPaymentComponent } from "./customer-payments/add-payment/add-payment.component";
import { SettingComponent } from "./setting/setting.component";
import { PricingComponent } from "./pricing/pricing.component";
import { ShipmentReportComponent } from "./shipment-report/shipment-report.component";
import { OrderReportComponent } from "./order-report/order-report.component";
import { CustomerPaymentsComponent } from "./customer-payments/customer-payments.component";
import { ActiveCustomersComponent } from "./active-customers/active-customers.component";
import { PendingCustomersComponent } from "./pending-customers/pending-customers.component";
import { AdminComponent } from "./admin/admin.component";

import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";

import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { GeneralComponent } from "./setting/general/general.component";
import { AppConfigurationComponent } from "./setting/app-configuration/app-configuration.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "admin",
        component: AdminComponent,
      },

      {
        path: "pnd-customers",
        component: PendingCustomersComponent,
      },
      {
        path: "active-customers",
        component: ActiveCustomersComponent,
      },
      {
        path: "customer-payments",
        component: CustomerPaymentsComponent,
        children: [
          {
            path: "add",
            component: AddPaymentComponent,
          },
        ],
      },
      {
        path: "order-report",
        component: OrderReportComponent,
      },
      {
        path: "shipment-report",
        component: ShipmentReportComponent,
      },
      {
        path: "pricing",
        component: PricingComponent,
      },
      // {
      //   path: "settings",
      //   component: SettingComponent,
      //   children:[

      //   ]
      // }, {
      {
        path: "general-config",
        component: GeneralComponent,
      },
      {
        path: "app-config",
        component: AppConfigurationComponent,
      },

      {
        path: "add-payment",
        component: AddPaymentComponent,
      },

      {
        path: "profile",
        loadChildren: () =>
          import("./profile/profile.module").then((m) => m.ProfileModule),
      },
      {
        path: "requests",
        loadChildren: () =>
          import("./requests/requests.module").then((m) => m.RequestsModule),
      },
      {
        path: "couriers",
        loadChildren: () =>
          import("./couriers/couriers.module").then((m) => m.CouriersModule),
      },
      {
        path: "cities",
        loadChildren: () =>
          import("./cities/cities.module").then((m) => m.CitiesModule),
      },

      {
        path: "miscellaneous",
        loadChildren: () =>
          import("./miscellaneous/miscellaneous.module").then(
            (m) => m.MiscellaneousModule
          ),
      },
      {
        path: "",
        redirectTo: "admin",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
