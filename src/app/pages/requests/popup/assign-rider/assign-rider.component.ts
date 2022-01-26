import { OrderBookingForm } from "./../../../../models/order-booking-form";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SharedService } from "../../../../services/shared.service";
import { UserService } from "../../../../services/user.service";
import { NotificationService } from "../../../../services/notification.service";

@Component({
  selector: "ngx-assign-rider",
  templateUrl: "./assign-rider.component.html",
  styleUrls: ["./assign-rider.component.scss"],
})
export class AssignRiderComponent implements OnInit {
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private notificationService: NotificationService
  ) {}
  assignedCourier = "";
  // selectedArray= new Array<OrderBookingForm>();
  AllOrders = new Array<OrderBookingForm>();
  courierLOV;
  onSubmitSpinner: boolean = false;
  orderIdArray = new Array();
  ngOnInit(): void {
    console.log(this.courierLOV);
    this.AllOrders.forEach((item) => {
      this.orderIdArray.push(item.OrderBookingId);
    });
  }

  AssignRider() {
    if (this.assignedCourier != null || this.assignedCourier != "") {
      this.onSubmitSpinner = true;
      this.userService
        .BulkAssignRider(this.orderIdArray, this.assignedCourier)
        .subscribe((data) => {
          var response = JSON.parse(JSON.stringify(data));
          if (response.Status) {
            this.notificationService.showToast(
              "success",
              response.Message,
              "",
              "top-right"
            );
            this.onSubmitSpinner = false;

            this.modal.close();
          } else {
            this.notificationService.showToast(
              "danger",
              response.Message,
              "",
              "top-right"
            );
            this.onSubmitSpinner = false;
          }
        });
    }
  }
}
