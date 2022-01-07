import { TableUtil } from './../../utilities/tableutil';
import { registerMap } from 'echarts';
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LOV } from "../../models/citiesLOV";
import { CustomerInfo } from "../../models/CustomerInfo";
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
  searchVal;
  p: number = 1;
  // page number
  deliveryChargesObj: DeliveryCharges;
  OnSubmitSpinner: boolean = false;
  PartyLocationId: number = 1;
  PartyList = new Array<CustomerInfo>();
  citiesLOV = new Array<LOV>();
  deliveryChargesList = new Array<DeliveryCharges>();
  DeliveryCharges;
  constructor(
    private sharedService: SharedService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.sharedService.listen().subscribe((m: any) => {
      console.log(m);
      this.RefreshDeliveryChargesList();
    });
    // this.Initialize();
  }

  ngOnInit(): void {
    this.Initialize();
  }

  Initialize() {
    this.sharedService.GetAllCities().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.citiesLOV = response.Data;
      }
    });
    this.userService.GetAllUsers().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.PartyList = response.Data;
        console.log(this.PartyList);
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
      PartyLocationId: [""],
      // Shipment Details
    });
    this.RefreshDeliveryChargesList();
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
    if (this.PartyLocationId == 1) {
      this.GetStandardDeliveryCharges();

    } else {
      this.DeliveryCharges.reset()
      this.DeliveryCharges.patchValue({
        FromCityId: "",
        ToCityId: "",
      })
      this.GetDeliveryChargesbyPartyLocation();
    }
  }
  GetStandardDeliveryCharges() {
    this.sharedService.GetStandardDeliveryCharges().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      console.log(response);
      if (response.Status) {
        this.deliveryChargesList = response.Data;
      }
    });
  }
  GetDeliveryChargesbyPartyLocation() {
    this.sharedService
      .GetDeliveryChargesByPartyLocation(this.PartyLocationId)
      .subscribe((data) => {
        var response = JSON.parse(JSON.stringify(data));
        if (response.Status) {
          if (response.NoEntries) {
            this.deliveryChargesList.length = 0;
          } else {
            this.deliveryChargesList = response.Data;
            this.notificationService.showToast(
              "success",
              response.Message,
              "",
              "top-right"
            );
          }
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

  OnSubmit() {
    if (!this.DeliveryCharges.invalid) {
      if (!this.editMode) {
        this.OnSubmitSpinner = true;
        this.deliveryChargesObj = this.DeliveryCharges.value;
        this.deliveryChargesObj.CreatedById = parseInt(
          localStorage.getItem("USERID")
        );
        if (this.PartyLocationId != null) {
          this.deliveryChargesObj.PartyLocationId = this.PartyLocationId;
        }
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
    } else {
      this.DeliveryCharges.markAsTouched();
      console.log(this.DeliveryCharges.value);
    }
  }
  editMode: Boolean = false;
  editBtn(item: DeliveryCharges) {
    console.log(item);
    this.DeliveryCharges.patchValue({
      DeliveryChargesId: item.DeliveryChargesId,
      FromCityId: item.FromCityId,
      ToCityId: item.ToCityId,
      FirstKGPrice: item.FirstKGPrice,
      PricePerKG: item.PricePerKG,
      CreatedById: item.CreatedById,
      CreatedOn: item.CreatedOn,
      AlteredById: item.AlteredById,
      AlteredOn: item.AlteredOn,
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
        this.sharedService.filter("Deleted Entry Refresh list");
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
  SearchFunction(){
    TableUtil.SearchFunction(this.searchVal);
  }
}
