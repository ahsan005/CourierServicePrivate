import { FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-track-deliveries",
  templateUrl: "./track-deliveries.component.html",
  styleUrls: ["./track-deliveries.component.scss"],
})
export class TrackDeliveriesComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.trackingNo);
  }

  public trackingNo: number;
  // tracking BTn
  trackingBtn() {
    if (this.trackingNo != null) {
      window.open(
        "home/trackingdetails?trackingid=" + this.trackingNo,
        "_blank"
      );
    }
    else{
    }
  }

  // tracking BTn
}
