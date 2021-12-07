import { filter } from 'rxjs/operators';
import { NotificationService } from "./../../../services/notification.service";
import { Filters } from "./../../../models/filters";
import { LOV } from "../../../models/citiesLOV";
import { FormBuilder } from "@angular/forms";
import { UserService } from "../../../services/user.service";
import { SharedService } from "./../../../services/shared.service";
import { TableUtil } from "./../../../utilities/tableutil";
import { Component, OnInit } from "@angular/core";
import { OrderBookingForm } from "../../../models/order-booking-form";

@Component({
  selector: "ngx-booked-orders",
  templateUrl: "./booked-orders.component.html",
  styleUrls: ["./booked-orders.component.scss"],
})
export class BookedOrdersComponent implements OnInit {
  public citiesLOV:Array<LOV>;
  public statusLOV:Array<LOV>;
  public courierLOV:Array<LOV>;
  p: number = 1;
  searchVal;
  requestFilters: Filters;

  Orders: Array<OrderBookingForm>;
  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.initialize();
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
    TableUtil.exportToExcel("ExampleTable");
  }
  generatePDF() {
    TableUtil.generatePDF("ExampleTable");
  }
  SearchFunction() {
    TableUtil.SearchFunction(this.searchVal);
  }
  ngOnInit(): void {}
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
      console.log(response.Data)
      this.statusLOV = response.Data;
      console.log(this.statusLOV)
    });
    // this.sharedService.GetAllCourier().subscribe((result) => {
    //   var response = JSON.parse(JSON.stringify(result));
    //   console.log(response);

    //   this.courierLOV = response.Data;
    // });

    this.userService.GetOrders().subscribe((result) => {
      console.warn("result", result);
      var response = JSON.parse(JSON.stringify(result));

      this.Orders = response.Data;
      this.Orders.sort((a, b) => {
        return (
          <any>new Date(b.OrderBookingOn) - <any>new Date(a.OrderBookingOn)
        );
      });
    });
  }
  // Sort Filters
  orderStatus;
  assignedCourier;

  // Sort Filters
status:LOV = null;
  sortFilter() {
    // if (this.orderStatus != "" && this.assignedCourier == "")
    console.log(this.statusLOV);
    this.status = this.statusLOV.find(i => i.Value = this.orderStatus);
    console.log(this.status);

      // TableUtil.SearchFunction(this.status);
    // if (this.assignedCourier != "" && this.orderStatus == "")
      // TableUtil.SearchFunction(this.orderStatus);
  }

}
