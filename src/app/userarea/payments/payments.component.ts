import { TableUtil } from "./../../utilities/tableutil";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"],
})
export class PaymentsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  generatePDF() {
    // var data = document.getElementById("ExampleTable");
    // html2canvas(data).then((canvas) => {
    //   var imgWidth = 208;
    //   var imgHeight = (canvas.height * imgWidth) / canvas.width;
    //   const contentDataURL = canvas.toDataURL("image/png");
    //   let pdf = new jsPDF("p", "mm", "a4");
    //   var position = 0;
    //   pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
    //   pdf.save("newPDF.pdf");
    // });
    TableUtil.generatePDF("ExampleTable");
  }
  exportTable() {
    TableUtil.exportToExcel("ExampleTable");
  }
  searchVal: any;

  // SearchFunction() {
  //   console.log("Hello");
  //   // Declare variables
  //   var input, filter, table, tr, td, i, txtValue;
  //   // input = document.getElementById("myInput");

  //   // filter = input.value.toUpperCase();
  //   filter = this.searchVal;
  //   table = document.getElementById("ExampleTable");
  //   tr = table.getElementsByTagName("tr");

  //   // Loop through all table rows, and hide those who don't match the search query
  //   for (i = 0; i < tr.length; i++) {
  //     td = tr[i].getElementsByTagName("td")[6];
  //     if (td) {
  //       txtValue = td.textContent || td.innerText;
  //       if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //         tr[i].style.display = "";
  //       } else {
  //         tr[i].style.display = "none";
  //       }
  //     }
  //   }
  // }

   SearchFunction(){
    // Declare variables
    var input, filter, table, tr, td, i,j;
    // input = document.getElementById("search_field_input");
    // filter = input.value.toUpperCase();
    filter = this.searchVal.toLowerCase();
    table = document.getElementById("ExampleTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");

      for(j=0 ; j<td.length ; j++)
      {
        let tdata = td[j];
        if (tdata) {
          if (tdata.innerHTML.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            break ;
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
}
