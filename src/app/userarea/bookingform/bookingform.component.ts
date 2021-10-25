import { FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-bookingform",
  templateUrl: "./bookingform.component.html",
  styleUrls: ["./bookingform.component.scss"],
})
export class BookingformComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  formOutput:any
  onSubmit(){
    this.formOutput=this.bookingForm.getRawValue();
    console.log(JSON.stringify(this.formOutput));
    console.log(this.bookingForm)
  }
  get origin() {
    return this.bookingForm.get("origin");
  }
  get selectProfile() {
    return this.bookingForm.get("selectProfile");
  }
  get shipperPhone() {
    return this.bookingForm.get("shipperPhone");
  }
  get shipperEmail() {
    return this.bookingForm.get("shipperEmail");
  }
  get shipperAddress() {
    return this.bookingForm.get("shipperAddress");
  }
  get shipperName() {
    return this.bookingForm.get("shipperName");
  }
  get destination() {
    return this.bookingForm.get("destination");
  }
  get consigneeName() {
    return this.bookingForm.get("consigneeName");
  }
  get consigneePhone() {
    return this.bookingForm.get("consigneePhone");
  }
  get productCode() {
    return this.bookingForm.get("productCode");
  }
  get pieces() {
    return this.bookingForm.get("pieces");
  }
  get weight() {
    return this.bookingForm.get("weight");
  }
  get productDescription() {
    return this.bookingForm.get("productDescription");
  }
  get codAmount() {
    return this.bookingForm.get("codAmount");
  }
  get specialInstructions() {
    return this.bookingForm.get("specialInstructions");
  }







  bookingForm = this.fb.group({
    // ShipperInfo
    origin: ["", Validators.required],
    selectProfile: ["", Validators.required],
    shipperName: ["", Validators.required],
    shipperPhone: ["", Validators.required],
    shipperEmail: ["", Validators.required],
    shipperAddress: ["", Validators.required],
    // ShipperInfo

    // Consignee Info
    destination: ["", Validators.required],
    consigneeName: ["", Validators.required],
    consigneePhone: ["", Validators.required],
    consigneeAddress: ["", Validators.required],
    // Consignee Info
// Shipment Details
    productCode: ["", Validators.required],
    pieces: ["", Validators.required],
    weight: ["", Validators.required],
    codAmount: ["", Validators.required],
    productDescription: ["", Validators.required],
    specialInstructions: ["", Validators.required]

// Shipment Details


  });
}
