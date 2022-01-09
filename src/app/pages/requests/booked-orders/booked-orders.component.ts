import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { catchError, filter } from "rxjs/operators";
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
import { Observable, Subscription, throwError, timer } from "rxjs";
import { UpdateRequestStatusComponent } from "../popup/update-request-status/update-request-status.component";
import { CustomerInfo } from "../../../models/CustomerInfo";

@Component({
  selector: "ngx-booked-orders",
  templateUrl: "./booked-orders.component.html",
  styleUrls: ["./booked-orders.component.scss"],
})
export class BookedOrdersComponent implements OnInit {
  loadingSpinner: boolean = false;
  public citiesLOV: Array<LOV>;
  public statusLOV: Array<LOV>;
  public courierLOV: Array<LOV>;
  @Input() public orderBooking: OrderBookingForm;
  @Input() public citiesLOVForEditForm: any;
  @Input() public StatusLOV: LOV;

  subscription: Subscription;
  everyTwentyFiveSeconds: Observable<number> = timer(0, 25000);
  p: number = 1;
  searchVal;
  requestFilters: Filters;
  CustomerList = new Array<CustomerInfo>();
  updateOrderStatus;
  unfilteredOrders: Array<OrderBookingForm>;
  Orders = new Array<OrderBookingForm>();

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
  // NGX MultiSelect
  dropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: "Value",
    textField: "Text",
    enableCheckAll: false,
    closeDropDownOnSelection: true,
    allowSearchFilter: true,
  };

  // NGX MultiSelect
  ArrayOfOrdersToUpdate = new Array();
  UpdateBulkOrderStatus() {
    if (this.updateOrderStatus != null) {
      let statusToUpdate = this.updateOrderStatus;
      this.selectedArray.forEach((element) => {
        this.ArrayOfOrdersToUpdate.push(element.OrderBookingId, statusToUpdate);
      });
      if (this.ArrayOfOrdersToUpdate != null) {
        this.userService
          .BulkUpdateOrderStatus(this.ArrayOfOrdersToUpdate)
          .subscribe((data) => {
            var response = JSON.parse(JSON.stringify(data));
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
      }
    }
  }

  bookedOrderFilters;
  initialize() {
    this.bookedOrderFilters = this.fb.group({
      originCityId: [""],
      fromDate: [""],
      toDate: [""],
    });

    this.GetAllLOVs();

    this.GetOrders();
  }

  GetOrders() {
    this.loadingSpinner = true;
    this.userService.GetOrders().subscribe(
      (result) => {
        console.warn("result", result);
        var response = JSON.parse(JSON.stringify(result));
        if (response.Status) {
          this.Orders = response.Data;
          this.Orders.sort((a, b) => {
            return (
              <any>new Date(b.OrderBookingOn) - <any>new Date(a.OrderBookingOn)
            );
          });
          this.unfilteredOrders = this.Orders;
          this.loadingSpinner = false;
        } else {
          this.loadingSpinner = false;
          this.notificationService.showToast(
            "danger",
            response.Message,
            "",
            "top-right"
          );
        }
      },
      (error) => {
        debugger;
        this.userService.handleError(error);
        this.loadingSpinner = false;
      }
    );
  }

  // Sort Filters
  orderStatus;
  assignedCourier;
  partyId;

  // Sort Filters
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
  status: LOV = null;
  trackingBtn(item) {
    if (item != undefined) {
      window.open("home/trackingdetails?trackingid=" + item, "_blank");
    }
  }
  deleteBtn(item) {
    let confirmationFlag = confirm(
      "Are you sure you want to delete this Order#" + item
    );
    if (confirmationFlag) {
      this.DeleteBookedOrder(item);
    }
  }
  DeleteBookedOrder(item) {
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

  UpdateStatusActionBtn(item?: OrderBookingForm) {
    const ref = this.modalService.open(UpdateRequestStatusComponent, {
      size: "xl",
      scrollable: true,
    });
    this.orderBooking = item;
    this.citiesLOVForEditForm = this.citiesLOV;
    // console.log(this.citiesLOVForEditForm);
    ref.componentInstance.orderBookingModel = this.orderBooking;
    ref.componentInstance.citiesLOV = this.citiesLOVForEditForm;
    ref.componentInstance.StatusLOV = this.statusLOV;

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
    if (
      this.orderStatus != null ||
      this.assignedCourier != null ||
      this.partyId != null
    ) {
      let statusToFind = this.orderStatus;
      let allStatus = this.statusLOV;
      if (statusToFind != null)
        var statusObj = allStatus.find((x) => x.Value == statusToFind);

      console.log(statusObj);
      this.FilterByStatus(statusObj);

      if (this.assignedCourier != null) {
      }

      this.SortByDate();
      // TableUtil.SearchFunction(statusObj.Text);

      // if (this.assignedCourier != "" && this.orderStatus == "")
      // TableUtil.SearchFunction(this.orderStatus);
    }
  }
  FilterByStatus(statusObj = null, assignedCourier = null, partyId = null) {
    this.Orders = this.unfilteredOrders.filter(
      (i) =>
        (statusObj == null || i.StatusName == statusObj.Text) &&
        (assignedCourier == null || i.EmployeeId == assignedCourier) &&
        (partyId == null || i.PartyId == partyId)
    );
  }

  SortByDate() {
    this.Orders.sort((a, b) => {
      return <any>new Date(b.OrderBookingOn) - <any>new Date(a.OrderBookingOn);
    });
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
}
