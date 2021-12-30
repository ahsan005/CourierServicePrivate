import { EditEmployeeComponent } from "./../popup/edit-employee/edit-employee.component";
import { NotificationService } from "./../../../services/notification.service";
import { UserService } from "./../../../services/user.service";
import { AddComponent } from "./../add/add.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TableUtil } from "./../../../utilities/tableutil";
import { Component, Input, OnInit } from "@angular/core";
import { Employee } from "../../../models/employee";

@Component({
  selector: "ngx-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  empList = new Array<Employee>();
  @Input() public employeeObj: Employee;
  searchVal: any;
  p: number = 1;
  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.userService.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshList();
    });
  }
  onSubmit() {}
  refreshList() {
    this.userService.GetCourierEmployees().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.empList = response.Data;
        console.log(response.Data);
      } else {
        this.notificationService.showToast(
          "danger",
          response.Message,
          "",
          "top-right"
        );
        console.warn(response.Message);
      }
    });
  }

  editBtn(item?: Employee) {
    const ref = this.modalService.open(EditEmployeeComponent, {
      size: "xl",
      scrollable: true,
    });
    this.employeeObj = item;
    // this.citiesLOVForEditForm = this.citiesLOV;
    // console.log(this.citiesLOVForEditForm);
    ref.componentInstance.employeeModel = this.employeeObj;
    ref.result.then(
      (yes) => {
        console.log("ok Click");
        this.userService.filter("entry Edited");
      },
      (cancel) => {
        console.log("cancel CLick");
      }
    );
  }
  deleteBtn(item) {
    if (confirm("Are you sure you want to Delete " + item.EmployeeName)) {
      this.userService
        .DeleteCourierEmployee(item.EmployeeId)
        .subscribe((data) => {
          var response = JSON.parse(JSON.stringify(data));
          if (response.Status) {
            this.notificationService.showToast(
              "success",
              response.Message,
              "",
              "top-right"
            );
            this.userService.filter("List refresh");
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
  AddBtn() {
    const ref = this.modalService.open(AddComponent, {
      size: "lg",
      scrollable: true,
    });
    ref.result.then(
      (yes) => {
        console.log("ok Click");
        this.userService.filter("New Entry");
      },
      (cancel) => {
        console.log("cancel CLick");
      }
    );
  }
  SearchFunction() {
    TableUtil.SearchFunction(this.searchVal);
  }
  exportTable() {
    TableUtil.exportToExcelV2(this.empList);
  }
  generatePDF() {
    TableUtil.generatePdfTableEmployee(this.empList);
  }
  ngOnInit(): void {
    this.refreshList();
  }
  openImage(base64Image: string, employeeName: string) {
    var newTab = window.open();
    newTab.document.body.innerHTML =
      '<img src="' + base64Image + '" width="300px" height="250px">';
    newTab.document.title = employeeName;
  }
}
