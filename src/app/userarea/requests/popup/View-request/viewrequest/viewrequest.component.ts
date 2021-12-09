import { OrderBookingForm } from "./../../../../../models/order-booking-form";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { TableUtil } from "../../../../../utilities/tableutil";

@Component({
  selector: "ngx-viewrequest",
  templateUrl: "./viewrequest.component.html",
  styleUrls: ["./viewrequest.component.scss"],
})
export class ViewrequestComponent implements OnInit {
  public orderBookingModel: OrderBookingForm;
  public citiesLOV: Array<any> = [];
  BarcodeID: string;
  constructor(public modal: NgbActiveModal) {
  }
//   async function () {
//     await this.barcode.exportAsBase64Image('JPG');
// };
  ngOnInit(): void {}

  viewPDFInvoice(){
    TableUtil.generatePdf(this.orderBookingModel)
    }

}
