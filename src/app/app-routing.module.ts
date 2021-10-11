import { TermsComponent } from './user/terms/terms.component';
import { PrivacyComponent } from './user/privacy/privacy.component';
import { LoginComponent } from './user/login/login.component';
import { ContactComponent } from './user/contact/contact.component';
import { RegisterComponent } from './user/register/register.component';

import { AboutComponent } from './user/about/about.component';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './user/home/home.component';
import { TrackingComponent } from './user/tracking/tracking.component';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'user',
    component:UserComponent,

    children:[
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'register',
        component:RegisterComponent
      },
      {
        path:'about',
        component:AboutComponent
      },
      {
        path:'contact',
        component:ContactComponent
      },
      {
        path:'tracking',
        component:TrackingComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'privacy',
        component:PrivacyComponent
      },
      {
        path:'terms',
        component:TermsComponent
      },

    ]
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', redirectTo: 'user' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
