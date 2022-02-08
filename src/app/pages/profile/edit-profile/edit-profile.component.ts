import { NotificationService } from "./../../../services/notification.service";
import { City } from "./../../../models/City";
import { Customer } from "./../../../models/customer";
import { CustomerInfo } from "./../../../models/CustomerInfo";
import { SharedService } from "./../../../services/shared.service";
import { LOV } from "./../../../models/citiesLOV";
import { FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private notificationService: NotificationService
  ) {
    this.getLOVs();
  }
  customerInfo: Customer;
  ngOnInit(): void {}

  citiesLOV = new Array<LOV>();

  populateForm(customerInfo: Customer) {
    console.log(customerInfo);
    this.profileEditForm.patchValue({
      // ShipperInfo
      CustomerName: customerInfo.CustomerName,
      BusinessName: customerInfo.BusinessName,
      BankName: customerInfo.BankName,
      AccountNumber: customerInfo.AccountNumber,
      MobileNo: customerInfo.MobileNo,
      Email: customerInfo.Email,
      CityId: customerInfo.CityId,
      Cnic: customerInfo.CNIC,
    });
  }
  getLOVs() {
    let userid = localStorage.getItem("USERID");
    this.sharedService.GetUserInfo(userid).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.customerInfo = response.Data;
        this.populateForm(this.customerInfo);
      }
    });
    this.sharedService.GetAllCities().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.citiesLOV = response.Data;
      }
    });
  }
  get CustomerName() {
    return this.profileEditForm.get("CustomerName");
  }
  get BusinessName() {
    return this.profileEditForm.get("BusinessName");
  }
  get BankName() {
    return this.profileEditForm.get("BankName");
  }
  get AccountNumber() {
    return this.profileEditForm.get("AccountNumber");
  }
  get MobileNo() {
    return this.profileEditForm.get("MobileNo");
  }
  get Email() {
    return this.profileEditForm.get("Email");
  }
  get CityId() {
    return this.profileEditForm.get("CityId");
  }
  get Cnic() {
    return this.profileEditForm.get("Cnic");
  }
  get pass() {
    return this.profileEditForm.get("pass");
  }
  get confirmpass() {
    return this.profileEditForm.get("confirmpass");
  }

  profileEditForm = this.fb.group({
    CustomerName: ["", Validators.required],
    BusinessName: ["", Validators.required],
    BankName: ["", Validators.required],
    AccountNumber: ["", Validators.required],
    MobileNo: ["", Validators.required],
    Email: ["", Validators.required],
    CityId: ["", Validators.required],
    Cnic: ["", Validators.required],
  });
  // profileEditForm = this.fb.group({
  //   CustomerName: ["", Validators.required],
  //   BusinessName: ["", Validators.required],
  //   BankName: ["", Validators.required],
  //   AccountNumber: ["", Validators.required],
  //   MobileNo: ["", Validators.required],
  //   Email: ["", Validators.required],
  //   CityIdId: ["", Validators.required],
  //   Cnic: ["", Validators.required]
  // });|
  customer: Customer;
  onSubmit() {
    this.customer = this.profileEditForm.value;

    this.customer.UserId = parseInt(localStorage.getItem("USERID"));
    console.log(this.customer,"Hwellooooo")
    this.sharedService.EditUserInfo(this.customer).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.notificationService.showToast(
          "success",
          response.Message,
          "",
          "top-right"
        );
      } else {
        this.notificationService.showToast(
          "danger",
          response.Message,
          "",
          "top-right"
        );
      }
    });
  }
}
