import { AddfinancialaccountComponent } from "./../popup/addfinancialaccount/addfinancialaccount.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FinanacialAccount } from "./../../../models/FinancialAccount";
import { Component, Input, OnInit } from "@angular/core";
import { TableUtil } from "../../../utilities/tableutil";
import { UserService } from "../../../services/user.service";
import { NotificationService } from "../../../services/notification.service";
import { LOV } from "../../../models/citiesLOV";
import { AccountSubType } from "../../../models/AccountSubType";
import { Observable, timer } from "rxjs";
import { CourierSetting } from "../../../models/courier-settings";
import { Calculation } from "../../../models/Calculation";
import { OrderBookingForm } from "../../../models/order-booking-form";
import { CustomerInfo } from "../../../models/CustomerInfo";
import { SharedService } from "../../../services/shared.service";
import { VoucherDetail } from "../../../models/VoucherDetail";
import { Voucher } from "../../../models/Voucher";
import { VoucherPostObj } from "../../../models/VoucherPostObj";
import { EditForOrderReceivingComponent } from "../../order-receiving/edit-for-order-receiving/edit-for-order-receiving.component";

@Component({
  selector: "ngx-orders-paid-for",
  templateUrl: "./orders-paid-for.component.html",
  styleUrls: ["./orders-paid-for.component.scss"],
})
export class OrdersPaidForComponent implements OnInit {
  searchVal: any;
  startDate: Date;
  endDateErrorCorrected: Date;
  startDateErrorCorrected: Date;
  endDate: Date;
  courierSetting = new CourierSetting();
  CalculatedValues = new Calculation();
  unFiteredOrders;
  curatedEndDate;
  loadingSpinner: boolean = false;
  p: number = 1;
  // Array to hold selected Rows
  selectedArray = new Array<OrderBookingForm>();
  // Array to hold selected Rows
  UserId;
  PartyList = new Array<CustomerInfo>();
  BookedOrderList = new Array<OrderBookingForm>();
  VoucherList = new Array<Voucher>();
  checkedList: any;
  masterSelector: boolean;
  constructor(
    private modalService: NgbModal,
    private sharedService: SharedService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.sharedService.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshList();
    });
  }

  RefreshBookedOrderList() {
    var userId = this.UserId;
    this.userService.GetOrdersByUserId(userId).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.BookedOrderList = response.Data;
        console.log(this.BookedOrderList);
      } else {
        console.warn(response.Message);
        this.notificationService.showToast(
          "success",
          response.Message,
          "",
          "top-right"
        );
      }
    });
    // var locationId = parseInt(localStorage.getItem("LOCATIONID"));
    // this.userService.GetVouchersByLocationId(locationId).subscribe((data) => {
    //   var response = JSON.parse(JSON.stringify(data));
    //   if (response.Status) {
    //     this.VoucherList = response.Data;
    //     console.log(this.VoucherList);
    //   } else {
    //     console.warn(response.Message);
    //     this.notificationService.showToast(
    //       "success",
    //       response.Message,
    //       "",
    //       "top-right"
    //     );
    //   }
    // });
  }
  CalculateAggregates() {
    debugger;
    var TotalCODAmount = 0;
    var TotalDeliveryFee = 0;
    var TotalPayable = 0;
    var TotalGST = 0;
    var TotalOrders = 0;
    if (this.selectedArray.length < 1) {
      this.BookedOrderList.forEach((element) => {
        TotalCODAmount = TotalCODAmount + element.CODAmount;
        TotalDeliveryFee = TotalDeliveryFee + element.DeliveryFee;
      });
      if (this.courierSetting.GSTPercentage > 0) {
        TotalGST = Math.round(
          (TotalDeliveryFee * this.courierSetting.GSTPercentage) / 100
        );
      }

      TotalPayable = Math.round(TotalCODAmount - TotalDeliveryFee + TotalGST);
      TotalOrders = this.BookedOrderList.length;
    } else {
      this.selectedArray.forEach((element) => {
        TotalCODAmount = TotalCODAmount + element.CODAmount;
        TotalDeliveryFee = TotalDeliveryFee + element.DeliveryFee;
      });
      if (this.courierSetting.GSTPercentage > 0) {
        TotalGST = Math.round(
          (TotalDeliveryFee * this.courierSetting.GSTPercentage) / 100
        );
      }
      TotalPayable = Math.round(TotalCODAmount - TotalDeliveryFee + TotalGST);
      TotalOrders = this.selectedArray.length;
    }
    this.CalculatedValues.TotalCODAmount = TotalCODAmount;
    this.CalculatedValues.TotalGST = TotalGST;
    this.CalculatedValues.TotalDeliveryFee = TotalDeliveryFee;
    this.CalculatedValues.TotalPayable = TotalPayable;
    this.CalculatedValues.TotalOrders = TotalOrders;
    console.log(this.CalculatedValues);
  }
  VoucherArray = new Array<Voucher>();
  VoucherDetailArray = new Array<VoucherDetail>();
  voucherPostObj = new VoucherPostObj();
  ConfirmRefundBtn() {
    if (confirm("Are you sure you want to confirm receiving ?")) {
      console.log(this.selectedArray.length > 0);
      if (this.selectedArray.length > 0) {
        this.selectedArray.forEach((element) => {
          //Courier Invoice Voucher (Voucher#1)
          var voucherObj = new Voucher();
          voucherObj.CreatedById = parseInt(localStorage.getItem("USERID"));
          voucherObj.LocationId = parseInt(localStorage.getItem("LOCATIONID"));
          // voucherObj.NetAmount = element.CODAmount - element.DeliveryFee;
          voucherObj.ShiftId = null;
          voucherObj.ShiftRecordId = null;
          voucherObj.CancelRemarks = null;
          voucherObj.DiscountAmount = null;
          // Bill Record For Party
          var TotalPayable = element.CODAmount - element.DeliveryFee;
          voucherObj.TotalCredit = TotalPayable;
          voucherObj.VoucherTypeProfileId = 109;
          voucherObj.DocMovementId = 280;
          voucherObj.TotalDebit = voucherObj.TotalCredit;
          voucherObj.TaxPercent = this.courierSetting.GSTPercentage;
          voucherObj.VoucherTypeProfileId;
          voucherObj.OrderBookingId = element.OrderBookingId;
          voucherObj.DocumentOrigin = "ORDER-REFUND";

          if (voucherObj.TaxPercent != null || voucherObj.TaxPercent != 0) {
            voucherObj.TaxAmount =
              (element.DeliveryFee * voucherObj.TaxPercent) / 100;
          }
          voucherObj.Narration =
            "Cash Amount Rs." +
            TotalPayable +
            "Refunded to " +
            element.PartyName +
            " " +
            element.PartyLocationName;

          var voucherDetailObj = new VoucherDetail();
          voucherDetailObj.VoucherMode = "D";
          voucherDetailObj.AccountId = 460001;
          voucherDetailObj.CreditAmount = 0;
          voucherDetailObj.ProductId = element.OrderBookingId;
          voucherDetailObj.DebitAmount = TotalPayable;
          voucherDetailObj.PartyId = element.PartyId;
          // voucherDetailObj.ProductId = element.OrderBookingId;
          // voucherDetailObj.ProductId = 46000001;
          voucherDetailObj.PartyLocationId = element.PartyLocationId;

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
            element.PartyName +
            " For The booked Parcels Rs." +
            TotalPayable +
            "paid to " +
            element.PartyLocationName;
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
          voucherDetailObj.PartyId = element.PartyId;
          // voucherDetailObj.ProductId = element.OrderBookingId;
          voucherDetailObj.PartyLocationId = element.PartyLocationId;
          voucherDetailObj.LineDescription =
            "Cash Amount Paid to " +
            element.PartyName +
            " For The booked Parcels Rs." +
            TotalPayable +
            "paid to " +
            element.PartyLocationName;
          voucherObj.VoucherDetail2 = voucherDetailObj;

          // Invoice Voucher Voucher Detail COR Expense (Voucher#1)
          this.VoucherArray.push(voucherObj);

          // Invoice Voucher (Voucher#1)

          //Payment Voucher (Voucher#2)

          var voucherObj = new Voucher();
          voucherObj.CreatedById = parseInt(localStorage.getItem("USERID"));
          voucherObj.LocationId = parseInt(localStorage.getItem("LOCATIONID"));
          // voucherObj.NetAmount = element.CODAmount - element.DeliveryFee;
          var TotalPayable = element.CODAmount - element.DeliveryFee;
          voucherObj.TotalCredit = TotalPayable;
          voucherObj.VoucherTypeProfileId = 106;
          voucherObj.DocMovementId = 281;
          voucherObj.TotalDebit = voucherObj.TotalCredit;
          voucherObj.TaxPercent = this.courierSetting.GSTPercentage;
          voucherObj.VoucherTypeProfileId;
          voucherObj.OrderBookingId = element.OrderBookingId;
          voucherObj.DocumentOrigin = "ORDER-REFUND";

          if (voucherObj.TaxPercent != null || voucherObj.TaxPercent != 0) {
            voucherObj.TaxAmount =
              (element.DeliveryFee * voucherObj.TaxPercent) / 100;
          }
          voucherObj.Narration =
            "Cash Amount Rs." +
            TotalPayable +
            "paid to " +
            element.PartyName +
            " " +
            element.PartyLocationName;

          // Payment Voucher Voucher Detail COR Payable (Voucher#2)

          var voucherDetailObj = new VoucherDetail();
          voucherDetailObj.VoucherMode = "C";
          voucherDetailObj.AccountId = 460001;
          voucherDetailObj.ProductId = element.OrderBookingId;
          voucherDetailObj.CreditAmount = TotalPayable;
          voucherDetailObj.DebitAmount = 0;
          // voucherDetailObj.ProductId = 46000001;

          voucherDetailObj.PartyId = element.PartyId;
          // voucherDetailObj.ProductId = element.OrderBookingId;
          voucherDetailObj.PartyLocationId = element.PartyLocationId;
          voucherDetailObj.LineDescription =
            "Cash Amount Paid to " +
            element.PartyName +
            " For The booked Parcels Rs." +
            TotalPayable;
          // push To Array
          voucherObj.VoucherDetail1 = voucherDetailObj;

          // Payment Voucher Voucher Detail COR Payable (Voucher#2)

          // Payment Voucher Voucher Detail Party Cash (Voucher#2)

          var voucherDetailObj = new VoucherDetail();
          voucherDetailObj.VoucherMode = "D";
          voucherDetailObj.AccountId = 460002;
          voucherDetailObj.CreditAmount = 0;
          voucherDetailObj.DebitAmount = TotalPayable;
          voucherDetailObj.PartyId = element.PartyId;
          // voucherDetailObj.ProductId = element.OrderBookingId;

          voucherDetailObj.PartyLocationId = element.PartyLocationId;
          voucherDetailObj.LineDescription =
            "Cash Amount Paid to " +
            element.PartyName +
            " For The booked Parcels Rs." +
            TotalPayable;
          voucherObj.VoucherDetail2 = voucherDetailObj;

          // Payment Voucher Voucher Detail Party Cash (Voucher#2)

          this.VoucherArray.push(voucherObj);
          //Payment Voucher (Voucher#2)

          // 2nd pair of Vouchers
          // Courier Invoice  Voucher (Voucher#1)
          var voucherObj = new Voucher();
          voucherObj.CreatedById = parseInt(localStorage.getItem("USERID"));
          voucherObj.LocationId = parseInt(localStorage.getItem("LOCATIONID"));
          // voucherObj.NetAmount = element.CODAmount - element.DeliveryFee;
          voucherObj.ShiftId = null;
          voucherObj.ShiftRecordId = null;
          voucherObj.CancelRemarks = null;
          voucherObj.DiscountAmount = null;

          var TotalPayable = element.CODAmount - element.DeliveryFee;
          voucherObj.TotalCredit = TotalPayable;
          voucherObj.VoucherTypeProfileId = 109;
          voucherObj.DocMovementId = 280;
          voucherObj.TotalDebit = voucherObj.TotalCredit;
          voucherObj.TaxPercent = this.courierSetting.GSTPercentage;
          voucherObj.VoucherTypeProfileId;
          voucherObj.OrderBookingId = element.OrderBookingId;
          voucherObj.DocumentOrigin = "ORDER-REFUND";

          if (voucherObj.TaxPercent != null || voucherObj.TaxPercent != 0) {
            voucherObj.TaxAmount =
              (element.DeliveryFee * voucherObj.TaxPercent) / 100;
          }
          voucherObj.Narration =
            "Cash Amount Rs." +
            TotalPayable +
            "paid to " +
            element.PartyName +
            " " +
            element.PartyLocationName;

          // Invoice Voucher Voucher Detail COR Payable (Voucher#1)

          var voucherDetailObj = new VoucherDetail();
          voucherDetailObj.VoucherMode = "C";
          voucherDetailObj.AccountId = 460001;
          voucherDetailObj.CreditAmount = TotalPayable;
          voucherDetailObj.ProductId = element.OrderBookingId;
          voucherDetailObj.DebitAmount = 0;
          voucherDetailObj.PartyId = element.PartyId;
          // voucherDetailObj.ProductId = element.OrderBookingId;
          // voucherDetailObj.ProductId = 46000001;
          voucherDetailObj.PartyLocationId = element.PartyLocationId;

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
            element.PartyName +
            " For The booked Parcels Rs." +
            TotalPayable;

          // Add To VOucher Obj
          voucherObj.VoucherDetail1 = voucherDetailObj;

          // Invoice Voucher Voucher Detail COR Payable (Voucher#1)

          // Invoice Voucher Voucher Detail COR Expense (Voucher#1)

          var voucherDetailObj = new VoucherDetail();
          voucherDetailObj.VoucherMode = "D";
          voucherDetailObj.CreditAmount = 0;
          voucherDetailObj.AccountId = 460002;
          // voucherDetailObj.ProductId = 46000001;
          voucherDetailObj.DebitAmount = TotalPayable;
          voucherDetailObj.PartyId = element.PartyId;
          // voucherDetailObj.ProductId = element.OrderBookingId;
          voucherDetailObj.PartyLocationId = element.PartyLocationId;
          voucherDetailObj.LineDescription =
            "Cash Amount Paid to " +
            element.PartyName +
            " For The booked Parcels Rs." +
            TotalPayable;
          voucherObj.VoucherDetail2 = voucherDetailObj;

          // Invoice Voucher Voucher Detail COR Expense (Voucher#1)
          this.VoucherArray.push(voucherObj);

          // Invoice Voucher (Voucher#1)

          //Cash Receipt For Courier Voucher (Voucher#2)

          var voucherObj = new Voucher();
          voucherObj.CreatedById = parseInt(localStorage.getItem("USERID"));
          voucherObj.LocationId = parseInt(localStorage.getItem("LOCATIONID"));
          // voucherObj.NetAmount = element.CODAmount - element.DeliveryFee;
          var TotalPayable = element.CODAmount - element.DeliveryFee;
          voucherObj.TotalCredit = TotalPayable;
          voucherObj.VoucherTypeProfileId = 104;
          voucherObj.DocMovementId = 281;
          voucherObj.TotalDebit = voucherObj.TotalCredit;
          voucherObj.TaxPercent = this.courierSetting.GSTPercentage;
          voucherObj.VoucherTypeProfileId;
          voucherObj.OrderBookingId = element.OrderBookingId;
          voucherObj.DocumentOrigin = "ORDER-REFUND";

          if (voucherObj.TaxPercent != null || voucherObj.TaxPercent != 0) {
            voucherObj.TaxAmount =
              (element.DeliveryFee * voucherObj.TaxPercent) / 100;
          }
          voucherObj.Narration =
            "Cash Amount Rs." +
            TotalPayable +
            "Received From " +
            element.PartyName +
            " " +
            element.PartyLocationName;

          // Payment Voucher Voucher Detail COR Payable (Voucher#2)

          var voucherDetailObj = new VoucherDetail();
          voucherDetailObj.VoucherMode = "D";
          voucherDetailObj.AccountId = 460001;
          voucherDetailObj.ProductId = element.OrderBookingId;
          voucherDetailObj.CreditAmount = TotalPayable;
          voucherDetailObj.DebitAmount = 0;
          // voucherDetailObj.ProductId = 46000001;

          voucherDetailObj.PartyId = element.PartyId;
          // voucherDetailObj.ProductId = element.OrderBookingId;
          voucherDetailObj.PartyLocationId = element.PartyLocationId;
          voucherDetailObj.LineDescription =
            "Cash Amount Received From " +
            element.PartyName +
            " For The booked Parcels Rs." +
            TotalPayable;

          // push To Array
          voucherObj.VoucherDetail1 = voucherDetailObj;

          // Payment Voucher Voucher Detail COR Payable (Voucher#2)

          // Payment Voucher Voucher Detail Party Cash (Voucher#2)

          var voucherDetailObj = new VoucherDetail();
          voucherDetailObj.VoucherMode = "D";
          voucherDetailObj.AccountId = 460002;
          voucherDetailObj.CreditAmount = 0;
          voucherDetailObj.DebitAmount = TotalPayable;
          voucherDetailObj.PartyId = element.PartyId;
          // voucherDetailObj.ProductId = element.OrderBookingId;

          voucherDetailObj.PartyLocationId = element.PartyLocationId;
          voucherDetailObj.LineDescription =
            "Cash Amount Added to Cash Rs." +
            TotalPayable +
            "Received From" +
            element.PartyName;
          voucherObj.VoucherDetail2 = voucherDetailObj;

          // Payment Voucher Voucher Detail Party Cash (Voucher#2)

          this.VoucherArray.push(voucherObj);
          //Payment Voucher (Voucher#2)

          // Payment Voucher Voucher Detail Party Cash (Voucher#2)
        });
        this.userService.PostVouchers(this.VoucherArray).subscribe((data) => {
          var response = JSON.parse(JSON.stringify(data));
          if (response.Status) {
            this.notificationService.showToast(
              "success",
              response.Message,
              "",
              "top-right"
            );
            console.warn(response.Message);
          } else {
            this.notificationService.showToast(
              "danger",
              response.Message,
              "",
              "top-right"
            );
            console.warn(response.Message);
          }
        });
      } else {
        this.notificationService.showToast(
          "warning",
          "Please Select An Order to Refund !",
          "",
          "top-right"
        );
      }

      console.warn(this.VoucherArray);
      console.warn(this.VoucherDetailArray);

      // this.voucherPostObj.VoucherArray = this.VoucherArray;
      // this.voucherPostObj.VoucherDetailArray = this.VoucherDetailArray;
    }
  }
  AddDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  SubtractDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }

  DateFilter() {
    // 12T00:00:00.000Z
    // this.startDate = this.addDays(this.startDate, 1);
    this.startDateErrorCorrected = this.AddDays(this.startDate, 1);

    let StartDate = this.startDateErrorCorrected.toJSON().replace("T19", "T00");
    // .toJSON()
    // .replace("T19:00:00.000", "T23:59:59.999");
    this.endDateErrorCorrected = this.AddDays(this.endDate, 1);
    let EndDate = this.endDateErrorCorrected
      .toJSON()
      .replace("T19:00:00.000", "T23:59:59.999");
    // .toJSON()
    // .replace("T19:00:00.000", "T23:59:59.999");

    debugger;
    if (this.UserId != null && this.BookedOrderList.length > 0) {
      this.unFiteredOrders = this.BookedOrderList;
    }
    if (StartDate != null && EndDate != null && EndDate > StartDate) {
      // this.BookedOrderList = this.unFiteredOrders.filter((x) => {
      //   x.OrderBookingOn > StartDate && x.OrderBookingOn < EndDate
      // });
      console.log(StartDate, EndDate);
      this.BookedOrderList = this.unFiteredOrders.filter(
        (m) =>
          new Date(m.OrderBookingOn) >= new Date(StartDate) &&
          new Date(m.OrderBookingOn) <= new Date(EndDate)
      );

      console.log(this.BookedOrderList);
      this.CalculateAggregates();
    }
  }

  @Input() public orderBooking: OrderBookingForm;
  @Input() public citiesLOVForEditForm: any;
  editBtn(item?: OrderBookingForm) {
    const ref = this.modalService.open(EditForOrderReceivingComponent, {
      size: "xl",
      scrollable: true,
    });
    this.orderBooking = item;
    ref.componentInstance.orderBookingModel = this.orderBooking;
    ref.componentInstance.citiesLOV = this.citiesLOV;

    ref.result.then(
      (yes) => {
        console.log("ok Click");
      },
      (cancel) => {
        console.log("cancel CLick");
      }
    );
  }
  onSubmit() {}

  // Check Uncheck

  // Function to add Rows to selected Array
  objToEnter: OrderBookingForm;
  addToSelectedArray(e, item: OrderBookingForm) {
    if (e.target.checked) {
      console.log("hello");
      item.isSelected = true;
      this.selectedArray.push(item);

      console.log(this.selectedArray);
    } else {
      const index = this.selectedArray.findIndex(
        (x) => x.OrderBookingId === item.OrderBookingId
      );
      const obj = this.selectedArray.find(
        (x) => x.OrderBookingId === item.OrderBookingId
      );
      obj.isSelected = false;

      if (index > -1) {
        this.selectedArray.splice(index, 1);
      }
    }
  }
  // Function to add Rows to selected Array

  // checkuncheckAll Logic

  checkUncheckAll() {
    console.log("hello");
    for (var i = 0; i < this.BookedOrderList.length; i++) {
      this.BookedOrderList[i].isSelected = this.masterSelector;
      if (this.masterSelector) this.selectedArray.push(this.BookedOrderList[i]);
      else {
        const index = this.selectedArray.findIndex(
          (x) => x.OrderBookingId === this.BookedOrderList[i].OrderBookingId
        );
        const obj = this.selectedArray.find(
          (x) => x.OrderBookingId === this.BookedOrderList[i].OrderBookingId
        );
        obj.isSelected = false;

        if (index > -1) {
          this.selectedArray.splice(index, 1);
          console.log(this.selectedArray);
        }
      }
    }
    this.getCheckedItemList();
  }
  // checkuncheckAll Logic

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.BookedOrderList.length; i++) {
      if (this.BookedOrderList[i].isSelected)
        this.checkedList.push(this.BookedOrderList[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

  isAllSelected() {
    this.masterSelector = this.BookedOrderList.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }
  // AddBtn() {
  //   const ref = this.modalService.open(AddCityComponent, { size: "tiny" });
  // }
  SearchFunction() {
    TableUtil.SearchFunction(this.searchVal);
  }
  exportTable() {
    TableUtil.exportToExcel("ExampleTable");
  }
  generatePDF() {
    TableUtil.generatePDF("ExampleTable");
  }
  citiesLOV = new Array<LOV>();

  initialize() {
    //
    this.userService.GetAllUsers().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.PartyList = response.Data;
        console.log(this.PartyList);
      } else {
        this.notificationService.showToast(
          "danger",
          response.Message,
          "",
          "top-right"
        );
        console.warn(response.Message);
      }
    });
    this.sharedService.GetAllCities().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.citiesLOV = response.Data;
        console.log(this.citiesLOV);
      } else {
        this.notificationService.showToast(
          "danger",
          response.Message,
          "",
          "top-right"
        );
        console.warn(response.Message);
      }
    });
    this.sharedService.GetCourierSettings().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.courierSetting = response.Data[0];
        // console.log(this.citiesLOV);
      } else {
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

  ngOnInit(): void {
    this.initialize();
  }

  DeleteBtn(item) {
    if (confirm("Are you sure you want to delete " + item.Text + " city")) {
      this.sharedService.DeleteCity(item.Value).subscribe((data) => {
        var response = JSON.parse(JSON.stringify(data));
        console.warn(response);
        if (response.Status) {
          this.notificationService.showToast(
            "success",
            response.Message,
            "",
            "top-right"
          );
          this.sharedService.filter("deleted an item");
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
  }
  // refresh List
  refreshList() {
    this.initialize();
  }
  // refresh List

  // Sorting
  key = "id";
  reverse: boolean;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  // Sorting
}
