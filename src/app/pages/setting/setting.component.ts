import { SharedService } from "./../../services/shared.service";
import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { CourierSetting } from "../../models/courier-settings";
import { flatten } from "@angular/compiler";

@Component({
  selector: "ngx-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.scss"],
})
export class SettingComponent implements OnInit {
  GST: number;
  CourierSettings = new Array<CourierSetting>();

  constructor(
    private sharedService: SharedService,
    private notificationService: NotificationService
  ) {}

  Initialize() {
    this.sharedService.GetCourierSettings().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.CourierSettings = response.Data;
        this.GST = this.CourierSettings[0].GSTPercentage;
        console.log(response);
      }
      else{
        this.notificationService.showToast('danger',response.Message,'','top-right')
        console.warn(response.Message);
      }
    });
  }
  SaveCourierSettings = new CourierSetting();
  onSaveSpinner: boolean = false;
  SaveBtn() {
    this.onSaveSpinner = true;
    var currentUserId = localStorage.getItem("USERID");

    if (this.CourierSettings.length > 0) {

      this.SaveCourierSettings = this.CourierSettings[0];
      this.SaveCourierSettings.AlteredById = parseInt(currentUserId);
      this.SaveCourierSettings.GSTPercentage = this.GST;

    } else {
      this.SaveCourierSettings.GSTPercentage = this.GST;
      this.SaveCourierSettings.CreatedById = parseInt(currentUserId);
    }

    console.log(this.SaveCourierSettings);
    this.sharedService
      .AddCourierSettings(this.SaveCourierSettings)
      .subscribe((data) => {
        var response = JSON.parse(JSON.stringify(data));
        if (response.Status) {
          this.notificationService.showToast(
            "success",
            response.Message,
            "",
            "top-right"
          );
          this.onSaveSpinner = false;
        } else {
          this.notificationService.showToast(
            "danger",
            response.Message,
            "",
            "top-right"
          );
          this.onSaveSpinner = false;
        }
      });
  }
  ngOnInit(): void {
    this.Initialize();
  }
}
