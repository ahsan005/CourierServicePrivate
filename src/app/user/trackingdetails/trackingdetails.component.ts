import { OrderTracking } from "./../../models/ordertracking";
import { OrderBookingForm } from "./../../models/order-booking-form";
import { LOV } from "./../../models/citiesLOV";
import { SharedService } from "./../../services/shared.service";
import { UserService } from "./../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-trackingdetails",
  templateUrl: "./trackingdetails.component.html",
  styleUrls: ["./trackingdetails.component.scss"],
})
export class TrackingdetailsComponent implements OnInit {
  trackingID: number;
  statusLOV: Array<LOV>;
  orderToTrack: OrderBookingForm;
  orderTrackingDetails: Array<OrderTracking>;

  enterTrackingID: number;

  orderExists: boolean = false;
  public flipped: boolean = false;

  public toggleFlip() {
    this.flipped = !this.flipped;
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params); // { trackingID: "id" }
      this.trackingID = params.trackingid;
      console.log(this.trackingID); // trackingID
      // Initialize method
      this.Initialize(this.trackingID);
    });
  }
  // this.trackingID
  Initialize(trackingID: number) {
    this.userService.GetOrderByID(trackingID).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      console.log(response);
      console.log(response.Data);

      if (response.Status) {
        this.orderToTrack = response.Data[0];
        console.log(this.orderToTrack);
        this.orderExists = response.Status;
      }
    });

    this.userService.GetOrderTrackingByID(trackingID).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      console.log(response);
      console.log(response.Data);
      if (response.Status) {
        this.orderTrackingDetails = response.Data;
        console.log(this.orderTrackingDetails);
      }
    });
    if (this.orderExists) {
      this.orderTrackingDetails.sort((a, b) => {
        return <any>new Date(b.CreatedOn) - <any>new Date(a.CreatedOn);
      });
    }
  }

  trackOrder() {
    this.router.navigate(["/home/trackingdetails"], {
      queryParams: { trackingid: this.enterTrackingID },
    });
  }
}
