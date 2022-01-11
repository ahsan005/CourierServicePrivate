import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OrderBookingForm } from "./../../models/order-booking-form";
import { SharedService } from "./../../services/shared.service";
import { TableUtil } from "./../../utilities/tableutil";
import { Input, Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import jsPDF from "jspdf";
import htmlToPdfmake from "html-to-pdfmake";
import html2canvas from "html2canvas";
import { UserService } from "../../services/user.service";
import { Filters } from "../../models/filters";
import { LOV } from "../../models/citiesLOV";
import * as $ from "jquery";
import { EditRequestComponent } from "./popup/edit-request/edit-request.component";
import { NbToastrService } from "@nebular/theme";
import { ViewrequestComponent } from "./popup/View-request/viewrequest/viewrequest.component";
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: "ngx-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.scss"],
})
export class RequestsComponent implements OnInit {
  @ViewChild("pdfTable") pdfTable: ElementRef;
  @Input() public orderBooking: OrderBookingForm;
  @Input() public citiesLOVForEditForm: any;
  requestsFilter: Filters;
  Orders = new Array<OrderBookingForm>();
  CitiesLOV = new Array<LOV>();
  masterSelector: boolean;
  checkedList: any;
  serial: number = 0;
  // Pagination Variable
  p: number = 1;
  // Pagination Variable

  // Spinner Status
  loading = false;
  // Spinner Status

  // On Form Submission Function
  onSubmit() {
    console.log(this.requestFilters);
    this.requestsFilter = new Filters(this.requestFilters.value);
    this.serial = 0;
    console.log(this.requestsFilter);
    this.requestsFilter.createdById = parseInt(localStorage.getItem("USERID"));
    this.userService
      .GetOrdersFiltered(this.requestsFilter)
      .subscribe((data) => {
        //  = JSON.stringify(data)
        var response = JSON.parse(JSON.stringify(data));
        console.log(response);
        this.Orders = response.Data;

        console.log("Hello Observable", this.Orders);
        //     console.log("Status", response);
        if (response.Status) {
          console.log(response.Message);
        } else {
          console.warn(response.Message);
        }
      });
  }
  // On Form Submission Function

  generatePDF() {
    if (this.selectedArray.length > 0) {
      console.log(this.selectedArray);
      TableUtil.generatePdfTable(this.selectedArray);
    } else {
      console.log(this.Orders);
      TableUtil.generatePdfTable(this.Orders);
    }
  }

  printInvoices() {
    if (this.selectedArray.length > 0) {
      debugger;
      // TableUtil.generatePdfInvoice(this.selectedArray);
      this.selectedArray.forEach(function (value) {
        TableUtil.generatePdfInvoice(value, "print");
      });
    } else {
      this.notificationService.showToast(
        "warning",
        "Please Select records for printing invoices",
        "",
        "top-right"
      );
    }
  }
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private toastrService: NbToastrService,
    private notificationService: NotificationService
  ) {
    this.serial = 0;
    this.masterSelector = false;
    this.initialize();
    this.getCheckedItemList();
  }

  ngOnInit(): void {
    this.initialize();
  }
  exportTable() {
    // TableUtil.exportToExcel("ExampleTable");
    if (this.selectedArray.length < 1) TableUtil.exportToExcelV2(this.Orders);
    else TableUtil.exportToExcelV2(this.selectedArray);
  }
  requestFilters = this.fb.group({
    destinationCityId: [""],
    status: [""],
    fromDate: [""],
    toDate: [""],
  });
  list: any;
  // GetOrderBookingRequests() {
  //   });

  initialize() {
    this.sharedService.GetAllCities().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);

      this.CitiesLOV = response.Data;
    });
    this.loading = true;
    this.userService.GetOrdersByLoggedInUser().subscribe((result) => {
      console.warn("result", result);
      var response = JSON.parse(JSON.stringify(result));

      this.Orders = response.Data;
      this.Orders.sort((a, b) => {
        return (
          <any>new Date(b.OrderBookingOn) - <any>new Date(a.OrderBookingOn)
        );
      });
      this.loading = false;
    });
  }
  // Array to hold selected Rows
  selectedArray = new Array<OrderBookingForm>();
  // Array to hold selected Rows

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
        console.log(this.selectedArray);
      }
    }
  }
  // Function to add Rows to selected Array

  // checkuncheckAll Logic
  checkUncheckAll() {
    for (var i = 0; i < this.Orders.length; i++) {
      this.Orders[i].isSelected = this.masterSelector;
      if (this.masterSelector) this.selectedArray.push(this.Orders[i]);
      else {
        const index = this.selectedArray.findIndex(
          (x) => x.OrderBookingId === this.Orders[i].OrderBookingId
        );
        const obj = this.selectedArray.find(
          (x) => x.OrderBookingId === this.Orders[i].OrderBookingId
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
    for (var i = 0; i < this.Orders.length; i++) {
      if (this.Orders[i].isSelected) this.checkedList.push(this.Orders[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

  isAllSelected() {
    this.masterSelector = this.Orders.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }


  deleteBtn(item) {
    let confirmationFlag = confirm(
      "Are you sure you want to delete this Order#" + item
    );
    if (confirmationFlag) {
      this.userService.DeleteBookedOrder(item).subscribe((data) => {
        var response = JSON.parse(JSON.stringify(data));
        if (response.Status) {
          this.notificationService.showToast(
            "success",
            response.Message,
            "",
            "top-right"
          );
          this.userService.filter("List refresh upon delete");
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
  // Edit Records Button
  editBtn(item?: OrderBookingForm) {
    const ref = this.modalService.open(EditRequestComponent, {
      size: "xl",
      scrollable: true,
    });
    this.orderBooking = item;
    this.citiesLOVForEditForm = this.CitiesLOV;
    console.log(this.citiesLOVForEditForm);
    ref.componentInstance.orderBookingModel = this.orderBooking;
    ref.componentInstance.citiesLOV = this.citiesLOVForEditForm;

    ref.result.then(
      (yes) => {
        console.log("ok Click");
      },
      (cancel) => {
        console.log("cancel CLick");
      }
    );
  }
  // Edit Records Button

  // View Request Button
  viewRequestBtn(item?: OrderBookingForm) {
    const ref = this.modalService.open(ViewrequestComponent, {
      size: "lg",
      scrollable: true,
    });
    this.orderBooking = item;
    console.log(this.orderBooking);
    this.citiesLOVForEditForm = this.CitiesLOV;
    ref.componentInstance.orderBookingModel = this.orderBooking;
    console.log(ref.componentInstance.orderBookingModel);
    ref.componentInstance.citiesLOV = this.citiesLOVForEditForm;
  }
  // View Request Button

  // tracking BTn
  trackingBtn(item) {
    if (item != undefined) {
      window.open("home/trackingdetails?trackingid=" + item, "_blank");
    }
  }

  // tracking BTn

  private index: number = 0;

  showToast(position, status) {
    this.index += 1;
    this.toastrService.show(status || "Success", `Toast ${this.index}`, {
      position,
      status,
    });
  }
  // Dataset (HTMl table Search Function)
  searchVal: any;
  SearchFunction() {
    TableUtil.SearchFunction(this.searchVal);
  }
  // Dataset (HTMl table Search Function)
}
