import { NotificationService } from "./../../../services/notification.service";
import { SharedService } from "./../../../services/shared.service";
import { AddCityComponent } from "./../add-city/add-city.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { TableUtil } from "../../../utilities/tableutil";
import { LOV } from "../../../models/citiesLOV";

@Component({
  selector: "ngx-city-list",
  templateUrl: "./city-list.component.html",
  styleUrls: ["./city-list.component.scss"],
})
export class CityListComponent implements OnInit {
  searchVal: any;
  p: number = 1;
  constructor(
    private modalService: NgbModal,
    private sharedService: SharedService,
    private notificationService: NotificationService
  ) {
    this.sharedService.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshList();
    });
  }
  onSubmit() {}

  AddBtn() {
    const ref = this.modalService.open(AddCityComponent, { size: "tiny" });
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
  citiesLOV: Array<LOV>;

  initialize() {
    this.sharedService.GetAllCities().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.citiesLOV = response.Data;
        console.log(response.Data);
        console.log(this.citiesLOV);
      } else console.error(response.Message);
    });
  }

  ngOnInit(): void {
    this.initialize();
  }

  DeleteBtn(item) {
    if (confirm("Are you sure you want to delete " + item.Text + " city")) {
      this.sharedService.DeleteCity(item.Value).subscribe((data) => {
        var response = JSON.parse(JSON.stringify(data));
        console.warn(response);
        if (response.Status) {
          this.notificationService.showToast(
            "success",
            response.Message,
            "",
            "top-right"
          );
          this.sharedService.filter("deleted an item");
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
  // refresh List
  refreshList() {
    this.initialize();
  }
  // refresh List

  // Sorting
  key = "id";
  reverse: boolean;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  // Sorting
}
