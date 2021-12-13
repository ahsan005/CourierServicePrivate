import { OnInit } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { OrderBookingForm } from "./../models/order-booking-form";
import { jsPDF } from "jspdf";
import * as JsBarcode from "jsbarcode";
import * as XLSX from "xlsx";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from "html2canvas";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class TableUtil {
  static exportToExcel(tableId: string, name?: string) {
    let timeSpan = new Date().toISOString();
    let prefix = name || "ExportResult";
    let fileName = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{
      sheet: prefix,
    });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  static generatePDF(TableId: string, name?: string) {
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
      pdf.save(fileName + ".pdf");
    });
  }

  static generatePdfV2(OrderBooking: OrderBookingForm[]) {
    // const documentDefinition = { content: html };
    console.log(OrderBooking);
    var rows = [];
    rows.push([
      "Tracking#",
      "Date",
      "Product Description",
      "Quantity",
      "ConsigneeName",
      "ConsigneeMobile",
      "ConsigneeAddress",
      "DestinationCity",
      "Shipper Name",
      "Shipper Mobile",
      "Shipper Address",
      "Origin City",
      "COD",
      "Delivery Fee",
      "Status",
    ]);
    OrderBooking.forEach(function (item) {

      rows.push([
        item.OrderBookingId,
        item.OrderBookingOn,
        item.ProductCode,
        item.ProductDescription,
        item.ConsigneeName,
        item.ConsigneeMobile,
        item.ConsigneeAddress,
        item.DestinationCityName,
        item.ShipperName,
        item.ShipperMobile,
        item.ShipperAddress,
        item.OriginCityName,
        item.CODAmount,
        item.DeliveryFee,
        item.StatusName,
      ]);
    });
    var docDefinition = {
      pageOrientation: 'landscape',
      pageMargins: [5, 5, 0, 5],
      content: [
        {
          layout: "lightHorizontalLines", // optional

          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],

            body: rows
          },
        },
      ],
    };
    pdfMake.createPdf(docDefinition).open();
  }

  //  SearchTable
  static SearchFunction(searchVal: any) {
    // Declare variables
    var input, filter, table, tr, td, i, j;
    // input = document.getElementById("search_field_input");
    // filter = input.value.toUpperCase();
    filter = searchVal.toLowerCase();
    table = document.getElementById("ExampleTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");

      for (j = 0; j < td.length; j++) {
        let tdata = td[j];
        if (tdata) {
          if (tdata.innerHTML.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            break;
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
  //  SearchTable

  // Generate PDF Report Using PDFMAKE
  static generatePdfInvoice(
    orderBookingObj: OrderBookingForm,
    action = "open"
  ) {
    const documentDefinition = this.getDocumentDefinition(orderBookingObj);
    switch (action) {
      case "open":
        pdfMake.createPdf(documentDefinition).open();
        break;
      case "print":
        pdfMake.createPdf(documentDefinition).print();
        break;
      case "download":
        pdfMake.createPdf(documentDefinition).download();
        break;
      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  static textToBase64Barcode(text) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, { format: "CODE39" });
    return canvas.toDataURL("image/png");
  }

  // http://localhost:4200/assets/images/happ1%20(1).png
  static getDocumentDefinition(orderBookingObj: OrderBookingForm) {
    this.toDataURL(
      "http://localhost:4200/assets/images/happ1_JPG.jpg",
      function (dataUrl) {
        if (!sessionStorage.getItem("LOGO")) {
          // logo = dataUrl;
          // console.log(logo);
          sessionStorage.setItem("LOGO", dataUrl);
        }
      }
    );
    var dateString = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Karachi",
    });
    const date = dateString.split(",");
    var barCode = this.textToBase64Barcode(orderBookingObj.OrderBookingId);
    console.log(barCode);

    var BookingID = orderBookingObj.OrderBookingId;
    var logoFromSession = sessionStorage.getItem("LOGO");

    return {
      header: function (pageSize) {
        // you can apply any logic and return any valid pdfmake element
        var currentDate = new Date();
        var headerText =
          currentDate.toLocaleString("en-US", { timeZone: "Asia/Karachi" }) +
          "                                      Order/Tracking#" +
          BookingID;

        return [
          { text: headerText, alignment: "left" },
          {
            canvas: [
              { type: "rect", x: 170, y: 32, w: pageSize.width - 170, h: 40 },
            ],
          },
        ];
      },
      pageSize: "A4",
      pageMargins: [5, 25, 0, 5],
      content: [
        {
          style: "tableExample",
          table: {
            widths: [85, 250, 30, 75, 42.5, 50],

            body: [
              // ["width=100", "star-sized", "width=200", "star-sized"],
              [
                {
                  rowSpan: 3,
                  image: String(logoFromSession),
                  width: 60,
                  height: 40,
                  margin: [0, 12.5, 0, 0],
                  border: [true, true, true, true],
                  alignment: "center",
                },
                {
                  rowSpan: 3,
                  image: String(barCode),
                  width: 150,
                  height: 60,
                  border: [true, true, false, true],
                  alignment: "center",
                },
                { text: "Date", style: "header", margin: [0, 5] },
                { text: date[0], style: "content", margin: [0, 5] },
                { text: "COD Amount", style: "header" },
                {
                  text: orderBookingObj.CODAmount,
                  style: "content",
                  margin: [0, 5],
                },
                // {
                //   text: "nothing interesting here",
                //   italics: true,
                //   color: "gray",
                // },
              ],
              [
                {},
                {},
                {
                  text: "Service",
                  style: "header",
                },
                { text: "COD", style: "content" },
                { text: "" },
                { text: "" },
              ],
              [
                {},
                {},
                { text: "Origin", style: "header", margin: [0, 5] },
                {
                  text: orderBookingObj.OriginCityName,
                  style: "content",
                  margin: [0, 5],
                },
                { text: "Destination", style: "header", margin: [0, 5] },
                {
                  text: orderBookingObj.DestinationCityName,
                  style: "content",
                  margin: [0, 5],
                },
              ],

              [
                {
                  colSpan: 2,
                  text: "Shipper",
                  style: "header",
                  alignment: "center",
                },
                {},
                {
                  colSpan: 4,
                  text: "Consignee",
                  style: "header",
                  alignment: "center",
                },
                {},
                {},
                {},
              ],

              [
                {
                  border: [true, true, false, true],
                  text: "Company Name",
                  style: "header",
                },
                {
                  border: [false, true, false, true],
                  text: orderBookingObj.ShipperName,
                  style: "content",
                },
                {
                  border: [true, true, false, true],
                  text: "Name",
                  style: "header",
                },
                {
                  border: [false, true, true, true],
                  colSpan: 3,
                  text: orderBookingObj.ConsigneeName,
                  style: "content",
                },
                {},
                {},
              ],

              [
                {
                  border: [true, true, false, true],
                  text: "Phone No",
                  style: "header",
                },
                {
                  border: [false, true, false, true],
                  text: orderBookingObj.ShipperMobile,
                  style: "content",
                },
                {
                  border: [true, true, false, true],
                  text: "Address",
                  style: "header",
                },
                {
                  border: [false, true, true, true],
                  colSpan: 3,
                  text: orderBookingObj.ConsigneeAddress,
                  style: "content",
                },
                {},
                {},
              ],

              [
                {
                  border: [true, true, false, true],
                  text: "Address",
                  style: "header",
                },
                {
                  border: [false, true, false, true],
                  text: orderBookingObj.ShipperAddress,
                  style: "content",
                },
                {
                  border: [true, true, false, true],
                  text: "Phone#",
                  style: "header",
                },
                {
                  border: [false, true, true, true],
                  colSpan: 3,
                  text: orderBookingObj.ConsigneeMobile,
                  style: "content",
                },
                {},
                {},
              ],

              [
                {
                  text: "Customer Ref#",
                  style: "header",
                },
                {
                  colSpan: 2,
                  text: "#",
                  alignment: "center",
                  style: "content",
                },
                {},
                { colSpan: 2, text: "Product Code", style: "header" },
                {},
                { text: orderBookingObj.ProductCode, style: "content" },
              ],
              [
                { text: "COD Amount", style: "header" },
                {
                  text: "Rs." + orderBookingObj.CODAmount,
                  bold: true,
                  style: "content",
                },
                {
                  text: "Weight",
                  style: "header",
                },
                {
                  text: orderBookingObj.WeightProfileId,
                  alignment: "center",
                  style: "content",
                },
                {
                  text: "Quantity",
                  style: "header",
                },
                {
                  text: orderBookingObj.Quantity,
                  alignment: "center",
                  style: "content",
                },
              ],
              [
                {
                  text: "Product Description",
                  style: "header",
                  margin: [0, 10, 10, 5],
                },

                {
                  colSpan: 5,
                  text: orderBookingObj.ProductDescription,
                  margin: [0, 10, 10, 10],
                  style: "content",
                },
                {},
                {},
                {},
                {},
              ],

              [
                {
                  text: "Special Instruction",
                  style: "header",
                  margin: [0, 10, 10, 5],
                },
                {
                  colSpan: 5,
                  text: orderBookingObj.SpecialInstruction,
                  margin: [0, 10, 10, 10],
                  style: "content",
                },
                {},
                {},
                {},
                {},
              ],

              [
                {
                  colSpan: 6,
                  text: "Kindly do not give any additional charges to the Rider/Courier. If shipment is found in torn or damaged condition, please do not receive.",
                  style: "content",
                },
                {},
                {},
                {},
                {},
                {},
              ],
            ],
          },
        },
        { text: "", style: "headerSpacing" },
        {
          style: "tableExample",
          table: {
            widths: [85, 250, 30, 75, 42.5, 50],

            body: [
              // ["width=100", "star-sized", "width=200", "star-sized"],
              [
                {
                  rowSpan: 3,
                  image: String(logoFromSession),
                  width: 60,
                  height: 40,
                  margin: [0, 12.5, 0, 0],
                  border: [true, true, true, true],
                  alignment: "center",
                },
                {
                  rowSpan: 3,
                  image: String(barCode),
                  width: 150,
                  height: 60,
                  border: [true, true, false, true],
                  alignment: "center",
                },
                { text: "Date", style: "header", margin: [0, 5] },
                { text: date[0], style: "content", margin: [0, 5] },
                { text: "COD Amount", style: "header" },
                {
                  text: orderBookingObj.CODAmount,
                  style: "content",
                  margin: [0, 5],
                },
                // {
                //   text: "nothing interesting here",
                //   italics: true,
                //   color: "gray",
                // },
              ],
              [
                {},
                {},
                {
                  text: "Service",
                  style: "header",
                },
                { text: "COD", style: "content" },
                { text: "" },
                { text: "" },
              ],
              [
                {},
                {},
                { text: "Origin", style: "header", margin: [0, 5] },
                {
                  text: orderBookingObj.OriginCityName,
                  style: "content",
                  margin: [0, 5],
                },
                { text: "Destination", style: "header", margin: [0, 5] },
                {
                  text: orderBookingObj.DestinationCityName,
                  style: "content",
                  margin: [0, 5],
                },
              ],

              [
                {
                  colSpan: 2,
                  text: "Shipper",
                  style: "header",
                  alignment: "center",
                },
                {},
                {
                  colSpan: 4,
                  text: "Consignee",
                  style: "header",
                  alignment: "center",
                },
                {},
                {},
                {},
              ],

              [
                {
                  border: [true, true, false, true],
                  text: "Company Name",
                  style: "header",
                },
                {
                  border: [false, true, false, true],
                  text: orderBookingObj.ShipperName,
                  style: "content",
                },
                {
                  border: [true, true, false, true],
                  text: "Name",
                  style: "header",
                },
                {
                  border: [false, true, true, true],
                  colSpan: 3,
                  text: orderBookingObj.ConsigneeName,
                  style: "content",
                },
                {},
                {},
              ],

              [
                {
                  border: [true, true, false, true],
                  text: "Phone No",
                  style: "header",
                },
                {
                  border: [false, true, false, true],
                  text: orderBookingObj.ShipperMobile,
                  style: "content",
                },
                {
                  border: [true, true, false, true],
                  text: "Address",
                  style: "header",
                },
                {
                  border: [false, true, true, true],
                  colSpan: 3,
                  text: orderBookingObj.ConsigneeAddress,
                  style: "content",
                },
                {},
                {},
              ],

              [
                {
                  border: [true, true, false, true],
                  text: "Address",
                  style: "header",
                },
                {
                  border: [false, true, false, true],
                  text: orderBookingObj.ShipperAddress,
                  style: "content",
                },
                {
                  border: [true, true, false, true],
                  text: "Phone#",
                  style: "header",
                },
                {
                  border: [false, true, true, true],
                  colSpan: 3,
                  text: orderBookingObj.ConsigneeMobile,
                  style: "content",
                },
                {},
                {},
              ],

              [
                {
                  text: "Customer Ref#",
                  style: "header",
                },
                {
                  colSpan: 2,
                  text: "#",
                  alignment: "center",
                  style: "content",
                },
                {},
                { colSpan: 2, text: "Product Code", style: "header" },
                {},
                { text: orderBookingObj.ProductCode, style: "content" },
              ],
              [
                { text: "COD Amount", style: "header" },
                {
                  text: "Rs." + orderBookingObj.CODAmount,
                  bold: true,
                  style: "content",
                },
                {
                  text: "Weight",
                  style: "header",
                },
                {
                  text: orderBookingObj.WeightProfileId,
                  alignment: "center",
                  style: "content",
                },
                {
                  text: "Quantity",
                  style: "header",
                },
                {
                  text: orderBookingObj.Quantity,
                  alignment: "center",
                  style: "content",
                },
              ],
              [
                {
                  text: "Product Description",
                  style: "header",
                  margin: [0, 10, 10, 5],
                },

                {
                  colSpan: 5,
                  text: orderBookingObj.ProductDescription,
                  margin: [0, 10, 10, 10],
                  style: "content",
                },
                {},
                {},
                {},
                {},
              ],

              [
                {
                  text: "Special Instruction",
                  style: "header",
                  margin: [0, 10, 10, 5],
                },
                {
                  colSpan: 5,
                  text: orderBookingObj.SpecialInstruction,
                  margin: [0, 10, 10, 10],
                  style: "content",
                },
                {},
                {},
                {},
                {},
              ],

              [
                {
                  colSpan: 6,
                  text: "Kindly do not give any additional charges to the Rider/Courier. If shipment is found in torn or damaged condition, please do not receive.",
                  style: "content",
                },
                {},
                {},
                {},
                {},
                {},
              ],
            ],
          },
        },
        { text: "", style: "headerSpacing" },
        {
          style: "tableExample",
          table: {
            widths: [85, 250, 30, 75, 42.5, 50],

            body: [
              // ["width=100", "star-sized", "width=200", "star-sized"],
              [
                {
                  rowSpan: 3,
                  image: String(logoFromSession),
                  width: 60,
                  height: 40,
                  margin: [0, 12.5, 0, 0],
                  border: [true, true, true, true],
                  alignment: "center",
                },
                {
                  rowSpan: 3,
                  image: String(barCode),
                  width: 150,
                  height: 60,
                  border: [true, true, false, true],
                  alignment: "center",
                },
                { text: "Date", style: "header", margin: [0, 5] },
                { text: date[0], margin: [0, 5], style: "content" },
                { text: "COD Amount", style: "header" },
                {
                  text: orderBookingObj.CODAmount,
                  margin: [0, 5],
                  style: "content",
                },
                // {
                //   text: "nothing interesting here",
                //   italics: true,
                //   color: "gray",
                // },
              ],
              [
                {},
                {},
                {
                  text: "Service",
                  style: "header",
                  margin: [0, 5],
                },
                { text: "COD", style: "content" },
                { text: "" },
                { text: "" },
              ],
              [
                {},
                {},
                { text: "Origin", style: "header", margin: [0, 5] },
                {
                  text: orderBookingObj.OriginCityName,
                  margin: [0, 5],
                  style: "content",
                },
                { text: "Destination", style: "header", margin: [0, 5] },
                {
                  text: orderBookingObj.DestinationCityName,
                  margin: [0, 5],
                  style: "content",
                },
              ],

              [
                {
                  colSpan: 2,
                  text: "Shipper",
                  style: "header",
                  alignment: "center",
                },
                {},
                {
                  colSpan: 4,
                  text: "Consignee",
                  style: "header",
                  alignment: "center",
                },
                {},
                {},
                {},
              ],

              [
                {
                  border: [true, true, false, true],
                  text: "Company Name",
                  style: "header",
                },
                {
                  border: [false, true, false, true],
                  text: orderBookingObj.ShipperName,
                  style: "content",
                  alignment: "center",
                },
                {
                  border: [true, true, false, true],
                  text: "Name",
                  style: "header",
                  alignment: "center",
                },
                {
                  border: [false, true, true, true],
                  colSpan: 3,
                  text: orderBookingObj.ConsigneeName,
                  style: "content",
                  alignment: "center",
                },
                {},
                {},
              ],

              [
                {
                  border: [true, true, false, true],
                  text: "Phone No",
                  style: "header",
                },
                {
                  border: [false, true, false, true],
                  text: orderBookingObj.ShipperMobile,
                  style: "content",
                  alignment: "center",
                },
                {
                  border: [true, true, false, true],
                  text: "Address",
                  style: "header",
                },
                {
                  border: [false, true, true, true],
                  colSpan: 3,
                  text: orderBookingObj.ConsigneeAddress,
                  style: "content",
                  alignment: "center",
                },
                {},
                {},
              ],

              [
                {
                  border: [true, true, false, true],
                  text: "Address",
                  style: "header",
                },
                {
                  border: [false, true, false, true],
                  text: orderBookingObj.ShipperAddress,
                  style: "content",
                  alignment: "center",
                },
                {
                  border: [true, true, false, true],
                  text: "Phone#",
                  style: "header",
                },
                {
                  border: [false, true, true, true],
                  colSpan: 3,
                  text: orderBookingObj.ConsigneeMobile,
                  style: "content",
                  alignment: "center",
                },
                {},
                {},
              ],

              [
                {
                  text: "Customer Ref#",
                  style: "header",
                },
                {
                  colSpan: 2,
                  text: "#",
                  alignment: "center",
                  style: "content",
                },
                {},
                { colSpan: 2, text: "Product Code", style: "header" },
                {},
                { text: orderBookingObj.ProductCode, style: "content" },
              ],
              [
                { text: "COD Amount", style: "header" },
                {
                  text: "Rs." + orderBookingObj.CODAmount,
                  bold: true,
                  style: "content",
                },
                {
                  text: "Weight",
                  style: "header",
                },
                {
                  text: orderBookingObj.WeightProfileId,
                  alignment: "center",
                  style: "content",
                },
                {
                  text: "Quantity",
                  style: "header",
                },
                {
                  text: orderBookingObj.Quantity,
                  alignment: "center",
                  style: "content",
                },
              ],
              [
                {
                  text: "Product Description",
                  style: "header",
                  margin: [0, 10, 10, 5],
                },

                {
                  colSpan: 5,
                  text: orderBookingObj.ProductDescription,
                  margin: [0, 10, 10, 10],
                  style: "content",
                },
                {},
                {},
                {},
                {},
              ],

              [
                {
                  text: "Special Instruction",
                  style: "header",
                  margin: [0, 10, 10, 5],
                },
                {
                  colSpan: 5,
                  text: orderBookingObj.SpecialInstruction,
                  margin: [0, 10, 10, 10],
                  style: "content",
                },
                {},
                {},
                {},
                {},
              ],

              [
                {
                  colSpan: 6,
                  text: "Kindly do not give any additional charges to the Rider/Courier. If shipment is found in torn or damaged condition, please do not receive.",
                  style: "content",
                },
                {},
                {},
                {},
                {},
                {},
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 8,
          bold: true,
          alignment: "left",
        },
        content: {
          fontSize: 8,
        },
        headerSpacing: {
          margin: [0, 0, 0, 40],
        },
      },
    };
  }

  static toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  // Generate PDF Report Using PDFMAKE
}
