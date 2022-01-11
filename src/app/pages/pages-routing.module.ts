import { SettingComponent } from "./setting/setting.component";
import { PricingComponent } from "./pricing/pricing.component";


import { ActiveCustomersComponent } from "./active-customers/active-customers.component";
import { PendingCustomersComponent } from "./pending-customers/pending-customers.component";
import { AdminComponent } from "./admin/admin.component";

import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";

import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { GeneralComponent } from "./setting/general/general.component";
import { AppConfigurationComponent } from "./setting/app-configuration/app-configuration.component";
import { FinanceComponent } from "./finance/finance.component";

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
        path: "finance",
        component: FinanceComponent,
        // children: [
        //   {
        //     path: "add",
        //     component: AddAccountComponent,
        //   },
        // ],
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

      // {
      //   path: "add-payment",
      //   component: AddPaymentComponent,
      // },

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
        path: "Destinations",
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
        path: "receiving",
        loadChildren: () =>
          import("./order-receiving/order-receiving.module").then((m) => m.OrderReceivingModule),
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
