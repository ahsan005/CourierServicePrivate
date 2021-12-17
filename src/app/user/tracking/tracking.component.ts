import { NotificationService } from "./../../services/notification.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "ngx-tracking",
  templateUrl: "./tracking.component.html",
  styleUrls: ["./tracking.component.scss"],
})
export class TrackingComponent implements OnInit {
  trackingID: number;

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   console.log(params); // { trackingID: "id" }
    //   this.trackingID = params.trackingID;
    //   console.log(this.trackingID); // trackingID
    // });
  }
  onSubmit() {
    console.log("hello");
    if (this.trackingID != undefined) {
      this.router.navigate(["/home/trackingdetails"], {
        queryParams: { trackingid: this.trackingID },
      });
    } else
      this.notificationService.showToast(
        "warning",
        "Please enter a tracking# to track",
        "Enter a Tracking# to Track",
        "top-right"
      );
  }
}
