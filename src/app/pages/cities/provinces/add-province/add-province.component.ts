import { NotificationService } from "./../../../../services/notification.service";
import { UserService } from "./../../../../services/user.service";
import { City } from "./../../../../models/city";
import { SharedService } from "./../../../../services/shared.service";
import { LOV } from "./../../../../models/citiesLOV";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { Province } from "../../../../models/province";

@Component({
  selector: "ngx-add-province",
  templateUrl: "./add-province.component.html",
  styleUrls: ["./add-province.component.scss"],
})
export class AddProvinceComponent implements OnInit {
  CountryId: number;

  Province = new Province();

  constructor(
    public modal: NgbActiveModal,
    private sharedService: SharedService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    console.log(this.CountryId)
    if (this.CountryId != null)
      this.Province.CountryId = this.CountryId;
      else{
        this.notificationService.showToast('warning','Please Select a Country First','','top-right');
        this.modal.close();
      }
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

  // loadCities() {
  //   this.showCityField = true;
  // }

  provinceToAdd = new Province();
  spinner: boolean = false;
  addProvince() {
    this.spinner = true;
    
    this.Province.CreatedById = parseInt(localStorage.getItem("USERID"));
    // this.cityToAdd.AlteredById = parseInt(localStorage.getItem("USERID"));
    // this.cityToAdd.ProvinceId = this.selectedProvinceID;
    this.provinceToAdd = this.Province;

    this.sharedService.AddNewProvince(this.provinceToAdd).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.spinner = false;
        this.notificationService.showToast(
          "success",
          response.Message,
          "",
          "top-right"
        );
        this.sharedService.filter("Added New Province");
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
