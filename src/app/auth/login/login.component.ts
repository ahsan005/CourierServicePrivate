import { User } from './../../models/user';

import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NbAuthResult } from '@nebular/auth';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';

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
    this.service.Login(this.loginUser).subscribe(
      (data) => {
        // json data

        //  = JSON.stringify(data)
        var response = JSON.parse(JSON.stringify(data));
        //  console.log(response.Status,response.Message)
        console.log("Success: ", data);
        if (response.Status) {
          console.log("Successfully Loggedin");
          localStorage.setItem("ISLOGGEDIN", response.Status);
          localStorage.setItem("LOGINNAME", response.Data.LoginName);
          localStorage.setItem("USERID", response.Data.UserId);
          localStorage.setItem("USERNAME", response.Data.UserName);
          localStorage.setItem("ROLEID", response.Data.RoleId);
          localStorage.setItem("ROLENAME", response.roleName);

          console.log(response.Data);

          if(response.roleName == "Hospital Party" && response.Data.RoleId == 4603)
          {
            this.router.navigate(["/user"]);
          }
          else if(response.roleName == "Admin" && response.Data.RoleId == 4601)
          {
            this.router.navigate(["/admin"]);
          }
          // this.router.navigate(["/user"]);
        }
         else {
          alert("This wont work");
        }
      }
      // (error) => {
      //   this.handleError(error);
      // }
    );

      // const redirect = '/user'
      // if (redirect) {
      //   setTimeout(() => {
      //     return this.router.navigateByUrl(redirect);
      //   }, 200);
      // }
      // this.cd.detectChanges();
    };
  }


