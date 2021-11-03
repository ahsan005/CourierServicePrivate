import { FormBuilder } from '@angular/forms';
import { TableUtil } from './../../../utilities/tableutil';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'ngx-recent-booked-orders',
  templateUrl: './recent-booked-orders.component.html',
  styleUrls: ['./recent-booked-orders.component.scss']
})
export class RecentBookedOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  exportTable(){
    TableUtil.exportToExcel('ExampleTable')
  }
  generatePDF(){
    TableUtil.generatePDF('ExampleTable')
  }
  searchVal:any;

  SearchFunction(){
    TableUtil.SearchFunction(this.searchVal)
  }

  p: number = 1;

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

}
