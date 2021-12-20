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
  constructor(
    private sharedService: SharedService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.sharedService.listen().subscribe((m: any) => {
      console.log(m);
      // this.refreshList();
    });
    this.Initialize();
  }
  citiesLOV = new Array<LOV>();
  deliveryChargesList = new Array<DeliveryCharges>();

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

    this.sharedService.GetAllDeliveryCharges().subscribe((data)=>{
      var response = JSON.parse(JSON.stringify(data));
      if(response.Status){
        this.deliveryChargesList = response.Data;
      }

    })
  }

  DeliveryCharges = this.fb.group({
    // ShipperInfo
    FromCityId: ["", Validators.required],
    ToCityId: ["", Validators.required],
    FirstKGPrice: ["", Validators.required],
    PricePerKG: ["", Validators.required],
    // Shipment Details
  });
  deliveryChargesObj: DeliveryCharges;
  OnSubmit() {
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
        }
        else{
          console.warn(response.Message)
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
