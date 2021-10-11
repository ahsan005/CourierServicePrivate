
/**
 *
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,


} from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './user/about/about.component';

import { RegisterComponent } from './user/register/register.component';
import { TrackingComponent } from './user/tracking/tracking.component';
import { ContactComponent } from './user/contact/contact.component';
import { LoginComponent } from './user/login/login.component';
import { PrivacyComponent } from './user/privacy/privacy.component';
import { TermsComponent } from './user/terms/terms.component';

@NgModule({
  declarations: [AppComponent, UserComponent, AboutComponent,RegisterComponent, TrackingComponent, ContactComponent, LoginComponent, PrivacyComponent, TermsComponent],
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
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NgbModule,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
