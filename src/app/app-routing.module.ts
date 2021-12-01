import { AuthGuard } from './_guards/auth.guard';
import { TermsComponent } from "./user/terms/terms.component";
import { PrivacyComponent } from "./user/privacy/privacy.component";

import { ContactComponent } from "./user/contact/contact.component";


import { AboutComponent } from "./user/about/about.component";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
// import {
//   NbAuthComponent,
//   NbLoginComponent,
//   NbLogoutComponent,
//   NbRegisterComponent,
//   NbRequestPasswordComponent,
//   NbResetPasswordComponent,
// } from "@nebular/auth";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./user/home/home.component";
import { TrackingComponent } from "./user/tracking/tracking.component";

export const routes: Routes = [

  {
    path: "admin",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
      canActivate:[AuthGuard],

      data: {
        role: 'ADMIN'
   }

  },
  {
    path: "user",
    loadChildren: () =>
      import("./userarea/userarea.module").then((m) => m.UserareaModule),
      canActivate:[AuthGuard],

      data: {
        role: 'HOSPITAL PARTY'
   }

  },
  {
    path: "home",
    component: UserComponent,

    children: [
      {
        path: "",
        component: HomeComponent,
      },

      {
        path: "about",
        component: AboutComponent,
      },
      {
        path: "contact",
        component: ContactComponent,
      },
      {
        path: "tracking",
        component: TrackingComponent,
      },

      {
        path: "privacy",
        component: PrivacyComponent,
      },
      {
        path: "terms",
        component: TermsComponent,
      },
    ],
  },
  {
    path:'auth',
    loadChildren: () =>
    import("./auth/auth.module").then((m) => m.AuthModule),
    // children: [
    //   {
    //     path: "",
    //     component: NbLoginComponent,
    //   },
    //   {
    //     path: "login",
    //     component: NbLoginComponent,
    //   },
    //   {
    //     path: "register",
    //     component: RegisterComponent,
    //   },
    //   {
    //     path: "logout",
    //     component: NbLogoutComponent,
    //   },
    //   {
    //     path: "request-password",
    //     component: NbRequestPasswordComponent,
    //   },
    //   {
    //     path: "reset-password",
    //     component: NbResetPasswordComponent,
    //   },
    // ],
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
