import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LOV } from "../../models/citiesLOV";
import { DeliveryCharges } from "../../models/deliverycharges";
import { NotificationService } from "../../services/notification.service";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: "ngx-pricing",
  templateUrl: "./pricing.component.html",
  styleUrls: ["./pricing.component.scss"],
})
export class PricingComponent implements OnInit {
  // page number
  p: number = 1;
  // page number

  constructor(
    private sharedService: SharedService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.sharedService.listen().subscribe((m: any) => {
      console.log(m);
      this.RefreshDeliveryChargesList();
    });
    // this.Initialize();
  }
  citiesLOV = new Array<LOV>();
  deliveryChargesList = new Array<DeliveryCharges>();

  ngOnInit(): void {
    this.Initialize();
  }
  DeliveryCharges;
  Initialize() {
    this.sharedService.GetAllCities().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.citiesLOV = response.Data;
      }
    });

    this.RefreshDeliveryChargesList();

    this.DeliveryCharges = this.fb.group({
      // ShipperInfo
      DeliveryChargesId: [""],
      FromCityId: ["", Validators.required],
      ToCityId: ["", Validators.required],
      FirstKGPrice: ["", Validators.required],
      PricePerKG: ["", Validators.required],
      CreatedById: [""],
      CreatedOn: [""],
      AlteredById: [""],
      AlteredOn: [""],
      // Shipment Details
    });
  }

  // Validation Functions

  get FromCityId() {
    return this.DeliveryCharges.get("FromCityId");
  }
  get ToCityId() {
    return this.DeliveryCharges.get("ToCityId");
  }
  get FirstKGPrice() {
    return this.DeliveryCharges.get("FirstKGPrice");
  }
  get PricePerKG() {
    return this.DeliveryCharges.get("PricePerKG");
  }

  // Validation Functions

  RefreshDeliveryChargesList() {
    this.sharedService.GetAllDeliveryCharges().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      console.log(response);
      if (response.Status) {
        this.deliveryChargesList = response.Data;
      }
    });
  }

  deliveryChargesObj: DeliveryCharges;
  OnSubmitSpinner: boolean = false;
  OnSubmit() {
    if (!this.editMode) {
      this.OnSubmitSpinner = true;
      this.deliveryChargesObj = this.DeliveryCharges.value;
      this.deliveryChargesObj.CreatedById = parseInt(
        localStorage.getItem("USERID")
      );
      this.deliveryChargesObj.AlteredById = parseInt(
        localStorage.getItem("USERID")
      );
      console.log(this.DeliveryCharges.value);
      console.log(this.deliveryChargesObj);

      this.sharedService
        .AddDeliveryCharges(this.deliveryChargesObj)
        .subscribe((data) => {
          var response = JSON.parse(JSON.stringify(data));
          if (response.Status) {
            this.notificationService.showToast(
              "success",
              response.Message,
              "",
              "top-right"
            );
            this.sharedService.filter("Refresh List");
            this.OnSubmitSpinner = false;
          } else {
            console.warn(response.Message);
            this.notificationService.showToast(
              "danger",
              response.Message,
              "",
              "top-right"
            );
            this.OnSubmitSpinner = false;
          }
        });
    } else {
      this.OnSubmitSpinner = true;
      this.deliveryChargesObj = this.DeliveryCharges.value;
      this.deliveryChargesObj.AlteredById = parseInt(
        localStorage.getItem("USERID")
      );

      this.sharedService
        .AddDeliveryCharges(this.deliveryChargesObj)
        .subscribe((data) => {
          this.OnSubmitSpinner = true;
          var response = JSON.parse(JSON.stringify(data));
          if (response.Status) {
            this.notificationService.showToast(
              "success",
              "Edit Operation Successful",
              "",
              "top-right"
            );
            this.sharedService.filter("Refresh List");
            this.OnSubmitSpinner = false;
            this.editMode = false;
          } else {
            this.notificationService.showToast(
              "danger",
              response.Message,
              "",
              "top-right"
            );
            this.OnSubmitSpinner = false;
          }
        });
    }
  }
  editMode: Boolean = false;
  editBtn(item: DeliveryCharges) {
    console.log(item);
    this.DeliveryCharges = this.fb.group({
      // ShipperInfo
      DeliveryChargesId: [item.DeliveryChargesId],
      FromCityId: [item.FromCityId, Validators.required],
      ToCityId: [item.ToCityId, Validators.required],
      FirstKGPrice: [item.FirstKGPrice, Validators.required],
      PricePerKG: [item.PricePerKG, Validators.required],
      CreatedById: [item.CreatedById],
      CreatedOn: [item.CreatedOn],
      AlteredById: [item.AlteredById],
      AlteredOn: [item.AlteredOn],
      // Shipment Details
    });
    this.editMode = true;
  }
  deleteBtn(item) {
    this.sharedService.DeleteDeliveryCharges(item).subscribe((data) => {
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
