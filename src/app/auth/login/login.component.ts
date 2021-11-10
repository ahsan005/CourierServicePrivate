import { User } from './../../models/user';

import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NbAuthResult } from '@nebular/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private service:AuthService) { }
private loginUser:User = new User();
  ngOnInit(): void {
  }
  onSubmit(loginForm:any): void {

console.log(loginForm)
this.loginUser= new User(loginForm.value)
console.log(this.loginUser)
    this.service.Login(this.loginUser)

      // const redirect = '/user'
      // if (redirect) {
      //   setTimeout(() => {
      //     return this.router.navigateByUrl(redirect);
      //   }, 200);
      // }
      // this.cd.detectChanges();
    };
  }


