import { NotificationService } from "./../../services/notification.service";
import { User } from "./../../models/user";

import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NbAuthResult } from "@nebular/auth";
import { FormsModule } from "@angular/forms";
import { UpperCasePipe } from "@angular/common";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private service: AuthService,
    private notificationService: NotificationService
  ) {}
  private loginUser: User = new User();
  ngOnInit(): void {}
  onSubmit(loginForm: any): void {
    console.log(loginForm);
    this.loginUser = new User(loginForm.value);
    console.log(this.loginUser);
    this.service.Login(this.loginUser).subscribe(
      (data) => {
        // json data

        //  = JSON.stringify(data)
        var response = JSON.parse(JSON.stringify(data));
        //  console.log(response.Status,response.Message)
        console.log("Success: ", data);
        if (response.Status) {
          this.notificationService.showToast('success',response.Message,'','top-right');
          localStorage.setItem("ISLOGGEDIN", response.Status);
          localStorage.setItem("LOGINNAME", response.Data.LoginName);
          localStorage.setItem("USERID", response.Data.UserId);
          localStorage.setItem("USERNAME", response.Data.UserName);
          localStorage.setItem("ROLEID", response.Data.RoleId);
          localStorage.setItem("ROLENAME", response.roleName);
          localStorage.setItem("LOCATIONID", response.Data.PartyLocationId);

          console.log(response.Data);

          if (
            localStorage.getItem("ROLENAME") == "Hospital Party" &&
            localStorage.getItem("ROLEID") == "4602"
          ) {
            console.log("isParty");
            setTimeout(() => {
              this.router.navigate(["/user"]);;
          }, 300);  //5s

          } else if (
            localStorage.getItem("ROLENAME") == "Admin" &&
            localStorage.getItem("ROLEID") == "4601"
          ) {
            console.log("isAdmin");
            setTimeout(() => {
              this.router.navigate(["/admin"]);;
          }, 300);  //5s

          }
          // this.router.navigate(["/user"]);
        }
        else {
          this.notificationService.showToast('danger',response.Message,'','top-right');
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
  }
}
