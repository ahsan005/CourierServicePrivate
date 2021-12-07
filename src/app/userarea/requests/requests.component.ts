import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OrderBookingForm } from "./../../models/order-booking-form";
import { SharedService } from "./../../services/shared.service";
import { TableUtil } from "./../../utilities/tableutil";
import { Input, Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import jsPDF from "jspdf";
import htmlToPdfmake from "html-to-pdfmake";
import html2canvas from "html2canvas";
import { UserService } from "../../services/user.service";
import { Filters } from "../../models/filters";
import { LOV } from "../../models/citiesLOV";
import * as $ from "jquery";
import { EditRequestComponent } from "./popup/edit-request/edit-request.component";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "ngx-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.scss"],
})
export class RequestsComponent implements OnInit {
  @ViewChild("pdfTable") pdfTable: ElementRef;
  @Input() public orderBooking: OrderBookingForm;
  @Input() public citiesLOVForEditForm: any;
  requestsFilter: Filters;
  Orders = new Array<OrderBookingForm>();
  CitiesLOV = new Array<LOV>();
  serial: number = 0;
  // Pagination Variable
  p: number = 1;
  // Pagination Variable

  // Spinner Status
  loading = false;
  // Spinner Status

  onSubmit() {
    console.log(this.requestFilters);
    this.requestsFilter = new Filters(this.requestFilters.value);
    this.serial = 0;
    console.log(this.requestsFilter);
    this.userService
      .GetOrdersFiltered(this.requestsFilter)
      .subscribe((data) => {
        //  = JSON.stringify(data)
        var response = JSON.parse(JSON.stringify(data));
        console.log(response);
        this.Orders = response.Data;

        console.log("Hello Observable", this.Orders);
        //     console.log("Status", response);
        if (response.Status) {
          console.log(response.Message);
        } else {
          console.warn(response.Message);
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
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private toastrService: NbToastrService,

  ) {
    this.serial = 0;
    this.initialize();
  }

  ngOnInit(): void {
    this.initialize();
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
  // GetOrderBookingRequests() {
  //   });

  initialize() {
    this.sharedService.GetAllCities().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);

      this.CitiesLOV = response.Data;
    });
    this.loading = true;
    this.userService.GetOrders().subscribe((result) => {

      console.warn("result", result);
      var response = JSON.parse(JSON.stringify(result));

      this.Orders = response.Data;
      this.Orders.sort((a, b) => {
        return (
          <any>new Date(b.OrderBookingOn) - <any>new Date(a.OrderBookingOn)
        );
      });
      this.loading = false;
    });
  }

  editBtn(item?: OrderBookingForm) {
    const ref = this.modalService.open(EditRequestComponent, { size: "xl" });
    this.orderBooking = item;
    this.citiesLOVForEditForm = this.CitiesLOV;
    console.log(this.citiesLOVForEditForm);
    ref.componentInstance.orderBookingModel = this.orderBooking;
    ref.componentInstance.citiesLOV = this.citiesLOVForEditForm;

    ref.result.then(
      (yes) => {
        console.log("ok Click");
      },
      (cancel) => {
        console.log("cancel CLick");
      }
    );
  }
  private index: number = 0;

  showToast(position, status) {
    this.index += 1;
    this.toastrService.show(status || "Success", `Toast ${this.index}`, {
      position,
      status,
    });
  }



  searchVal: any;
  SearchFunction() {
    TableUtil.SearchFunction(this.searchVal);
  }
  viewDetails(){

  }

}
