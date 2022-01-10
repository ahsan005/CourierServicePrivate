import { NotificationService } from "./../../../../services/notification.service";
import { SharedService } from "./../../../../services/shared.service";
import { OrderBookingForm } from "./../../../../models/order-booking-form";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { TableUtil } from "../../../../utilities/tableutil";
import { LOV } from "../../../../models/citiesLOV";
import { UserService } from "../../../../services/user.service";

@Component({
  selector: "ngx-viewrequest",
  templateUrl: "./viewrequest.component.html",
  styleUrls: ["./viewrequest.component.scss"],
})
export class ViewrequestComponent implements OnInit {
  public orderBookingModel: OrderBookingForm;
  public citiesLOV: Array<any> = [];
  public StatusLOV = new Array<LOV>();
  BarcodeID: string;
  StatusProfileId: number;
  OrderBookingId: number;
  constructor(
    public modal: NgbActiveModal,
    private userService: UserService,
    private sharedService: SharedService,
    private notificationService: NotificationService
  ) {}
  //   async function () {
  //     await this.barcode.exportAsBase64Image('JPG');
  // };
  ngOnInit(): void {
    console.log(this.orderBookingModel.StatusProfileId);
    this.StatusProfileId = this.orderBookingModel.StatusProfileId;
    this.OrderBookingId = this.orderBookingModel.OrderBookingId;
  }
  setTimeout;
  onUpdateSpinner = false;
  UpdateStatusBtn() {
    if (this.StatusProfileId != null) {
      this.onUpdateSpinner = true;
      this.userService
        .UpdateOrderStatus(this.OrderBookingId, this.StatusProfileId)
        .subscribe((data) => {
          var response = JSON.parse(JSON.stringify(data));
          if (response.Status) {
            this.notificationService.showToast(
              "success",
              response.Message,
              "",
              "top-right"
            );
            this.modal.close();
            this.onUpdateSpinner = false;
          } else {
            this.notificationService.showToast(
              "danger",
              response.Message,
              "",
              "top-right"
            );
            console.warn(response.Message);
            this.setTimeout(() => {
              this.onUpdateSpinner = false;
            }, 2000);
          }
        });
    }
  }
  viewPDFInvoice() {
    TableUtil.generatePdfInvoice(this.orderBookingModel);
  }
}
