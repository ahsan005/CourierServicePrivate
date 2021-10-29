import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  cities: Array<Object> = [
    { id: "lahore", name: "lahore" },
    { id: "Islamabad", name: "Islamabad" },
    { id: "Peshawar", name: "Peshawar" },
    { id: "Karachi", name: "Karachi" },
    { id: "Bhawalpur", name: "Bhawalpur" },
    { id: "Quetta", name: "Quetta" },
    { id: "Faisalabad", name: "Faisalabad" },
  ];

  get cname() {
    return this.profileEditForm.get("cname");
  }
  get buname() {
    return this.profileEditForm.get("buname");
  }
  get baname() {
    return this.profileEditForm.get("baname");
  }
  get accnum() {
    return this.profileEditForm.get("accnum");
  }
  get mnumber() {
    return this.profileEditForm.get("mnumber");
  }
  get email() {
    return this.profileEditForm.get("email");
  }
  get city() {
    return this.profileEditForm.get("city");
  }
  get cnic() {
    return this.profileEditForm.get("cnic");
  }
  get pass() {
    return this.profileEditForm.get("pass");
  }
  get confirmpass() {
    return this.profileEditForm.get("confirmpass");
  }

  profileEditForm = this.fb.group(
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
    }
  )
  onSubmit(){
console.log(this.profileEditForm)
  }

}
