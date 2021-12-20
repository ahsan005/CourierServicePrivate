import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { filter } from "rxjs/operators";
import { NotificationService } from "./../../../services/notification.service";
import { Filters } from "./../../../models/filters";
import { LOV } from "../../../models/citiesLOV";
import { FormBuilder } from "@angular/forms";
import { UserService } from "../../../services/user.service";
import { SharedService } from "./../../../services/shared.service";
import { TableUtil } from "./../../../utilities/tableutil";
import { Component, Input, OnInit } from "@angular/core";
import { OrderBookingForm } from "../../../models/order-booking-form";
import { EditRequestComponent } from "../popup/edit-request/edit-request.component";
import { Observable, Subscription, timer } from "rxjs";

@Component({
  selector: "ngx-booked-orders",
  templateUrl: "./booked-orders.component.html",
  styleUrls: ["./booked-orders.component.scss"],
})
export class BookedOrdersComponent implements OnInit {
  public citiesLOV: Array<LOV>;
  public statusLOV: Array<LOV>;
  public courierLOV: Array<LOV>;
  @Input() public orderBooking: OrderBookingForm;
  @Input() public citiesLOVForEditForm: any;

  subscription: Subscription;
  everyTwentyFiveSeconds: Observable<number> = timer(0, 25000);
  p: number = 1;
  searchVal;
  requestFilters: Filters;

  unfilteredOrders: Array<OrderBookingForm>;
  Orders: Array<OrderBookingForm>;

  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) {
    this.initialize();

    this.sharedService.listen().subscribe((m: any) => {
      console.log(m);
      this.GetOrders();
    });
    this.masterSelector = false;
  }
  onSubmit() {
    this.requestFilters = new Filters(this.bookedOrderFilters.value);

    console.log(this.requestFilters);
    // Call HTTP Service For Filtered Data
    this.userService
      .GetOrdersFiltered(this.requestFilters)
      .subscribe((data) => {
        //  = JSON.stringify(data)
        var response = JSON.parse(JSON.stringify(data));
        console.log(response);
        this.Orders = response.Data;

        console.log("Hello Observable", this.Orders);
        //     console.log("Status", response);
        if (response.Status) {
          this.notificationService.showToast(
            "success",
            response.Message,
            "",
            "top-right"
          );
        } else {
          this.notificationService.showToast(
            "danger",
            response.Message,
            "",
            "top-right"
          );
        }
      });
    // Call HTTP Service For Filtered Data
  }
  exportTable() {
    if (this.selectedArray.length < 1) TableUtil.exportToExcelV2(this.Orders);
    else TableUtil.exportToExcelV2(this.selectedArray);
  }
  generatePDF() {
    if (this.selectedArray.length < 1) TableUtil.generatePdfTable(this.Orders);
    else TableUtil.generatePdfTable(this.selectedArray);
  }
  SearchFunction() {
    TableUtil.SearchFunction(this.searchVal);
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
      }
    }
  }
  // Function to add Rows to selected Array
  ngOnInit(): void {
    this.subscription = this.everyTwentyFiveSeconds.subscribe(() => {
      this.GetOrders();
    });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  bookedOrderFilters;
  initialize() {
    this.bookedOrderFilters = this.fb.group({
      originCityId: [""],

      fromDate: [""],
      toDate: [""],
    });

    this.sharedService.GetAllCities().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);

      this.citiesLOV = response.Data;
    });

    this.sharedService.GetAllStatuses().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);
      console.log(response.Data);
      this.statusLOV = response.Data;
      console.log(this.statusLOV);
    });
    // this.sharedService.GetAllCourier().subscribe((result) => {
    //   var response = JSON.parse(JSON.stringify(result));
    //   console.log(response);

    //   this.courierLOV = response.Data;
    // });

    this.GetOrders()
  }


GetOrders(){
  this.userService.GetOrders().subscribe((result) => {
    console.warn("result", result);
    var response = JSON.parse(JSON.stringify(result));

    this.Orders = response.Data;
    this.Orders.sort((a, b) => {
      return (
        <any>new Date(b.OrderBookingOn) - <any>new Date(a.OrderBookingOn)
      );
    });
    this.unfilteredOrders = this.Orders;
  });
}


  // Sort Filters
  orderStatus;
  assignedCourier;

  // Sort Filters
  status: LOV = null;
  trackingBtn(item) {
    if (item != undefined) {
      window.open("home/trackingdetails?trackingid=" + item, "_blank");
    }
  }

  editBtn(item?: OrderBookingForm) {
    const ref = this.modalService.open(EditRequestComponent, {
      size: "xl",
      scrollable: true,
    });
    this.orderBooking = item;
    this.citiesLOVForEditForm = this.citiesLOV;
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
  sortFilter() {
    // if (this.orderStatus != "" && this.assignedCourier == "")

    let statusToFind = this.orderStatus;
    let allStatus = this.statusLOV;
    let statusObj = allStatus.find((x) => x.Value == statusToFind);
    console.log(statusObj);

    // TableUtil.SearchFunction(statusObj.Text);
    this.Orders = this.unfilteredOrders.filter(
      (i) => i.StatusName == statusObj.Text
    );

    this.Orders.sort((a, b) => {
      return <any>new Date(b.OrderBookingOn) - <any>new Date(a.OrderBookingOn);
    });
    // if (this.assignedCourier != "" && this.orderStatus == "")
    // TableUtil.SearchFunction(this.orderStatus);
  }
  checkedList: any;
  masterSelector: boolean;
  // checkuncheckAll Logic
  checkUncheckAll() {
    console.log("hello");
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
}
