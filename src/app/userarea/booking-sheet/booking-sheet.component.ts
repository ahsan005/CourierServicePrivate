import { TableUtil } from './../../utilities/tableutil';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-booking-sheet',
  templateUrl: './booking-sheet.component.html',
  styleUrls: ['./booking-sheet.component.scss']
})
export class BookingSheetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  generatePDF(){
    TableUtil.generatePDF("ExampleTable")
  }
  exportTable() {
    TableUtil.exportToExcel("ExampleTable");
  }

}
