import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { SharedService } from "../../../services/shared.service";
import { UserService } from "../../../services/user.service";
import { NotificationService } from "../../../services/notification.service";
import { Subject } from "rxjs";

@Component({
  selector: "ngx-select-location",
  templateUrl: "./select-location.component.html",
  styleUrls: ["./select-location.component.scss"],
})
export class SelectLocationComponent implements OnInit {
  constructor(
    public modal: NgbActiveModal,
    private notificationService: NotificationService
  ) {}
  public onClose: Subject<boolean>;
  response;
  @Output() newItemEvent = new EventEmitter<string>();
  spinner;
  LocationList;
  selectedLocationID = -1;
  ngOnInit(): void {
    console.log(this.LocationList);
  }
  logSelected() {
    console.log(this.selectedLocationID);
  }
  SetLoginCredentials(): boolean {
    if (this.selectedLocationID != -1) {
      localStorage.setItem("ISLOGGEDIN", this.response.Status);
      localStorage.setItem("LOGINNAME", this.response.Data.LoginName);
      localStorage.setItem("USERID", this.response.Data.UserId);
      localStorage.setItem("USERNAME", this.response.Data.UserName);
      localStorage.setItem("ROLEID", this.response.Data.RoleId);
      localStorage.setItem("ROLENAME", this.response.roleName);
      localStorage.setItem(
        "PARTYLOCATIONID",
        this.response.Data.PartyLocationId
      );
      localStorage.setItem("ORGANIZATIONID", this.response.organizationId);

      return true;

      // this.router.navigate(["/user"]);
    } else {
      this.notificationService.showToast(
        "danger",
        "Could Not Log in, Please select a Location To Connect To!",
        "",
        "top-right"
      );
      return false;
    }
  }
  SelectLocation() {
    console.log(this.selectedLocationID);
    debugger;
    if (this.selectedLocationID != -1) {
      localStorage.setItem("LOCATIONID", String(this.selectedLocationID));
      var Flag = this.SetLoginCredentials();
      if (Flag) {
        debugger;
        this.notificationService.showToast(
          "success",
          this.response.Message,
          "",
          "top-right"
        );
        this.modal.close(true);
      }
    } else {
      alert("Please select a Location to Connect To");
    }
  }
  DismissModal() {
    this.modal.close(false);
  }
}
