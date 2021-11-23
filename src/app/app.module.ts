
import { AuthModule } from './auth/auth.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HomeComponent } from "./user/home/home.component";
import { DataTablesModule } from "angular-datatables";
import { Ng2OrderModule } from 'ng2-order-pipe';

/**
 *
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { ThemeModule } from "./@theme/theme.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import {
  NbButtonModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from "@nebular/theme";
import { NgbButtonsModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserComponent } from "./user/user.component";
import { AboutComponent } from "./user/about/about.component";


import { TrackingComponent } from "./user/tracking/tracking.component";
import { ContactComponent } from "./user/contact/contact.component";

import { PrivacyComponent } from "./user/privacy/privacy.component";
import { TermsComponent } from "./user/terms/terms.component";


import { NgxPaginationModule } from 'ngx-pagination';
import {NbDateFnsDateModule} from '@nebular/date-fns'


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutComponent,

    TrackingComponent,
    ContactComponent,

    PrivacyComponent,
    TermsComponent,
    HomeComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),

    NbChatModule.forRoot({
      messageGoogleMapKey: "AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY",
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NgbModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbButtonsModule,
    AuthModule,
    NgxPaginationModule,
    DataTablesModule,
    Ng2OrderModule,
    NbDateFnsDateModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
