import { NbButton, NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from './../forms/forms.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule
  ]
})
export class ProfileModule { }
