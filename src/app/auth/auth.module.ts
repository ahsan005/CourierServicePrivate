import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NbAuthModule } from '@nebular/auth';
import { NbAlertModule, NbInputModule, NbButtonModule, NbCheckboxComponent, NbCheckboxModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [

    RegisterComponent,
     LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule
  ]
})
export class AuthModule { }
