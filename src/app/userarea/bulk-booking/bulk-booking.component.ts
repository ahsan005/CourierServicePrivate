import { OrderBookingForm } from "./../../models/order-booking-form";
import { FileuploadService } from "./../../services/fileupload.service";
import { HttpClient } from "@angular/common/http";
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
@Component({
  selector: "ngx-bulk-booking",
  templateUrl: "./bulk-booking.component.html",
  styleUrls: ["./bulk-booking.component.scss"],
})
export class BulkBookingComponent implements OnInit {
  @ViewChild("fileInput") fileInput;
  message: string;
  constructor(private http: HttpClient, private service: FileuploadService) {}

  ngOnInit(): void {}
  // uploadFile() {
  //   let formData = new FormData();
  //   formData.append('upload', this.fileInput.nativeElement.files[0])

  //   this.service.UploadExcel(formData).subscribe(result => {
  //     this.message = result.toString();
  //     console.log(result);

  //   });

  // }
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
      });console.log(bulkBookingList);
    };

  }
}
