import { ThemeModule } from "./../@theme/theme.module";


import { RouterModule } from "@angular/router"; // we also need angular router for Nebular to function properly
import {
  NbSidebarModule,
  NbLayoutModule,
  NbButtonModule,
  NbThemeModule,
  NbMenuModule,
} from "@nebular/theme";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserclientRoutingModule } from "./userclient-routing.module";
import { UserclientComponent } from "./userclient.component";
import { HomeModule } from "./home/home.module";

@NgModule({
  declarations: [UserclientComponent],
  imports: [
    CommonModule,
    UserclientRoutingModule,

    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    HomeModule,
    NbThemeModule,
    ThemeModule,
    NbMenuModule,

  ],
})
export class UserclientModule {}
