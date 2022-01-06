import { TableUtil } from "./../../utilities/tableutil";
import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: "ngx-active-customers",
  templateUrl: "./active-customers.component.html",
  styleUrls: ["./active-customers.component.scss"],
})
export class ActiveCustomersComponent implements OnInit {
  searchVal: any;
  p: number = 1;
  userList;
  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.userService.listen().subscribe((m: any) => {
      console.log(m);
      this.Initilalize();
    });
  }

  checkBoxSpinner: boolean = false;
  changeActiveStatus(item) {
    console.log("hello");
    this.checkBoxSpinner = true;
    this.userService.ActivateCustomer(item).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.userService.filter("refresh List On Change");
        this.notificationService.showToast(
          "success",
          response.Message,
          "",
          "top-right"
        );
        this.checkBoxSpinner = false;
      } else {
        this.userService.filter("refresh List On Change");

        this.notificationService.showToast(
          "danger",
          response.Message,
          "",
          "top-right"
        );

        this.checkBoxSpinner = false;
      }
    });
  }

  Initilalize() {
    this.userService.GetAllUsers().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        debugger;

        this.userList = response.Data.filter((user) => user.IsActive);

        console.log(this.userList);
        console.log(response.Data);
      }
    });
  }
  onSubmit() {}
  deleteBtn(item) {
    if (confirm("Are you sure you want to delete User " + item.UserName)) {
      this.userService.DeleteCustomer(item).subscribe((data) => {
        var response = JSON.parse(JSON.stringify(data));
        if (response.Status) {
          this.notificationService.showToast(
            "success",
            response.Message,
            "",
            "top-right"
          );
          this.userService.filter("refresh List On Delete");
        } else {
          this.notificationService.showToast(
            "danger",
            response.Message,
            "",
            "top-right"
          );
          this.userService.filter("refresh List On Delete");
        }
      });
    }
  }
  SearchFunction() {
    TableUtil.SearchFunction(this.searchVal);
  }
  exportTable() {
    TableUtil.exportToExcel("ExampleTable");
  }
  generatePDF() {
    TableUtil.generatePDF("ExampleTable");
  }
  ngOnInit(): void {
    this.Initilalize();
  }
}
