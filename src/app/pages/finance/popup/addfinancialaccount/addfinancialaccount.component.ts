import { UserService } from './../../../../services/user.service';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { Country } from "../../../../models/country";
import { SharedService } from "../../../../services/shared.service";
import { NotificationService } from "../../../../services/notification.service";
import { FinanacialAccount } from "../../../../models/FinancialAccount";

@Component({
  selector: 'ngx-addfinancialaccount',
  templateUrl: './addfinancialaccount.component.html',
  styleUrls: ['./addfinancialaccount.component.scss']
})
export class AddfinancialaccountComponent implements OnInit {

  // selectedCountryID;
  // selectedProvinceID;
  // cityFormModel
  FinancialAccount = new FinanacialAccount();
  // cityFormModel
  // showCityField: boolean = false;
  // showProvinceField: boolean = false;
  // countriesLOV = new Array<LOV>();
  // provincesLOV = new Array<LOV>();

  constructor(
    public modal: NgbActiveModal,
    private sharedService: SharedService,
    private userService:UserService,
    private notificationService: NotificationService
  ) {
    // this.initialize();
  }

  ngOnInit(): void {
    // this.initialize();
  }

  // initialize() {
  //   this.sharedService.GetAllCountries().subscribe((data) => {
  //     var response = JSON.parse(JSON.stringify(data));
  //     this.countriesLOV = response.Data;
  //   });
  // }

  // loadProvinces() {
  //   console.log(this.selectedCountryID);
  //   this.sharedService
  //     .GetProvincesByCountry(this.selectedCountryID)
  //     .subscribe((data) => {
  //       var response = JSON.parse(JSON.stringify(data));
  //       this.provincesLOV = response.Data;
  //       console.log(this.provincesLOV);
  //       console.log(response);
  //       if (response.Status) this.showProvinceField = true;
  //     });
  // }

  // countryToAdd = new Country();
  spinner: boolean = false;
  addFinancialAccount() {
    // if(this.FinancialAccountForm.invalid)
    this.spinner = true;

    this.FinancialAccount.CreatedById = parseInt(
      localStorage.getItem("USERID")
    );

    // Calling Service
    this.userService.AddFinancialAccount(this.FinancialAccount).subscribe((data) => {
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
