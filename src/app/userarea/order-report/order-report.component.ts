import { TableUtil } from './../../utilities/tableutil';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit(){

  }
  exportTable(){
    TableUtil.exportToExcel('ExampleTable')
  }
  generatePDF(){
    TableUtil.generatePDF('ExampleTable')
  }

// FormBuilder
requestFilters=this.fb.group({
  selectDestination: [""],
  selectStatus: [""],
  fromDate: [""],
  toDate: [""]
})
// FormBuilder





  searchVal:any;
  SearchFunction(){
    TableUtil.SearchFunction(this.searchVal);
  }
  // SearchFunction(){
  //   // Declare variables
  //   var input, filter, table, tr, td, i,j;
  //   // input = document.getElementById("search_field_input");
  //   // filter = input.value.toUpperCase();
  //   filter = this.searchVal.toLowerCase();
  //   table = document.getElementById("ExampleTable");
  //   tr = table.getElementsByTagName("tr");

  //   // Loop through all table rows, and hide those who don't match the search query
  //   for (i = 0; i < tr.length; i++) {
  //     td = tr[i].getElementsByTagName("td");

  //     for(j=0 ; j<td.length ; j++)
  //     {
  //       let tdata = td[j];
  //       if (tdata) {
  //         if (tdata.innerHTML.toLowerCase().indexOf(filter) > -1) {
  //           tr[i].style.display = "";
  //           break ;
  //         } else {
  //           tr[i].style.display = "none";
  //         }
  //       }
  //     }
  //   }
  }


