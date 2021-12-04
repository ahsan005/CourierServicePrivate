import { NotificationService } from './../../services/notification.service';
import * as $ from "jquery";
import { CitiesLOV } from "./../../models/citiesLOV";
import { SharedService } from "./../../services/shared.service";
import { OrderBookingForm } from "./../../models/order-booking-form";
import { FileuploadService } from "./../../services/fileupload.service";
import { HttpClient } from "@angular/common/http";
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
import { UserService } from "../../services/user.service";
import { WeightLOV } from "../../models/weightLOV";
@Component({
  selector: "ngx-bulk-booking",
  templateUrl: "./bulk-booking.component.html",
  styleUrls: ["./bulk-booking.component.scss"],
})
export class BulkBookingComponent implements OnInit {
  @ViewChild("fileInput") fileInput;
  p: number = 1;
  message: string;
  serial: number = 0;
  citiesLOV = new Array<CitiesLOV>();
  weightLOV: Array<WeightLOV> = [
    { Value: "1", Text: "0.5" },
    { Value: "2", Text: "1" },
    { Value: "3", Text: "2" },
    { Value: "4", Text: "3" },
    { Value: "5", Text: "4" },
    { Value: "6", Text: "5" },
    { Value: "7", Text: "6" },
    { Value: "8", Text: "7" },
    { Value: "9", Text: "8" },
    { Value: "10", Text: "9" },
    { Value: "11", Text: "10" },
    { Value: "12", Text: "11" },
    { Value: "13", Text: "12" },
    { Value: "14", Text: "13" },
    { Value: "15", Text: "14" },
    { Value: "16", Text: "15" },
    { Value: "17", Text: "16" },
    { Value: "18", Text: "17" },
    { Value: "19", Text: "18" },
    { Value: "20", Text: "19" },
    { Value: "21", Text: "20" },
  ];
  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.sharedService.GetAllCities().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);

      this.citiesLOV = response.Data;
    });

    $(document).ready(function () {
      console.log("HelloDefault");
      $("#showdata").click(function () {
        console.log("Hello");
        $("#table").toggle();
      });
    });
  }
  // uploadFile() {
  //   let formData = new FormData();
  //   formData.append('upload', this.fileInput.nativeElement.files[0])

  //   this.service.UploadExcel(formData).subscribe(result => {
  //     this.message = result.toString();
  //     console.log(result);

  //   });

  // }
  excelArray: Array<OrderBookingForm>;
  uploadFile(event: any) {
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    // bulkBookingList = new Array<OrderBookingForm>
    let bulkBookingList = [];
    fileReader.onload = (event) => {
      console.log(event);
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        bulkBookingList = data;
      });
      this.excelArray = bulkBookingList;


      console.log(this.citiesLOV);

      console.log(bulkBookingList);
      console.log(this.excelArray);
    };
  }
// Add Corresponding CityID's in Array
  UploadBtn() {
    let array = this.excelArray;
    let cities = this.citiesLOV;
    let weightList = this.weightLOV;
    let originCityObj;
    let destinationCityObj;
    let weightObj;
    console.log(array);
    array.forEach(
      function (item) {
        originCityObj = cities.find((x) => x.Text.toUpperCase() == item.OriginCityName.toUpperCase());

        destinationCityObj = cities.find(
          (x) => x.Text.toUpperCase() == item.DestinationCityName.toUpperCase()
        );
        weightObj = weightList.find(
          (x) => x.Text == String(item.WeightProfileId)
        );

        if (originCityObj != null) {
          item.OriginCityId = parseInt(originCityObj.Value);
        }

        if (destinationCityObj != null) {
          item.DestinationCityId = parseInt(destinationCityObj.Value);
        }
        if (weightObj != null) {
          item.WeightProfileId = parseInt(weightObj.Value);
        }
        item.LocationId = parseInt(localStorage.getItem("LOCATIONID"))
        item.CreatedById = parseInt(localStorage.getItem("USERID"))
      }

      // Add Corresponding CityID's in Array
    );
    console.log(array);
    this.excelArray = [];
    this.excelArray = array;
    // Make Request to HTTPService

    this.PostBulk(array);
    // Make Request to HTTPService
  }

  PostBulk(array: Array<OrderBookingForm>) {
    if (array.length > 0) {
      this.userService.BulkOrders(array).subscribe((result) => {
        var response = JSON.parse(JSON.stringify(result));
       if(response.Status)
       this.notificationService.showToast('success',response.Message)
    else{
      this.notificationService.showToast('danger',response.Message)
    }

      });
    }
  }
}
