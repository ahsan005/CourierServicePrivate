import { NotificationService } from "./../../../services/notification.service";
import { UserService } from "./../../../services/user.service";
import { City } from "./../../../models/city";
import { SharedService } from "./../../../services/shared.service";
import { LOV } from "./../../../models/citiesLOV";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-add-city",
  templateUrl: "./add-city.component.html",
  styleUrls: ["./add-city.component.scss"],
})
export class AddCityComponent implements OnInit {
  selectedCountryID;
  selectedProvinceID;
  // cityFormModel
  city = { cityName: "", cityCode: "", cityShort: "" };
  // cityFormModel
  showCityField: boolean = false;
  showProvinceField: boolean = false;
  countriesLOV = new Array<LOV>();
  provincesLOV = new Array<LOV>();

  constructor(
    public modal: NgbActiveModal,
    private sharedService: SharedService,
    private notificationService: NotificationService
  ) {
    this.initialize();
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.sharedService.GetAllCountries().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      this.countriesLOV = response.Data;
    });
  }

  loadProvinces() {
    console.log(this.selectedCountryID);
    this.sharedService
      .GetProvincesByCountry(this.selectedCountryID)
      .subscribe((data) => {
        var response = JSON.parse(JSON.stringify(data));
        this.provincesLOV = response.Data;
        console.log(this.provincesLOV);
        console.log(response);
        if (response.Status) this.showProvinceField = true;
      });
  }

  loadCities() {
    this.showCityField = true;
  }

  cityToAdd = new City();
  spinner: boolean = false;
  addCity() {
    this.spinner = true;
    this.cityToAdd.CityName = this.city.cityName;
    this.cityToAdd.CityShortName = this.city.cityShort;
    this.cityToAdd.CityCode = '0' + this.city.cityCode
    console.log(this.cityToAdd.CityCode)
    this.cityToAdd.CreatedById = parseInt(localStorage.getItem("USERID"));
    this.cityToAdd.AlteredById = parseInt(localStorage.getItem("USERID"));
    this.cityToAdd.ProvinceId = this.selectedProvinceID;
    this.sharedService.AddNewCity(this.cityToAdd).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.spinner = false;
        this.notificationService.showToast(
          "success",
          response.Message,
          "",
          "top-right"
        );
        this.sharedService.filter("Added New City");
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
  }
}
