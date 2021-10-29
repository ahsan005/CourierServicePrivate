import { ShipperProfile } from "./../../../models/shipper-profile";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  constructor(public modal: NgbActiveModal, private fb: FormBuilder) {}

  public shipperProfileModel: ShipperProfile;

  onSubmit() {}
  ngOnInit(): void {
    console.log(this.shipperProfileModel);
    this.setForm();
  }


  editProfile: any;

  setForm() {
    this.editProfile = this.fb.group({
      SrNo: [this.shipperProfileModel.SrNo],
      ShipperName: [this.shipperProfileModel.ShipperName],
      ShipperPhone: [this.shipperProfileModel.ShipperPhone],
      ShipperEmail: [this.shipperProfileModel.ShipperEmail],
      ShipperAddress: [this.shipperProfileModel.ShipperAddress],
    });
  }
}
