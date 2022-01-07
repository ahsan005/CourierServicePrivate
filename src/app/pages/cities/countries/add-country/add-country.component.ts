import { NotificationService } from "./../../../../services/notification.service";
import { UserService } from "./../../../../services/user.service";
import { City } from "./../../../../models/city";
import { SharedService } from "./../../../../services/shared.service";
import { LOV } from "./../../../../models/citiesLOV";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { Country } from "../../../../models/country";

@Component({
  selector: "ngx-add-country",
  templateUrl: "./add-country.component.html",
  styleUrls: ["./add-country.component.scss"],
})
export class AddCountryComponent implements OnInit {
  // selectedCountryID;
  // selectedProvinceID;
  // cityFormModel
  Country = new Country();
  // cityFormModel
  // showCityField: boolean = false;
  // showProvinceField: boolean = false;
  // countriesLOV = new Array<LOV>();
  // provincesLOV = new Array<LOV>();

  constructor(
    public modal: NgbActiveModal,
    private sharedService: SharedService,
    private notificationService: NotificationService
  ) {
    // this.initialize();
  }

  ngOnInit(): void {
    // this.initialize();
  }

  // initialize() {
  //   this.sharedService.GetAllCountries().subscribe((data) => {
  //     var response = JSON.parse(JSON.stringify(data));
  //     this.countriesLOV = response.Data;
  //   });
  // }

  // loadProvinces() {
  //   console.log(this.selectedCountryID);
  //   this.sharedService
  //     .GetProvincesByCountry(this.selectedCountryID)
  //     .subscribe((data) => {
  //       var response = JSON.parse(JSON.stringify(data));
  //       this.provincesLOV = response.Data;
  //       console.log(this.provincesLOV);
  //       console.log(response);
  //       if (response.Status) this.showProvinceField = true;
  //     });
  // }

  countryToAdd = new Country();
  spinner: boolean = false;
  addCountry() {
    this.spinner = true;
    this.countryToAdd = this.Country;
    this.countryToAdd.CreatedById = parseInt(localStorage.getItem("USERID"));

      // Calling Service
    this.sharedService.AddNewCountry(this.countryToAdd).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.spinner = false;
        this.notificationService.showToast(
          "success",
          response.Message,
          "",
          "top-right"
        );
        this.sharedService.filter("Added New Country");
        this.modal.close();
      } else {
        this.spinner = false;
        this.notificationService.showToast(
          "danger",
          response.Message,
          "",
          "top-right"
        );
        console.warn(response.Message);
      }
    });
      // Calling Service

  }
}
