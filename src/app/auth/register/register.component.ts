import { registerMap } from "echarts";
import { AuthService } from "./../../services/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Customer } from "../../models/customer";
import { MustMatch } from "../../_helpers/MustMatch-validator";
import { NbAuthService } from "@nebular/auth";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  /// Cities Array 'Lahore', 'Islamabad', 'Karachi','Bhawalpur','Peshawar'
  private newCustomer: Customer = new Customer();
  selectedCity: string = "";

  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    this.selectedCity = event.target.value;
    console.log(this.selectedCity);
  }
  // selectedLevel;
  // data:Array<Object> = [
  //     {id: 0, name: "name1"},
  //     {id: 1, name: "name2"}
  // ];
  cities: Array<Object> = [
    { id: "1", name: "lahore" },
    { id: "2", name: "Islamabad" },
    { id: "3", name: "Peshawar" },
    { id: "4", name: "Karachi" },
    { id: "5", name: "Bhawalpur" },
    { id: "6", name: "Quetta" },
    { id: "7", name: "Faisalabad" },
  ];

  // selected(){
  //   alert(this.selectedLevel.name)
  // }
  // // Get Value from City Dropdown
  // selectedLevel;
  // selected(){
  //   console.log(this.selectedLevel)
  // };
  // Get Value from City Dropdown

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  // NgBootstrapModal methods
  // Angular ReactiveForms FormBuilder
  get CustomerName() {
    return this.profileForm.get("CustomerName");
  }
  get BusinessName() {
    return this.profileForm.get("BusinessName");
  }
  get BankName() {
    return this.profileForm.get("BankName");
  }
  get AccountNumber() {
    return this.profileForm.get("AccountNumber");
  }
  get MobileNumber() {
    return this.profileForm.get("MobileNumber");
  }
  get Email() {
    return this.profileForm.get("Email");
  }
  get City() {
    return this.profileForm.get("City");
  }
  get Cnic() {
    return this.profileForm.get("Cnic");
  }
  get Password() {
    return this.profileForm.get("Password");
  }
  get ConfirmPassword() {
    return this.profileForm.get("ConfirmPassword");
  }
  profileForm = this.fb.group(
    {
      CustomerName: ["", Validators.required],
      BusinessName: ["", Validators.required],
      BankName: ["", Validators.required],
      AccountNumber: ["", Validators.required],
      MobileNumber: ["", Validators.required],
      Email: ["", Validators.required],
      City: ["", Validators.required, Validators.minLength(13)],
      Cnic: ["", Validators.required],
      Password: ["", Validators.required, Validators.minLength(6)],
      ConfirmPassword: ["", Validators.required],
    },
    {
      validator: MustMatch("Password", "ConfirmPassword"),
    }
  );
  private customer: Customer = new Customer();
  onSubmit() {
    console.log(this.profileForm);
    this.customer = new Customer(this.profileForm.value);
    console.log(this.customer);
    var response = this.authService.Register(this.customer);
    console.log(response);

    // const redirect = '/user'
    // if (redirect) {
    //   setTimeout(() => {
    //     return this.router.navigateByUrl(redirect);
    //   }, 200);
    // }
    // this.cd.detectChanges();
  }

  // FileUpload Stuff
}
