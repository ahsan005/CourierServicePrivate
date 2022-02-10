import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotificationService } from "./../../services/notification.service";
import { User } from "./../../models/user";

import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NbAuthResult } from "@nebular/auth";
import { FormsModule } from "@angular/forms";
import { UpperCasePipe } from "@angular/common";
import { SelectLocationComponent } from "../popup/select-location/select-location.component";
import { LOV } from "../../models/citiesLOV";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private service: AuthService,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) {}
  locationSelected;
  onLoginSpinner: boolean = false;
  LocationList = new Array<LOV>();
  private loginUser: User = new User();
  ngOnInit(): void {}
  onSubmit(loginForm: any): void {
    this.onLoginSpinner = true;
    console.log(loginForm);
    this.loginUser = new User(loginForm.value);
    console.log(this.loginUser);
    this.service.Login(this.loginUser).subscribe(
      (data) => {
        // json data
        //  = JSON.stringify(data)
        this.response = JSON.parse(JSON.stringify(data));
        //  console.log(response.Status,response.Message)
        console.log("Success: ", data);
        if (this.response.Status) {
          this.LocationList = this.response.locationLst;
          this.SelectLocationModal(this.response);
        } else {
          this.notificationService.showToast(
            "danger",
            this.response.Message,
            "",
            "top-right"
          );
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
  response;
  SelectLocationModal(response?) {
    debugger;
    const ref = this.modalService.open(SelectLocationComponent, {
      size: "md",
      backdrop: "static",
    });
    // this.orderBooking = item;
    console.log(this.LocationList);
    ref.componentInstance.LocationList = this.LocationList;
    ref.componentInstance.response = response;
    console.log(ref.result);
    debugger;
    ref.result.then((result) => {
      debugger;
      if (result) {
        this.onLoginSpinner = false;
        this.locationSelected = localStorage.getItem("LOCATIONID");
        // if (this.locationSelected != null) {
        //   this.SetLoginCredentials(response);
        // }
        if (
          localStorage.getItem("ROLENAME") == "Hospital Party" &&
          localStorage.getItem("ROLEID") == "5302"
        ) {
          console.log("isParty");
          // setTimeout(() => {
          //   this.router.navigate(["/user"]);
          // }, 300); //5s
          this.router.navigate(["/user"]);
        } else if (
          localStorage.getItem("ROLENAME") == "Admin" &&
          localStorage.getItem("ROLEID") == "5301"
        ) {
          console.log("isAdmin");
          // setTimeout(() => {
          //   this.router.navigate(["/admin"]);
          // }, 300); //5s
          this.router.navigate(["/admin"]);
        }
      } else {
        this.onLoginSpinner = false;
      }
    });

    // ref.componentInstance.citiesLOV = this.citiesLOV;
  }
}
