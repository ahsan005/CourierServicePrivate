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
  constructor(private fb: FormBuilder, private sharedService: SharedService) {
    this.getLOVs();
  }

  ngOnInit(): void {}

  citiesLOV = new Array<LOV>();

  getLOVs() {
    this.sharedService.GetAllCities().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.citiesLOV = response.Data;
      }
    });
  }
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

  profileEditForm = this.fb.group({
    cname: ["", Validators.required],
    buname: ["", Validators.required],
    baname: ["", Validators.required],
    accnum: ["", Validators.required],
    mnumber: ["", Validators.required],
    email: ["", Validators.required],
    city: ["", Validators.required, Validators.minLength(13)],
    cnic: ["", Validators.required],
    pass: ["", Validators.required, Validators.minLength(6)],
    confirmpass: ["", Validators.required],
  });
  onSubmit() {
    console.log(this.profileEditForm);
  }
}
