import { LOV } from "./../../../../models/citiesLOV";
import { UserService } from "./../../../../services/user.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { Country } from "../../../../models/country";
import { SharedService } from "../../../../services/shared.service";
import { NotificationService } from "../../../../services/notification.service";
import { FinanacialAccount } from "../../../../models/FinancialAccount";

@Component({
  selector: "ngx-addfinancialaccount",
  templateUrl: "./addfinancialaccount.component.html",
  styleUrls: ["./addfinancialaccount.component.scss"],
})
export class AddfinancialaccountComponent implements OnInit {
  // selectedCountryID;
  // selectedProvinceID;
  // cityFormModel
  financialAccountToEdit;
  SubControlAccountLOVForModal;
  AccountSubTypeLOVForModal;
  FinancialAccount = new FinanacialAccount();
  // cityFormModel
  // showCityField: boolean = false;
  // showProvinceField: boolean = false;
  // countriesLOV = new Array<LOV>();
  // provincesLOV = new Array<LOV>();

  constructor(
    public modal: NgbActiveModal,
    private sharedService: SharedService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    // this.initialize();
  }

  ngOnInit(): void {
    if (this.financialAccountToEdit != null) {
      this.InitializeForEdit();
    }
  }
  AccountSubTypeLOV = new Array<LOV>();
  SubControlAccountLOV = new Array<LOV>();
  // GetLOVs() {
  //   this.userService.GetAccountSubTypeLOV().subscribe((data) => {
  //     var response = JSON.parse(JSON.stringify(data));
  //     if (response.Status) {
  //       this.AccountSubTypeLOV = response.Data;
  //       console.log(this.AccountSubTypeLOV);
  //     }
  //   });
  //   this.userService.GetSubControlAccountLOV().subscribe((data) => {
  //     var response = JSON.parse(JSON.stringify(data));
  //     if (response.Status) {
  //       this.SubControlAccountLOV = response.Data;
  //       console.log(this.SubControlAccountLOV);
  //     }
  //   });
  // }
  InitializeForEdit() {
    if (this.financialAccountToEdit != null) {
      this.FinancialAccount = this.financialAccountToEdit;
      console.log(this.FinancialAccount);
    }
  }
  editFinancialAccount() {
    this.spinner = true;

    this.FinancialAccount.AlteredById = parseInt(
      localStorage.getItem("USERID")
    );

    // Calling Service
    this.userService
      .AddFinancialAccount(this.FinancialAccount)
      .subscribe((data) => {
        var response = JSON.parse(JSON.stringify(data));
        if (response.Status) {
          this.spinner = false;
          this.notificationService.showToast(
            "success",
            response.Message,
            "",
            "top-right"
          );
          this.sharedService.filter("Added New FinancialAccount");
          this.modal.close();
        } else {
          this.spinner = false;
          this.notificationService.showToast(
            "danger",
            response.Message,
            "",
            "top-right"
          );
          console.warn(response.Message);
        }
      });
  }
  spinner: boolean = false;
  addFinancialAccount() {
    // if(this.FinancialAccountForm.invalid)
    this.spinner = true;

    this.FinancialAccount.CreatedById = parseInt(
      localStorage.getItem("USERID")
    );

    // Calling Service
    this.userService
      .AddFinancialAccount(this.FinancialAccount)
      .subscribe((data) => {
        var response = JSON.parse(JSON.stringify(data));
        if (response.Status) {
          this.spinner = false;
          this.notificationService.showToast(
            "success",
            response.Message,
            "",
            "top-right"
          );
          this.sharedService.filter("Added New FinancialAccount");
          this.modal.close();
        } else {
          this.spinner = false;
          this.notificationService.showToast(
            "danger",
            response.Message,
            "",
            "top-right"
          );
          console.warn(response.Message);
        }
      });
    // Calling Service
  }
}
