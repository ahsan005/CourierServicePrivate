import { TableUtil } from './../../../utilities/tableutil';
import { OrderBookingForm } from "./../../../models/order-booking-form";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotificationService } from "../../../services/notification.service";
import { SharedService } from "../../../services/shared.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "ngx-delivery-run-sheet",
  templateUrl: "./delivery-run-sheet.component.html",
  styleUrls: ["./delivery-run-sheet.component.scss"],
})
export class DeliveryRunSheetComponent implements OnInit {
  courierLOV;
  loadingSpinner;
  citiesLOV;
  statusLOV;
  masterSelector;
  CustomerList;
  assignedRider;
  p = 1;
  assignedOrderList = new Array<OrderBookingForm>();
  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.Initialize();
  }

  Initialize() {
    this.GetAllLOVs();
  }
  PrintDeliveryRunSheet(){
    if(this.assignedOrderList.length > 0)
    TableUtil.generateDeliveryRunSheet(this.assignedOrderList)
  }

  checkedList: any;
  selectedArray = new Array<OrderBookingForm>();
  // checkuncheckAll Logic
  checkUncheckAll() {
    console.log("hello");
    for (var i = 0; i < this.assignedOrderList.length; i++) {
      this.assignedOrderList[i].isSelected = this.masterSelector;
      if (this.masterSelector)
        this.selectedArray.push(this.assignedOrderList[i]);
      else {
        const index = this.selectedArray.findIndex(
          (x) => x.OrderBookingId === this.assignedOrderList[i].OrderBookingId
        );
        const obj = this.selectedArray.find(
          (x) => x.OrderBookingId === this.assignedOrderList[i].OrderBookingId
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
    for (var i = 0; i < this.assignedOrderList.length; i++) {
      if (this.assignedOrderList[i].isSelected)
        this.checkedList.push(this.assignedOrderList[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

  isAllSelected() {
    this.masterSelector = this.assignedOrderList.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  GetAllLOVs() {
    this.sharedService.GetAllCities().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);

      this.citiesLOV = response.Data;
    });
    this.GetAllCustomersLOV();

    this.sharedService.GetAllStatuses().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);
      console.log(response.Data);
      this.statusLOV = response.Data;
      console.log(this.statusLOV);
    });
    this.sharedService.GetAllCourierLOV().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);

      this.courierLOV = response.Data;
    });
  }
  GetAllCustomersLOV() {
    this.userService.GetAllUsers().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.CustomerList = response.Data;
      } else {
        this.notificationService.showToast(
          "warning",
          response.Message,
          "",
          "top-right"
        );
        console.warn(response.Message);
      }
    });
  }

  GetOrdersByAssignedRider() {
    this.userService
      .GetOrdersByRiderAssigned(this.assignedRider)
      .subscribe((data) => {
        var response = JSON.parse(JSON.stringify(data));
        if (response.Status) {
          this.assignedOrderList = response.Data;
        } else {
          this.notificationService.showToast(
            "warning",
            response.Message,
            "",
            "top-right"
          );
          console.warn(response.Message);
        }
      });
  }
}
