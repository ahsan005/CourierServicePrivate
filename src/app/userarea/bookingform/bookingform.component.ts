import { DeliveryCharges } from "./../../models/deliverycharges";
import { NotificationService } from "./../../services/notification.service";
import { Router } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { UserService } from "./../../services/user.service";

import { OrderBookingForm } from "./../../models/order-booking-form";
import { SharedService } from "./../../services/shared.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { CourierSetting } from "../../models/courier-settings";

@Component({
  selector: "ngx-bookingform",
  templateUrl: "./bookingform.component.html",
  styleUrls: ["./bookingform.component.scss"],
})
export class BookingformComponent implements OnInit {
  deliveryChargesList = new Array<DeliveryCharges>();
  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  loading: boolean = false;
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
  courierSetting = new CourierSetting();
  initialize() {
    this.sharedService.GetCourierSettings().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.courierSetting = response.Data[0];
        // console.log(this.citiesLOV);
      } else {
        this.notificationService.showToast(
          "danger",
          response.Message,
          "",
          "top-right"
        );
        console.warn(response.Message);
      }
    });
    this.sharedService.GetAllCities().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);

      this.citiesLOV = response.Data;
    });
    this.GetAllDeliveryCharges();
  }
  ngOnInit(): void {
    this.initialize();
  }
  formOutput: any;
  bookingFormObj: OrderBookingForm;
  onSubmit() {
    this.loading = true;
    this.formOutput = this.bookingForm.getRawValue();

    this.bookingFormObj = new OrderBookingForm(this.bookingForm.value);
    this.bookingFormObj.CreatedById = parseInt(localStorage.getItem("USERID"));
    this.bookingFormObj.AlteredById = parseInt(localStorage.getItem("USERID"));

    console.log(this.bookingFormObj);
    this.bookingFormObj.PartyLocationId = parseInt(
      localStorage.getItem("PARTYLOCATIONID")
    );
    this.userService.OrderBooking(this.bookingFormObj).subscribe((data) => {
      //  = JSON.stringify(data)
      var response = JSON.parse(JSON.stringify(data));
      //     //  console.log(response.Status,response.Message)
      //     console.log("Status", response);
      if (response.Status) {
        this.loading = false;
        this.notificationService.showToast(
          "success",
          response.Message,
          "",
          "top-right"
        );

        this.router.navigate(["/user/requests"]);
      } else {
        this.loading = false;
        this.notificationService.showToast(
          "danger",
          response.Message,
          "",
          "top-right"
        );
      }
    });
  }
  originCity = null;
  destinationCity = null;
  GetAllDeliveryCharges() {
    this.sharedService.GetAllDeliveryCharges().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      console.log(response);
      if (response.Status) {
        this.deliveryChargesList = response.Data;
        console.log(this.deliveryChargesList);
        console.log(response.Data);
        this.GetDeliveryChargesbyPartyLocation();
        this.bookingForm
          .get("weightprofileId")
          .valueChanges.subscribe((selectedValue) => {
            this.CalculateDeliveryCharges(selectedValue - 1);
          });
        this.bookingForm
          .get("originCityId")
          .valueChanges.subscribe((selectedValue) => {
            this.originCity = selectedValue;
            if (this.originCity != null && this.destinationCity != null) {
              this.GetDeliveryChargesDetail();
            }
          });
        this.bookingForm
          .get("destinationCityId")
          .valueChanges.subscribe((selectedValue) => {
            this.destinationCity = selectedValue;
            if (this.originCity != null && this.destinationCity != null) {
              this.GetDeliveryChargesDetail();
            }
          });
      }
    });
  }
  GetStandardDeliveryCharges() {
    this.sharedService.GetStandardDeliveryCharges().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      console.log(response);
      if (response.Status) {
        this.deliveryChargesList = response.Data;
        console.log(this.deliveryChargesList);
        console.log(response.Data);
      }
    });
  }

  partyDeliveryChargesList = new Array<DeliveryCharges>();

  GetDeliveryChargesbyPartyLocation() {
    var PartyLocationId = parseInt(localStorage.getItem("PARTYLCOATIONID"));
    this.partyDeliveryChargesList = this.deliveryChargesList.filter((x) => {
      x.PartyLocationId == PartyLocationId;
    });
  }
  deliveryChargesDetailObj = new DeliveryCharges();
  GetDeliveryChargesDetail() {
    debugger;
    var originCity;
    var destinationCity;

    originCity = parseInt(this.bookingForm.get("originCityId").value);
    destinationCity = parseInt(this.bookingForm.get("destinationCityId").value);
    if (this.partyDeliveryChargesList.length < 1) {
      this.deliveryChargesDetailObj = this.deliveryChargesList.find((x) => {
        if (x.FromCityId == originCity && x.ToCityId == destinationCity) {
          return true;
        }
        // && x.ToCityId == destinationCity;
      });
    } else {
      this.deliveryChargesDetailObj = this.partyDeliveryChargesList.find(
        (x) => {
          if (x.FromCityId == originCity && x.ToCityId == destinationCity) {
            return true;
          }
        }
      );
    }
    console.warn(this.deliveryChargesDetailObj);
  }
  calculatedDeliveryCharges: number = 0;
  GST: number = 0;
  CalculateDeliveryCharges(selected) {
    debugger;
    if (this.originCity != null && this.destinationCity != null) {
      if (this.deliveryChargesDetailObj != null) {
        if (selected > 1) {
          this.calculatedDeliveryCharges =
            this.deliveryChargesDetailObj.FirstKGPrice +
            this.deliveryChargesDetailObj.PricePerKG * selected;
        } else {
          this.calculatedDeliveryCharges =
            this.deliveryChargesDetailObj.FirstKGPrice;
        }
      }
      if (this.courierSetting.GSTPercentage > 0) {
        this.GST = Math.round(
          (this.calculatedDeliveryCharges * this.courierSetting.GSTPercentage) /
            100
        );
      }
      this.bookingForm.patchValue({
        deliveryFee: this.calculatedDeliveryCharges,
      });
    }
    console.log(this.calculatedDeliveryCharges);
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
  get specialInstruction() {
    return this.bookingForm.get("specialInstruction");
  }
  get consigneeAddress() {
    return this.bookingForm.get("consigneeAddress");
  }
  get consigneeEmail() {
    return this.bookingForm.get("consigneeEmail");
  }
  Add;
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
    deliveryFee: [""],
    productCode: ["", Validators.required],
    quantity: ["", Validators.required],
    weightprofileId: ["", Validators.required],
    codAmount: ["", Validators.required],
    productDescription: ["", Validators.required],
    specialInstruction: ["", Validators.required],

    // Shipment Details
  });
}
