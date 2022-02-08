import { UserService } from "../../../services/user.service";
import { SharedService } from "./../../../services/shared.service";
import { OrderBookingForm } from "./../../../models/order-booking-form";
import { FormBuilder } from "@angular/forms";
import { TableUtil } from "./../../../utilities/tableutil";
import { Component, OnInit } from "@angular/core";
import { NgxPaginationModule } from "ngx-pagination";

@Component({
  selector: "ngx-recent-booked-orders",
  templateUrl: "./recent-booked-orders.component.html",
  styleUrls: ["./recent-booked-orders.component.scss"],
})
export class RecentBookedOrdersComponent implements OnInit {
  Orders = new Array<OrderBookingForm>();
  constructor(
    private sharedService: SharedService,
    private userService: UserService
  ) {
    this.initialize();
  }

  ngOnInit(): void {}

  // EXCEL EXPORT
  exportTable() {
    if (this.selectedArray.length < 1) TableUtil.exportToExcelV2(this.Orders);
    else TableUtil.exportToExcelV2(this.selectedArray);
  }
  // EXCEL EXPORT

  // PDF EXPORT
  generatePDF() {
    if (this.selectedArray.length < 1) TableUtil.generatePdfTable(this.Orders);
    else TableUtil.generatePdfTable(this.selectedArray);
  }
  // PDF EXPORT

  searchVal: any;

  SearchFunction() {
    TableUtil.SearchFunction(this.searchVal);
  }

  p: number = 1;

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

  initialize() {
    this.sharedService.GetAllCities().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);

      // this.CitiesLOV = response.Data;
    });

    this.userService.GetOrders().subscribe((result) => {
      console.warn("result", result);
      var response = JSON.parse(JSON.stringify(result));
      if (response.Status) {
        this.Orders = response.Data;
      }

      if (this.Orders.length > 0) {
        this.Orders.sort((a, b) => {
          return (
            <any>new Date(b.OrderBookingOn) - <any>new Date(a.OrderBookingOn)
          );
        });
      }
    });
  }
}
