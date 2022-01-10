import { AddfinancialaccountComponent } from "./popup/addfinancialaccount/addfinancialaccount.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FinanacialAccount } from "./../../models/FinancialAccount";
import { Component, Input, OnInit } from "@angular/core";
import { TableUtil } from "../../utilities/tableutil";
import { UserService } from "../../services/user.service";
import { NotificationService } from "../../services/notification.service";
import { LOV } from "../../models/citiesLOV";

@Component({
  selector: "ngx-finance",
  templateUrl: "./finance.component.html",
  styleUrls: ["./finance.component.scss"],
})
export class FinanceComponent implements OnInit {
  financialAccountList = new Array<FinanacialAccount>();
  @Input() public financialAccountToEdit = new FinanacialAccount();
  @Input() public AccountSubTypeLOVForModal = new LOV();
  @Input() public SubControlAccountLOVForModal = new LOV();
  searchVal: any;

  p: number = 1;
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) {
    this.userService.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshList();
    });
  }

  AddBtn() {
    const ref = this.modalService.open(AddfinancialaccountComponent, {
      size: "tiny",
    });
    ref.componentInstance.SubControlAccountLOVForModal =
      this.SubControlAccountLOV;
    ref.componentInstance.AccountSubTypeLOVForModal = this.AccountSubTypeLOV;
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
  ngOnInit(): void {
    this.refreshList();
  }
  AccountSubTypeLOV;
  SubControlAccountLOV;
  refreshList() {
    console.log("Refresh List");
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

    this.userService.GetAccountSubTypeLOV().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.AccountSubTypeLOV = response.Data;
        console.log(this.AccountSubTypeLOV);
      }
    });
    this.userService.GetSubControlAccountLOV().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.SubControlAccountLOV = response.Data;
        console.log(this.SubControlAccountLOV);
      }
    });
  }
  editBtn(item) {
    const ref = this.modalService.open(AddfinancialaccountComponent, {
      size: "tiny",
      scrollable: true,
    });

    ref.componentInstance.financialAccountToEdit = item;
    ref.componentInstance.SubControlAccountLOVForModal =
      this.SubControlAccountLOV;
    ref.componentInstance.AccountSubTypeLOVForModal = this.AccountSubTypeLOV;

    ref.result.then(
      (yes) => {
        console.log("ok Click");
      },
      (cancel) => {
        console.log("cancel CLick");
      }
    );
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
