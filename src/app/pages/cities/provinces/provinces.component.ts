import { NotificationService } from "./../../../services/notification.service";
import { SharedService } from "./../../../services/shared.service";
import { AddCityComponent } from "./../add-city/add-city.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, Input, OnInit } from "@angular/core";
import { TableUtil } from "../../../utilities/tableutil";
import { LOV } from "../../../models/citiesLOV";
import { AddProvinceComponent } from "./add-province/add-province.component";

@Component({
  selector: "ngx-provinces",
  templateUrl: "./provinces.component.html",
  styleUrls: ["./provinces.component.scss"],
})
export class ProvincesComponent implements OnInit {
  @Input() public CountryId: number;
  countryId: number;
  provinceList;
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

  initialize() {
    this.sharedService.GetAllCountries().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status) {
        this.countryList = response.Data;
        console.log(this.countryList);
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
  AddBtn() {
    const ref = this.modalService.open(AddProvinceComponent, { size: "tiny" });
    ref.componentInstance.CountryId = this.countryId;
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
  countryList: Array<LOV>;

  GetProvincesList() {
    if (this.countryId != undefined) {
      this.sharedService
        .GetProvincesByCountry(this.countryId)
        .subscribe((data) => {
          var response = JSON.parse(JSON.stringify(data));
          if (response.Status) {
            this.provinceList = response.Data;
            console.log(response.Data);
            console.log(this.provinceList);
          } else console.error(response.Message);
        });
    }
  }

  ngOnInit(): void {
    this.initialize();
  }

  DeleteBtn(item) {
    if (confirm("Are you sure you want to delete " + item.Text + " Country")) {
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
    
    this.GetProvincesList();
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
