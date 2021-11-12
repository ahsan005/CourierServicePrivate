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
export class RegisterComponent implements OnInit {
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
  // cities: Array<Object> = [
  //   { id: "1", name: "lahore" },
  //   { id: "2", name: "Islamabad" },
  //   { id: "3", name: "Peshawar" },
  //   { id: "4", name: "Karachi" },
  //   { id: "5", name: "Bhawalpur" },
  //   { id: "6", name: "Quetta" },
  //   { id: "7", name: "Faisalabad" },
  // ];
  cities: any;
  ngOnInit(): void {
    this.initialize();
    console.log(this.cities);
  }

  initialize(){
    this.sharedService.GetAllCities().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);
      this.cities = response.Data
    });
  }

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
    return this.profileForm.get("MobileNo");
  }
  get Email() {
    return this.profileForm.get("Email");
  }
  get City() {
    return this.profileForm.get("CityId");
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
      MobileNo: ["", Validators.required],
      Email: ["", Validators.required],
      CityId: ["", Validators.required, Validators.minLength(13)],
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
    this.authService.Register(this.customer).subscribe((data) => {
      // json data

      //  = JSON.stringify(data)
      var response = JSON.parse(JSON.stringify(data));
      //  console.log(response.Status,response.Message)
      console.log("Status", response);
      if (response.Status) {
        alert("Successfully Registered");
      } else {
        alert("This wont work");
      }
    });

    // const redirect = '/user'
    // if (redirect) {
    //   setTimeout(() => {
    //     return this.router.navigateByUrl(redirect);
    //   }, 200);
    // }
    // this.cd.detectChanges();
  }
  //

  // FileUpload Stuff
}
