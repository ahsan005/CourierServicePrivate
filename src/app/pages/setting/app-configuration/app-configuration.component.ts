import { Organization } from "./../../../models/organization";
import { Location } from "./../../../models/location";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import * as _ from "lodash";
import { Address } from "../../../models/Address";
import { SharedService } from "../../../services/shared.service";
import { UserService } from "../../../services/user.service";
import { NotificationService } from "../../../services/notification.service";
@Component({
  selector: "ngx-app-configuration",
  templateUrl: "./app-configuration.component.html",
  styleUrls: ["./app-configuration.component.scss"],
})
export class AppConfigurationComponent implements OnInit {
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  citiesLOV;
  countriesLOV;
  provinceLOV;
  currencyLOV;
  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.Initialize();
  }

  Initialize() {
    this.sharedService.GetAllCountries().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      this.countriesLOV = response.Data;
    });
    this.sharedService.GetAllCurrencies().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      this.currencyLOV = response.Data;
    });
  }
  GetProvinceByCountry(countryId: number) {
    this.sharedService.GetProvincesByCountry(countryId).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      this.provinceLOV = response.Data;
      console.log(this.provinceLOV);
      console.log(response);
    });
  }
  GetCityByProvince(provinceId: number) {
    this.sharedService.GetCitiesByProvince(provinceId).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      this.citiesLOV = response.Data;
      console.log(this.citiesLOV);
      console.log(response);
    });
  }
  GetSecondaryLOV() {
    console.log("GetSecondaryLOV");
    var selectedCountry = this.AppConfigForm.get("Location")
      .get("Address")
      .get("CountryId").value;
    var selectedProvince = this.AppConfigForm.get("Location")
      .get("Address")
      .get("ProvinceId").value;

    console.log(selectedCountry);
    console.log(selectedCountry);
    if (
      (selectedCountry != undefined && selectedProvince == undefined) ||
      selectedProvince == ""
    ) {
      this.GetProvinceByCountry(selectedCountry);
    }
    if (selectedProvince != undefined && selectedCountry != undefined) {
      this.GetCityByProvince(selectedProvince);
    }
  }
  AppConfigForm = this.fb.group({
    Organization: this.fb.group({
      OrginizationId: ["", Validators.required],
      OrginizationSettingId: [""],
      CurrencyId: ["", Validators.required],
      OrginizationName: ["", Validators.required],
      OrginizationTitle: ["", Validators.required],
      NTN: [""],
      STN: [""],

      WaterMark: [""],
      Certificate1: [""],
      Certificate2: [""],
      CreatedById: [""],
      CreatedOn: [""],
      AlteredById: [""],
      AlteredOn: [""],
      ActionTypeId: [""],
      UserLogId: [""],
    }),
    Location: this.fb.group({
      LocationId: ["", Validators.required],
      OrginizationId: ["", Validators.required],
      LocationSettingId: [""],

      Address: this.fb.group({
        AddressId: [""],
        CountryId: ["", Validators.required],
        ProvinceId: ["", Validators.required],
        CityId: ["", Validators.required],
        LocationId: ["", Validators.required],
        AddressDetail: ["", Validators.required],
        Latitude: ["", Validators.required],
        Longitude: ["", Validators.required],
        Altitude: ["", Validators.required],
      }),
      LocationTypeProfileId: ["", Validators.required],
      LocationName: ["", Validators.required],
      LicenseNo: ["", Validators.required],
      SubLocationName: ["", Validators.required],
      LocationShortName: ["", Validators.required],
      Mobile1: ["", Validators.required],
      Mobile2: [""],
      Email: ["", Validators.required],
      PortalURL: [""],
      HeaderDetail: [""],
      FooterDetail: [""],
      IsDefaultLocation: [""],
      CreatedById: [""],
      CreatedOn: [""],
      AlteredById: [""],
      AlteredOn: [""],
      ActionTypeId: [""],
      UserLogId: [""],
    }),
  });

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ["image/png", "image/jpeg"];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = "Maximum size allowed is " + max_size / 1000 + "Mb";

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = "Only Images are allowed ( JPG | PNG )";
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget["height"];
          const img_width = rs.currentTarget["width"];

          console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              "Maximum dimentions allowed " +
              max_height +
              "*" +
              max_width +
              "px";
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }
  // Validation Elements
  get OrginizationId() {
    return this.AppConfigForm.get("Organization").get("OrginizationId");
  }
  get OrginizationSettingId() {
    return this.AppConfigForm.get("Organization").get("OrginizationSettingId");
  }
  get CurrencyId() {
    return this.AppConfigForm.get("Organization").get("CurrencyId");
  }
  get OrginizationName() {
    return this.AppConfigForm.get("Organization").get("OrginizationName");
  }
  get OrginizationTitle() {
    return this.AppConfigForm.get("Organization").get("OrginizationTitle");
  }
  get NTN() {
    return this.AppConfigForm.get("Organization").get("NTN");
  }
  get STN() {
    return this.AppConfigForm.get("Organization").get("STN");
  }
  get Logo() {
    return this.AppConfigForm.get("Organization").get("Logo");
  }
  get WaterMark() {
    return this.AppConfigForm.get("Organization").get("WaterMark");
  }
  get Certificate1() {
    return this.AppConfigForm.get("Organization").get("Certificate1");
  }
  get Certificate2() {
    return this.AppConfigForm.get("Organization").get("Certificate2");
  }
  get LocationId() {
    return this.AppConfigForm.get("Location").get("LocationId");
  }
  get LocationSettingId() {
    return this.AppConfigForm.get("Location").get("LocationSettingId");
  }
  get AddressId() {
    return this.AppConfigForm.get("Location").get("AddressId");
  }
  get LocationTypeProfileId() {
    return this.AppConfigForm.get("Location").get("LocationTypeProfileId");
  }
  get LocationName() {
    return this.AppConfigForm.get("Location").get("LocationName");
  }
  get LicenseNo() {
    return this.AppConfigForm.get("Location").get("LicenseNo");
  }
  get SubLocationName() {
    return this.AppConfigForm.get("Location").get("SubLocationName");
  }
  get LocationShortName() {
    return this.AppConfigForm.get("Location").get("LocationShortName");
  }
  get Mobile1() {
    return this.AppConfigForm.get("Location").get("Mobile1");
  }
  get Mobile2() {
    return this.AppConfigForm.get("Location").get("Mobile2");
  }
  get Email() {
    return this.AppConfigForm.get("Location").get("Email");
  }
  get PortalURL() {
    return this.AppConfigForm.get("Location").get("PortalURL");
  }
  get HeaderDetail() {
    return this.AppConfigForm.get("Location").get("HeaderDetail");
  }
  get FooterDetail() {
    return this.AppConfigForm.get("Location").get("FooterDetail");
  }
  get IsDefaultLocation() {
    return this.AppConfigForm.get("Location").get("IsDefaultLocation");
  }

  // Validation Elements

  // Form Submission
  organizationObj = new Organization();
  locationObj = new Location();
  addressObj = new Address();
  OnSubmit() {
    let flag = false;
    console.log(this.AppConfigForm);
    this.organizationObj = this.AppConfigForm.get("Organization").value;
    this.organizationObj.LogoImageURL = this.cardImageBase64;
    this.userService.AddOrganization(this.organizationObj).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.locationObj.OrginizationId = response.ID;
        flag = true;
      } else {
        this.notificationService.showToast(
          "danger",
          response.Message,
          "",
          "top-right"
        );
      }
    });
    if (flag) {
      this.locationObj = this.AppConfigForm.get("Location").value;
      this.locationObj.Address =
        this.AppConfigForm.get("Location").get("Address").value;
      this.userService
        .AddOrganizationLocation(this.locationObj)
        .subscribe((data) => {
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
      console.log(this.AppConfigForm.value);
      console.log(this.locationObj);
      console.log(this.organizationObj);
      // console.log(this.addressObj);
    }
  }
  // Form Submission
}
