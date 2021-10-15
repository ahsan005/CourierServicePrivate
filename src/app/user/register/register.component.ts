import { Customer } from "./../../models/customer";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { MustMatch } from "../../_helpers/MustMatch-validator";
import { JsonPipe } from "@angular/common";

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
    { id: "lahore", name: "lahore" },
    { id: "Islamabad", name: "Islamabad" },
    { id: "Peshawar", name: "Peshawar" },
    { id: "Karachi", name: "Karachi" },
    { id: "Bhawalpur", name: "Bhawalpur" },
    { id: "Quetta", name: "Quetta" },
    { id: "Faisalabad", name: "Faisalabad" },
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

  constructor(private fb: FormBuilder) {}

  // NgBootstrapModal methods
  // Angular ReactiveForms FormBuilder
  get cname() {
    return this.profileForm.get("cname");
  }
  get buname() {
    return this.profileForm.get("buname");
  }
  get baname() {
    return this.profileForm.get("baname");
  }
  get accnum() {
    return this.profileForm.get("accnum");
  }
  get mnumber() {
    return this.profileForm.get("mnumber");
  }
  get email() {
    return this.profileForm.get("email");
  }
  get city() {
    return this.profileForm.get("city");
  }
  get cnic() {
    return this.profileForm.get("cnic");
  }
  get pass() {
    return this.profileForm.get("pass");
  }
  get confirmpass() {
    return this.profileForm.get("confirmpass");
  }
  profileForm = this.fb.group(
    {
      cname: ["", Validators.required],
      buname: ["", Validators.required],
      baname: ["", Validators.required],
      accnum: ["", Validators.required],
      mnumber: ["", Validators.required],
      email: ["", Validators.required],
      city: ["", Validators.required,Validators.minLength(13)],
      cnic: ["", Validators.required],
      pass: ["", Validators.required, Validators.minLength(6)],
      confirmpass: ["", Validators.required],
    },
    {
      validator: MustMatch("pass", "confirmpass"),
    }
  );
  onSubmit() {
    console.log(this.profileForm.value);
    alert(this.profileForm.value);
    this.newCustomer = new Customer(this.profileForm.value);
    console.log(JSON.stringify(this.newCustomer))


  }

  // FileUpload Stuff
}

// FileUpload Stuff
// Angular ReactiveForms FormBuilder
