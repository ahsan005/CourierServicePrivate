import { NotificationService } from "./../../../../services/notification.service";
import { SharedService } from "./../../../../services/shared.service";
import { OrderBookingForm } from "./../../../../models/order-booking-form";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { TableUtil } from "../../../../utilities/tableutil";
import { LOV } from "../../../../models/citiesLOV";
import { UserService } from "../../../../services/user.service";
import { Voucher } from "../../../../models/Voucher";
import { VoucherDetail } from "../../../../models/VoucherDetail";

@Component({
  selector: "ngx-viewrequest",
  templateUrl: "./viewrequest.component.html",
  styleUrls: ["./viewrequest.component.scss"],
})
export class ViewrequestComponent implements OnInit {
  public orderBookingModel: OrderBookingForm;
  public citiesLOV: Array<any> = [];
  VoucherArray = new Array<Voucher>();
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
    var statusToUpdate = this.StatusLOV.find((i) => {
      if (parseInt(i.Value) == this.StatusProfileId) {
        return true;
      } else return false;
    });
    if (this.StatusProfileId != null) {
      if (statusToUpdate.Text.toUpperCase() == "DELIVERED") {
        var voucherObj = new Voucher();
        voucherObj.CreatedById = parseInt(localStorage.getItem("USERID"));
        voucherObj.LocationId = parseInt(localStorage.getItem("LOCATIONID"));
        // voucherObj.NetAmount = this.orderBookingModel.CODAmount - this.orderBookingModel.DeliveryFee;
        voucherObj.ShiftId = null;
        voucherObj.ShiftRecordId = null;
        voucherObj.CancelRemarks = null;
        voucherObj.DiscountAmount = null;

        var TotalPayable =
          this.orderBookingModel.CODAmount - this.orderBookingModel.DeliveryFee;
        voucherObj.TotalCredit = TotalPayable;
        voucherObj.VoucherTypeProfileId = 109;
        voucherObj.DocMovementId = 280;
        voucherObj.TotalDebit = voucherObj.TotalCredit;
        voucherObj.TaxPercent = 0;
        voucherObj.VoucherTypeProfileId;
        voucherObj.OrderBookingId = this.orderBookingModel.OrderBookingId;
        voucherObj.DocumentOrigin = "ORDER-DELIVERED";
        if (voucherObj.TaxPercent != null || voucherObj.TaxPercent != 0) {
          voucherObj.TaxAmount =
            (this.orderBookingModel.DeliveryFee * voucherObj.TaxPercent) / 100;
        }
        voucherObj.Narration =
          "Cash Amount Rs." +
          TotalPayable +
          "paid to " +
          this.orderBookingModel.PartyName +
          " " +
          this.orderBookingModel.PartyLocationName;

        // Invoice Voucher Voucher Detail COR Payable (Voucher#1)

        var voucherDetailObj = new VoucherDetail();
        voucherDetailObj.VoucherMode = "D";
        voucherDetailObj.AccountId = 460001;
        voucherDetailObj.CreditAmount = 0;
        voucherDetailObj.ProductId = this.orderBookingModel.OrderBookingId;
        voucherDetailObj.DebitAmount = TotalPayable;
        voucherDetailObj.PartyId = this.orderBookingModel.PartyId;
        // voucherDetailObj.ProductId = this.orderBookingModel.OrderBookingId;
        // voucherDetailObj.ProductId = 46000001;
        voucherDetailObj.PartyLocationId =
          this.orderBookingModel.PartyLocationId;

        voucherDetailObj.VoucherDetailLineId = null;
        voucherDetailObj.AccountMappingControlId = null;
        voucherDetailObj.ServiceId = null;
        voucherDetailObj.EmployeeId = null;
        voucherDetailObj.ProjectId = null;
        voucherDetailObj.ServiceId = null;
        voucherDetailObj.EntryMode = null;
        voucherDetailObj.TaxId = null;
        voucherDetailObj.DiscountAmount = null;
        voucherDetailObj.LineDescription =
          "Cash Amount Paid to " +
          this.orderBookingModel.PartyName +
          " For The booked Parcels Rs." +
          TotalPayable +
          "paid to " +
          this.orderBookingModel.PartyLocationName;
        // Add To VOucher Obj
        voucherObj.VoucherDetail1 = voucherDetailObj;

        // Invoice Voucher Voucher Detail COR Payable (Voucher#1)

        // Invoice Voucher Voucher Detail COR Expense (Voucher#1)

        var voucherDetailObj = new VoucherDetail();
        voucherDetailObj.VoucherMode = "C";
        voucherDetailObj.CreditAmount = TotalPayable;
        voucherDetailObj.AccountId = 460002;
        // voucherDetailObj.ProductId = 46000001;
        voucherDetailObj.DebitAmount = 0;
        voucherDetailObj.PartyId = this.orderBookingModel.PartyId;
        // voucherDetailObj.ProductId = this.orderBookingModel.OrderBookingId;
        voucherDetailObj.PartyLocationId =
          this.orderBookingModel.PartyLocationId;
        voucherDetailObj.LineDescription =
          "Cash Amount Paid to " +
          this.orderBookingModel.PartyName +
          " For The booked Parcels Rs." +
          TotalPayable +
          "paid to " +
          this.orderBookingModel.PartyLocationName;
        voucherObj.VoucherDetail2 = voucherDetailObj;

        // Invoice Voucher Voucher Detail COR Expense (Voucher#1)
        this.VoucherArray.push(voucherObj);

        // Invoice Voucher (Voucher#1)

        //Payment Voucher (Voucher#2)

        var voucherObj = new Voucher();
        voucherObj.CreatedById = parseInt(localStorage.getItem("USERID"));
        voucherObj.LocationId = parseInt(localStorage.getItem("LOCATIONID"));
        // voucherObj.NetAmount = this.orderBookingModel.CODAmount - this.orderBookingModel.DeliveryFee;
        var TotalPayable =
          this.orderBookingModel.CODAmount - this.orderBookingModel.DeliveryFee;
        voucherObj.TotalCredit = TotalPayable;
        voucherObj.VoucherTypeProfileId = 106;
        voucherObj.DocMovementId = 281;
        voucherObj.TotalDebit = voucherObj.TotalCredit;
        voucherObj.TaxPercent = 0;
        voucherObj.VoucherTypeProfileId;
        voucherObj.OrderBookingId = this.orderBookingModel.OrderBookingId;
        voucherObj.DocumentOrigin = "ORDER-DELIVERED";

        if (voucherObj.TaxPercent != null || voucherObj.TaxPercent != 0) {
          voucherObj.TaxAmount =
            (this.orderBookingModel.DeliveryFee * voucherObj.TaxPercent) / 100;
        }
        voucherObj.Narration =
          "Cash Amount Rs." +
          TotalPayable +
          "paid to " +
          this.orderBookingModel.PartyName +
          " " +
          this.orderBookingModel.PartyLocationName;

        // Payment Voucher Voucher Detail COR Payable (Voucher#2)

        var voucherDetailObj = new VoucherDetail();
        voucherDetailObj.VoucherMode = "C";
        voucherDetailObj.AccountId = 460001;
        voucherDetailObj.ProductId = this.orderBookingModel.OrderBookingId;
        voucherDetailObj.CreditAmount = TotalPayable;
        voucherDetailObj.DebitAmount = 0;
        // voucherDetailObj.ProductId = 46000001;

        voucherDetailObj.PartyId = this.orderBookingModel.PartyId;
        // voucherDetailObj.ProductId = this.orderBookingModel.OrderBookingId;
        voucherDetailObj.PartyLocationId =
          this.orderBookingModel.PartyLocationId;
        voucherDetailObj.LineDescription =
          "Cash Amount Paid to " +
          this.orderBookingModel.PartyName +
          " For The booked Parcels Rs." +
          TotalPayable +
          "paid to " +
          this.orderBookingModel.PartyLocationName;
        // push To Array
        voucherObj.VoucherDetail1 = voucherDetailObj;

        // Payment Voucher Voucher Detail COR Payable (Voucher#2)

        // Payment Voucher Voucher Detail Party Cash (Voucher#2)

        var voucherDetailObj = new VoucherDetail();
        voucherDetailObj.VoucherMode = "D";
        voucherDetailObj.AccountId = 460002;
        voucherDetailObj.CreditAmount = 0;
        voucherDetailObj.DebitAmount = TotalPayable;
        voucherDetailObj.PartyId = this.orderBookingModel.PartyId;
        // voucherDetailObj.ProductId = this.orderBookingModel.OrderBookingId;

        voucherDetailObj.PartyLocationId =
          this.orderBookingModel.PartyLocationId;
        voucherDetailObj.LineDescription =
          "Cash Amount Paid to " +
          this.orderBookingModel.PartyName +
          " For The booked Parcels Rs." +
          TotalPayable +
          "paid to " +
          this.orderBookingModel.PartyLocationName;
        voucherObj.VoucherDetail2 = voucherDetailObj;
        this.VoucherArray.push(voucherObj);
      }
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
            if (this.VoucherArray.length > 0) {
              console.log(this.VoucherArray);
              this.userService
                .PostVouchers(this.VoucherArray)
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

            this.userService.filter("refresh List on Status Update");
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
