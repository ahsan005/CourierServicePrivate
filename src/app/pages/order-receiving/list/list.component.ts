import { OrderBookingForm } from "./../../../models/order-booking-form";
import { NotificationService } from "./../../../services/notification.service";
import { SharedService } from "./../../../services/shared.service";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { TableUtil } from "../../../utilities/tableutil";
import { LOV } from "../../../models/citiesLOV";
import { CustomerInfo } from "../../../models/CustomerInfo";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "ngx-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  searchVal: any;
  loadingSpinner: boolean = false;
  p: number = 1;
  UserId;
  PartyList = new Array<CustomerInfo>();
  BookedOrderList = new Array<OrderBookingForm>();
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
    debugger;
    var userId = this.UserId;
    this.userService.GetOrdersByUserId(userId).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.BookedOrderList = response.Data;
        console.log(this.BookedOrderList);
        this.CalculateAggregates()
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
  }
  CalculateAggregates(){
    
  }
  onSubmit() {}
  // Check Uncheck
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
      }
    }
  }
  // Function to add Rows to selected Array

  checkedList: any;
  masterSelector: boolean;
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
