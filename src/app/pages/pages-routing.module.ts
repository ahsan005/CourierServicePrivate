import { SettingComponent } from './setting/setting.component';
import { PricingComponent } from './pricing/pricing.component';
import { ShipmentReportComponent } from './shipment-report/shipment-report.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { CustomerPaymentsComponent } from './customer-payments/customer-payments.component';
import { ActiveCustomersComponent } from './active-customers/active-customers.component';
import { PendingCustomersComponent } from './pending-customers/pending-customers.component';
import { AdminComponent } from './admin/admin.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'admin',
      component: AdminComponent,
    },

    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'pnd-customers',
      component: PendingCustomersComponent,
    },
    {
      path: 'active-customers',
      component: ActiveCustomersComponent,
    },
    {
      path: 'customer-payments',
      component: CustomerPaymentsComponent,
    },
    {
      path: 'order-report',
      component: OrderReportComponent,
    },
    {
      path: 'shipment-report',
      component: ShipmentReportComponent,
    },
    {
      path: 'pricing',
      component: PricingComponent,
    },
    {
      path: 'settings',
      component: SettingComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module')
        .then(m => m.ProfileModule),
    },
    {
      path: 'requests',
      loadChildren: () => import('./requests/requests.module')
        .then(m => m.RequestsModule),
    },
    {
      path: 'couriers',
      loadChildren: () => import('./couriers/couriers.module')
        .then(m => m.CouriersModule),
    },
    {
      path: 'cities',
      loadChildren: () => import('./cities/cities.module')
        .then(m => m.CitiesModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'admin',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
