import { LoginComponent } from './../auth/login/login.component';
import { ComponentFixture } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent, NbLoginComponent } from '@nebular/auth';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:'',
    component:NbAuthComponent,
    children:[
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
