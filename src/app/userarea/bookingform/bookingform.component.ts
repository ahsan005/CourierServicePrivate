import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserService } from "./../../services/user.service";

import { OrderBookingForm } from "./../../models/order-booking-form";
import { SharedService } from "./../../services/shared.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-bookingform",
  templateUrl: "./bookingform.component.html",
  styleUrls: ["./bookingform.component.scss"],
})
export class BookingformComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private userService: UserService,
    private toastrService:NbToastrService,
    private router : Router
  ) {}
  citiesLOV: any;
  weightLOV: Array<Object> = [
    { id: "1", name: "0.5" },
    { id: "2", name: "1" },
    { id: "3", name: "2" },
    { id: "4", name: "3" },
    { id: "5", name: "4" },
    { id: "6", name: "5" },
    { id: "7", name: "6" },
    { id: "8", name: "7" },
    { id: "9", name: "8" },
    { id: "10", name: "9" },
    { id: "11", name: "10" },
    { id: "12", name: "11" },
    { id: "13", name: "12" },
    { id: "14", name: "13" },
    { id: "15", name: "14" },
    { id: "16", name: "15" },
    { id: "17", name: "16" },
    { id: "18", name: "17" },
    { id: "19", name: "18" },
    { id: "20", name: "19" },
    { id: "21", name: "20" },
  ];
  initialize() {
    this.sharedService.GetAllCities().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);

      this.citiesLOV = response.Data;
    });
  }
  ngOnInit(): void {
    this.initialize();
  }
  formOutput: any;
  bookingFormObj: OrderBookingForm;
  onSubmit() {
    this.formOutput = this.bookingForm.getRawValue();
    console.log(JSON.stringify(this.formOutput));
    console.log(this.bookingForm);
    this.bookingFormObj = new OrderBookingForm(this.bookingForm.value);
    this.bookingFormObj.CreatedById = parseInt(localStorage.getItem("USERID"));
    console.log(this.bookingFormObj);
    this.userService.OrderBooking(this.bookingFormObj).subscribe((data) => {
      //  = JSON.stringify(data)
      var response = JSON.parse(JSON.stringify(data));
      //     //  console.log(response.Status,response.Message)
      //     console.log("Status", response);
      if (response.Status) {
        this.showToast('success',response.Message,'','top-right');

        this.router.navigate(["/user/requests"]);
      } else {
        this.showToast('danger',response.Message,'','top-right');
      }
    });
  }
  get originCityId() {
    return this.bookingForm.get("originCityId");
  }
  get selectProfile() {
    return this.bookingForm.get("selectProfile");
  }
  get shipperMobile() {
    return this.bookingForm.get("shipperMobile");
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
  get destinationCityId() {
    return this.bookingForm.get("destinationCityId");
  }
  get consigneeName() {
    return this.bookingForm.get("consigneeName");
  }
  get consigneeMobile() {
    return this.bookingForm.get("consigneeMobile");
  }
  get productCode() {
    return this.bookingForm.get("productCode");
  }
  get quantity() {
    return this.bookingForm.get("quantity");
  }
  get weightprofileId() {
    return this.bookingForm.get("weightprofileId");
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
  get consigneeAddress() {
    return this.bookingForm.get("consigneeAddress");
  }
  get consigneeEmail() {
    return this.bookingForm.get("consigneeEmail");
  }

  bookingForm = this.fb.group({
    // ShipperInfo
    originCityId: ["", Validators.required],
    selectProfile: ["", Validators.required],
    shipperName: ["", Validators.required],
    shipperMobile: ["", Validators.required],
    shipperEmail: ["", Validators.required],
    shipperAddress: ["", Validators.required],
    // ShipperInfo

    // Consignee Info
    destinationCityId: ["", Validators.required],
    consigneeName: ["", Validators.required],
    consigneeMobile: ["", Validators.required],
    consigneeAddress: ["", Validators.required],
    consigneeEmail: ["", Validators.required],
    // Consignee Info
    // Shipment Details
    productCode: ["", Validators.required],
    quantity: ["", Validators.required],
    weightprofileId: ["", Validators.required],
    codAmount: ["", Validators.required],
    productDescription: ["", Validators.required],
    specialInstructions: ["", Validators.required],

    // Shipment Details
  });


  showToast( status, title?,description?,position?) {
    // this.index += 1;
    // const iconConfig: NbIconConfig = { icon: iconName, pack: 'eva' };
    // position='top-right'

    this.toastrService.show(
      status || description,
      title,
      { position, status});
  }




}
