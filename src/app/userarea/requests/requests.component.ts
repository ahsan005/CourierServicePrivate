import { SharedService } from './../../services/shared.service';
import { TableUtil } from "./../../utilities/tableutil";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import jsPDF from "jspdf";
import htmlToPdfmake from "html-to-pdfmake";
import html2canvas from "html2canvas";
import { UserService } from "../../services/user.service";
import { Filters } from '../../models/filters';


@Component({
  selector: "ngx-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.scss"],
})
export class RequestsComponent implements OnInit {
  @ViewChild("pdfTable") pdfTable: ElementRef;
  requestsFilter:Filters

  onSubmit() {
    console.log(this.requestFilters);
    this.requestsFilter = new Filters(this.requestFilters.value);



    console.log(this.requestsFilter);
    this.userService.GetOrdersFiltered(this.requestsFilter).subscribe((data) => {


      //  = JSON.stringify(data)
      var response = JSON.parse(JSON.stringify(data));
       console.log(response)
  //     console.log("Status", response);
      if (response.Status) {
        alert(response.Message);
      } else {
        console.log(response.Message);
      }
    });

  }

  public downloadAsPDF() {
    const doc = new jsPDF();

    const pdfTable = this.pdfTable.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);
    TableUtil.generatePdfV2(html);
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).open();
  }

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
  constructor(private fb: FormBuilder, private userService: UserService, private sharedService:SharedService) {
    this.GetOrderBookingRequests();
    this.initialize();

  }

  ngOnInit(): void {
    this.GetOrderBookingRequests()
    this.initialize()
  }
  exportTable() {
    TableUtil.exportToExcel("ExampleTable");
  }
  requestFilters = this.fb.group({
    destinationCityId: [""],
    status: [""],
    fromDate: [""],
    toDate: [""],
  });
  list: any;
  GetOrderBookingRequests() {
    this.userService.GetOrders().subscribe((result) => {
      console.warn("result", result);
      var response = JSON.parse(JSON.stringify(result));
      this.list = response.Data;
    });
  }
  citiesLOV:any;
  initialize() {
    this.sharedService.GetAllCities().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);

      this.citiesLOV = response.Data;
    });
  }

}
