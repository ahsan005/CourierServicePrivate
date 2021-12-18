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
    private sharedService: SharedService
  ) {}
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
citiesLOV:Array<LOV>
  initialize(){
    this.sharedService.GetAllCities().subscribe((data) =>
    {
      var response = JSON.parse(JSON.stringify(data));
      if (response.Status)
      {
        this.citiesLOV = response.Data;
        console.log(response.Data)
        console.log(this.citiesLOV)

      }
      else
      console.error(response.Message);
    })
  }

  ngOnInit(): void {

    this.initialize();
  }
  shipperProfiles: Array<Object> = [
    {
      SrNo: 1,
      ShipperName: "Micheal",
      ShipperPhone: "0333-41111111",
      ShipperEmail: "ahsan105@icloud.com",
      ShipperAddress: "ABC Street",
    },
    {
      SrNo: 2,
      ShipperName: "Trevor",
      ShipperPhone: "0333-33333333",
      ShipperEmail: "Kill@icloud.com",
      ShipperAddress: "DEF Street",
    },
    {
      SrNo: 3,
      ShipperName: "Franklin",
      ShipperPhone: "0333-65674859",
      ShipperEmail: "TEST@icloud.com",
      ShipperAddress: "GHI Street",
    },
    {
      SrNo: 4,
      ShipperName: "Micheal Jordan",
      ShipperPhone: "0333-0987654321",
      ShipperEmail: "exotic@gmail.com",
      ShipperAddress: "XYZVBN Street",
    },
  ];
  // Sorting
  key = "id";
  reverse: boolean;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  // Sorting
}
