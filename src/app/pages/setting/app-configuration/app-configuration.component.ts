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
  //  declarations
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  citiesLOV;
  countriesLOV;
  provinceLOV;
  currencyLOV;
  locationTypeLOV;

  organizationObj = new Organization();
  locationObj = new Location();
  addressObj = new Address();
  //  declarations

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getLOVs();
    this.Initialize();
  }

  AppConfigForm;
  Initialize() {
    this.GetOrganization();

    this.GetLocation();
    // this.AppConfigForm.controls['OrginizationName'].setValue("Hello");

  //   this.AppConfigForm = this.fb.group({
  //     Organization: this.fb.group({
  //       OrginizationId: ["", Validators.required],
  //       OrginizationSettingId: [""],
  //       CurrencyId: ["", Validators.required],
  //       OrginizationName: ["", Validators.required],
  //       OrginizationTitle: ["", Validators.required],
  //       NTN: [""],
  //       STN: [""],

  //       WaterMark: [""],
  //       Certificate1: [""],
  //       Certificate2: [""],
  //     }),
  //     Location: this.fb.group({
  //       LocationId: ["", Validators.required],
  //       OrginizationId: ["", Validators.required],
  //       LocationSettingId: [""],

  //       Address: this.fb.group({
  //         AddressId: [""],
  //         CountryId: ["", Validators.required],
  //         ProvinceId: ["", Validators.required],
  //         CityId: ["", Validators.required],
  //         LocationId: ["", Validators.required],
  //         AddressDetail: ["", Validators.required],
  //         Latitude: ["", Validators.required],
  //         Longitude: ["", Validators.required],
  //         Altitude: ["", Validators.required],
  //       }),
  //       LocationTypeProfileId: ["", Validators.required],
  //       LocationName: ["", Validators.required],
  //       LicenseNo: ["", Validators.required],
  //       SubLocationName: ["", Validators.required],
  //       LocationShortName: ["", Validators.required],
  //       Mobile1: ["", Validators.required],
  //       Mobile2: [""],
  //       Email: ["", Validators.required],
  //       PortalURL: [""],
  //       HeaderDetail: [""],
  //       FooterDetail: [this.locationObj.FooterDetail],
  //       IsDefaultLocation: [this.locationObj.IsDefaultLocation],
  //       CreatedById: [this.locationObj.CreatedById],
  //       CreatedOn: [this.locationObj.CreatedOn],
  //       AlteredById: [this.locationObj.AlteredById],
  //       AlteredOn: [this.locationObj.AlteredOn],
  //       ActionTypeId: [this.locationObj.ActionTypeId],
  //       UserLogId: [this.locationObj.UserLogId],
  //     }),
  //   });
  // }

  // SetFormOrganization() {
  //   this.AppConfigForm.patchValue({
  //     Organization: {
  //       OrginizationId: this.organizationObj.OrginizationId,
  //       OrginizationName: this.organizationObj.OrginizationName,
  //       CurrencyId: this.organizationObj.CurrencyId,
  //       OrginizationTitle: this.organizationObj.OrginizationTitle,
  //       NTN: this.organizationObj.NTN,
  //       STN: this.organizationObj.STN,
  //     },
  //   });

  //   if (
  //     this.organizationObj.LogoImageURL != null ||
  //     this.organizationObj.LogoImageURL != "" ||
  //     this.organizationObj.LogoImageURL != undefined
  //   ) {
  //     this.isImageSaved = true;
  //     this.cardImageBase64 = this.organizationObj.LogoImageURL;
  //   }
  // }

  // SetFormLocation() {
  //   this.AppConfigForm.patchValue({
  //     Location: {
  //       LocationId: this.locationObj.LocationId,
  //       OrginizationId: this.organizationObj.OrginizationId,
  //       LocationSettingId: this.locationObj.LocationSettingId,
  //       Address: {
  //         CountryId: this.addressObj.CountryId,
  //         ProvinceId: this.addressObj.ProvinceId,
  //         CityId: this.addressObj.CityId,
  //         LocationId: this.addressObj.LocationId,
  //         AddressDetail: this.addressObj.AddressDetail,
  //         Latitude: this.addressObj.Latitude,
  //         Longitude: this.addressObj.Longitude,
  //         Altitude: this.addressObj.Altitude,
  //       },
  //       LocationTypeProfileId: this.locationObj.LocationTypeProfileId,
  //       LocationName: this.locationObj.LocationName,
  //       LicenseNo: this.locationObj.LicenseNo,
  //       SubLocationName: this.locationObj.SubLocationName,
  //       LocationShortName: this.locationObj.LocationShortName,
  //       Mobile1: this.locationObj.Mobile1,
  //       Mobile2: this.locationObj.Mobile2,
  //       Email: this.locationObj.Email,
  //       PortalURL: this.locationObj.PortalURL,
  //       HeaderDetail: this.locationObj.HeaderDetail,
  //       FooterDetail: this.locationObj.FooterDetail,
  //       IsDefaultLocation: this.locationObj.IsDefaultLocation,
  //     },
  //   });
  // }
  }
  getLOVs() {
    this.sharedService.GetAllCountries().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      this.countriesLOV = response.Data;
      console.log(response);
    });
    this.sharedService.GetAllCurrencies().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      this.currencyLOV = response.Data;
      console.log(response);
    });
    this.sharedService.GetAllLocationType().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      this.locationTypeLOV = response.Data;
      console.log(response);
    });
  }
  async GetOrganization() {
    this.userService.GetOrganization().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.organizationObj = response.Data[0];

        if (
          this.organizationObj.Logo != null ||
          this.organizationObj.Logo != ""
        )
          var base64 = this._arrayBufferToBase64(this.organizationObj.Logo);

        console.log(base64);
        this.organizationObj.LogoImageURL = "data:image/png;base64," + base64;
        console.log(this.organizationObj.LogoImageURL);
        console.log(this.organizationObj);
        // this.SetFormOrganization();
      } else {
        console.warn(response);
        this.notificationService.showToast('success',response.Message,'','top-right');
      }
    });
  }

  _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  async GetLocation() {
    this.userService.GetLocation().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.locationObj = response.Data[0];
        this.addressObj.AddressId = this.locationObj.AddressId;
        this.addressObj.AddressDetail = this.locationObj.AddressDetail;
        this.addressObj.CityId = this.locationObj.CityId;
        this.addressObj.CountryId = this.locationObj.CountryId;
        this.addressObj.ProvinceId = this.locationObj.ProvinceId;
        this.addressObj.Longitude = this.locationObj.Longitude;
        this.addressObj.Latitude = this.locationObj.Latitude;
        this.addressObj.Altitude = this.locationObj.Altitude;
        this.GetProvinceByCountry(this.addressObj.CountryId);
        this.GetCityByProvince(this.addressObj.ProvinceId);
        console.log(this.locationObj);
        console.log(this.addressObj);
        // this.SetFormLocation();
      } else {
        console.warn(response);
      }
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
    console.log("ProvinceIDSelected",provinceId)
    this.sharedService.GetCitiesByProvince(provinceId).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      this.citiesLOV = response.Data;
      console.log(this.citiesLOV);
      console.log(response);
    });
  }
  GetSecondaryLOV() {
    debugger;
    console.log("GetSecondaryLOV");
    var selectedCountry = this.AppConfigForm.get("Location")
      .get("Address")
      .get("CountryId").value;
    var selectedProvince = this.AppConfigForm.get("Location")
      .get("Address")
      .get("ProvinceId").value;

    console.log(selectedCountry);
    console.log(selectedProvince);
    if (
      (selectedCountry != undefined && selectedProvince == undefined) ||
      selectedProvince == ""
    ) {
      this.GetProvinceByCountry(selectedCountry);
    } else if (selectedProvince != undefined && selectedCountry != undefined) {
      this.GetCityByProvince(selectedProvince);
    }
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ["image/png"];
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
  // get OrginizationId() {
  //   return this.AppConfigForm.get("Organization").get("OrginizationId");
  // }
  // get OrginizationSettingId() {
  //   return this.AppConfigForm.get("Organization").get("OrginizationSettingId");
  // }
  // get CurrencyId() {
  //   return this.AppConfigForm.get("Organization").get("CurrencyId");
  // }
  // get OrginizationName() {
  //   return this.AppConfigForm.get("Organization").get("OrginizationName");
  // }
  // get OrginizationTitle() {
  //   return this.AppConfigForm.get("Organization").get("OrginizationTitle");
  // }
  // get NTN() {
  //   return this.AppConfigForm.get("Organization").get("NTN");
  // }
  // get STN() {
  //   return this.AppConfigForm.get("Organization").get("STN");
  // }
  // get Logo() {
  //   return this.AppConfigForm.get("Organization").get("Logo");
  // }
  // get WaterMark() {
  //   return this.AppConfigForm.get("Organization").get("WaterMark");
  // }
  // get Certificate1() {
  //   return this.AppConfigForm.get("Organization").get("Certificate1");
  // }
  // get Certificate2() {
  //   return this.AppConfigForm.get("Organization").get("Certificate2");
  // }
  // get LocationId() {
  //   return this.AppConfigForm.get("Location").get("LocationId");
  // }
  // get LocationSettingId() {
  //   return this.AppConfigForm.get("Location").get("LocationSettingId");
  // }
  // get AddressId() {
  //   return this.AppConfigForm.get("Location").get("AddressId");
  // }
  // get LocationTypeProfileId() {
  //   return this.AppConfigForm.get("Location").get("LocationTypeProfileId");
  // }
  // get LocationName() {
  //   return this.AppConfigForm.get("Location").get("LocationName");
  // }
  // get LicenseNo() {
  //   return this.AppConfigForm.get("Location").get("LicenseNo");
  // }
  // get SubLocationName() {
  //   return this.AppConfigForm.get("Location").get("SubLocationName");
  // }
  // get LocationShortName() {
  //   return this.AppConfigForm.get("Location").get("LocationShortName");
  // }
  // get Mobile1() {
  //   return this.AppConfigForm.get("Location").get("Mobile1");
  // }
  // get Mobile2() {
  //   return this.AppConfigForm.get("Location").get("Mobile2");
  // }
  // get Email() {
  //   return this.AppConfigForm.get("Location").get("Email");
  // }
  // get PortalURL() {
  //   return this.AppConfigForm.get("Location").get("PortalURL");
  // }
  // get HeaderDetail() {
  //   return this.AppConfigForm.get("Location").get("HeaderDetail");
  // }
  // get FooterDetail() {
  //   return this.AppConfigForm.get("Location").get("FooterDetail");
  // }
  // get IsDefaultLocation() {
  //   return this.AppConfigForm.get("Location").get("IsDefaultLocation");
  // }

  // Validation Elements

  // Form Submission

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
        if (flag) {
          this.PostLocation();
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

  PostLocation() {
    console.log("Post Location OBj");
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
  // Form Submission
}
