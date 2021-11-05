import { TableUtil } from './../../../utilities/tableutil';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-delivered',
  templateUrl: './delivered.component.html',
  styleUrls: ['./delivered.component.scss']
})
export class DeliveredComponent implements OnInit {

  p:number=1;
  constructor() { }
  onSubmit(){

  }
  exportTable(){
    TableUtil.exportToExcel('ExampleTable')
  }
  generatePDF(){
    TableUtil.generatePDF('ExampleTable')
  }
  ngOnInit(): void {
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
   key='id';
   reverse:boolean;
   sort(key){
     this.key = key
     this.reverse=!this.reverse
   }
   // Sorting

}
