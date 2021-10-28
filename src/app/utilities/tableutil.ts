
import { jsPDF } from 'jspdf';
import * as XLSX from "xlsx";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from "html2canvas";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class TableUtil {
  static exportToExcel(tableId: string, name?: string) {
    let timeSpan = new Date().toISOString();
    let prefix = name || "ExportResult";
    let fileName = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  static generatePDF(TableId:string,name?:string) {
    var data = document.getElementById("ExampleTable");
    html2canvas(data).then((canvas) => {
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL("image/png");
      let timeSpan = new Date().toISOString();
    let prefix = name || "ExportResult";
    let fileName = `${prefix}-${timeSpan}`;
      let pdf = new jsPDF("p", "mm", "a4");
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save(fileName+'.pdf');
    });
  }

  static generatePdfV2(html:any){
    // const documentDefinition = { content: html };
    console.log(html);
    var docDefinition = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*','*','*','*','*' ],

            body: [
              [ 'Sr No.', 'Order No.', 'Order Date', 'Shipment Details','Receiver Details','Payments','Status','Action' ],
              [ 'Value 1', 'Value 2', 'Value 3', 'Value 4','Value 5 ','Value 6', 'Value 7','Value 8']


            ]
          }
        }
      ]
    };
    pdfMake.createPdf(docDefinition).open();
   }

  //  SearchTable
  static SearchFunction(searchVal:any){
    // Declare variables
    var input, filter, table, tr, td, i,j;
    // input = document.getElementById("search_field_input");
    // filter = input.value.toUpperCase();
    filter = searchVal.toLowerCase();
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
  //  SearchTable

}
