import { AddfinancialaccountComponent } from './popup/addfinancialaccount/addfinancialaccount.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinanacialAccount } from "./../../models/FinancialAccount";
import { Component, OnInit } from "@angular/core";
import { TableUtil } from "../../utilities/tableutil";
import { UserService } from "../../services/user.service";
import { NotificationService } from "../../services/notification.service";


@Component({
  selector: "ngx-finance",
  templateUrl: "./finance.component.html",
  styleUrls: ["./finance.component.scss"],
})
export class FinanceComponent implements OnInit {
  financialAccountList = new Array<FinanacialAccount>();
  searchVal: any;
  p: number = 1;
  constructor(
    private userService: UserService,
    private modalService:NgbModal,
    private notificationService: NotificationService
  ) {
    this.userService.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshList();
    });
  }

  AddBtn() {
    const ref = this.modalService.open(AddfinancialaccountComponent, { size: "tiny" });
  }
  onSubmit() {}
  SearchFunction() {
    TableUtil.SearchFunction(this.searchVal);
  }
  exportTable() {
    TableUtil.exportToExcel("ExampleTable");
  }
  generatePDF() {
    TableUtil.generatePDF("ExampleTable");
  }
  ngOnInit(): void {}

  refreshList() {
    this.userService.GetFinancialAccount().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.financialAccountList = response.Data;
      } else {
        console.warn(response.Message);
        this.notificationService.showToast(
          "danger",
          response.Message,
          "",
          "top-right"
        );
      }
    });
  }

  // Sorting
  key = "id";
  reverse: boolean;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  // Sorting
}
