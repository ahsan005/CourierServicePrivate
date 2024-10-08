import { OnInit } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { OrderBookingForm } from "./../models/order-booking-form";
import { jsPDF } from "jspdf";
import * as JsBarcode from "jsbarcode";
import * as XLSX from "xlsx";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from "html2canvas";
import { Employee } from "../models/employee";
import { LOV } from "../models/citiesLOV";

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

  static exportToExcelV2(listOfObjects: any, name?) {
    let timeSpan = new Date().toISOString();
    let prefix = name || "ExportResult";
    let fileName = `${prefix}-${timeSpan}`;

    let ws = XLSX.utils.json_to_sheet(listOfObjects);

    // Create a new Workbook
    var wb = XLSX.utils.book_new();

    // Name your sheet
    XLSX.utils.book_append_sheet(wb, ws, name);

    // export your excel
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

  static generatePdfTable(OrderBooking: OrderBookingForm[]) {
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
    console.log(rows);

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
      pageOrientation: "landscape",
      pageMargins: [5, 5, 0, 5],
      content: [
        {
          layout: "lightHorizontalLines", // optional

          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [
              50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
            ],

            body: rows,
          },
        },
      ],
      defaultStyle: {
        fontSize: 10,
        bold: true,
      },
    };
    pdfMake.createPdf(docDefinition).open();
  }

  static generateDeliveryRunSheet(
    OrderBooking: OrderBookingForm[],
    riderLOV: LOV
  ) {
    // const documentDefinition = { content: html };
    // debugger;
    //  let rows = this.SetRowsArray(OrderBooking);
    console.log(OrderBooking);

    var docDefinition = TableUtil.getDocumentDefinitionForDeliveryRunSheet(
      OrderBooking,
      riderLOV
    );
    pdfMake.createPdf(docDefinition).open();
  }
  static getDocumentDefinitionForDeliveryRunSheet(
    orderBookings: OrderBookingForm[],
    riderLOV: LOV
  ) {
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
    var riderAssigned = riderLOV.Text;
    var dateString = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Karachi",
    });
    const date = dateString.split(",");

    var logoFromSession = sessionStorage.getItem("LOGO");
    var rows = [];
    var serialNo = 1;
    rows.push([
      { text: "#", style: "tableHeader" },
      { text: "Tracking#", style: "tableHeader", alignment: "center" },
      { text: "Party", style: "tableHeader" },
      { text: "Consignee", style: "tableHeader" },
      { text: "Address", style: "tableHeader" },
      { text: "Phone#", style: "tableHeader" },
      { text: "COD", style: "tableHeader" },
      { text: "Signature", style: "tableHeader" },
    ]);
    // serial + 1,
    // "{image:" +
    //   String(TableUtil.textToBase64Barcode(item.OrderBookingId)) +
    //   ", width:150,height:100}",
    // item.PartyName,
    // item.ConsigneeName,
    // item.ConsigneeAddress + " " + item.DestinationCityName,
    // item.ConsigneeMobile,
    // item.CODAmount + item.DeliveryFee,
    // signatureBox,
    orderBookings.forEach((item) => {
      var barCode = this.textToBase64Barcode(item.OrderBookingId);
      var BookingID = item.OrderBookingId;
      rows.push([
        { text: serialNo, style: "tableContent" },
        {
          image: barCode,
          height: 45,
          width: 110,
          alignment: "center",
        },
        { text: item.PartyName, style: "tableContent" },
        {
          text: item.ConsigneeName,
          style: "tableContent",
        },
        {
          text: item.ConsigneeAddress + " " + item.DestinationCityName,
          style: "tableContent",
        },
        {
          text: "0" + item.ConsigneeMobile,
          style: "tableContent",
        },
        {
          text: item.CODAmount + item.DeliveryFee,
          style: "tableContent",
        },
        {},
      ]);
      serialNo++;
    });

    return {
      header: function (pageSize) {
        // you can apply any logic and return any valid pdfmake element
        var currentDate = new Date();
        var headerText = currentDate.toLocaleString("en-US", {
          timeZone: "Asia/Karachi",
        });

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
      pageMargins: [5, 25, 5, 30],
      content: [
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content

              image:
                "data:image/jpeg;base64,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ZSQRPbSRkEfCA3onkYDMhFLHL4q3KYtMCctNbOXQ+NiABVnaYXF5V3cAn1YdM1jNxiUg1wQD2ND6CeVzWE21hD77gEAZ+t21ses8XAPZOH3PsTgZvZdtHpcHbRxnkkkB1ityv06z/Frcr9Os/wAWtyv06z/Frcr9Os/xa3K/TrP8Wtyv06z/ABa3K/TrP8Wtyv06z/Frcr9Os/xa3K/TrP8AFrcr9Os/xawD2LYQw3KvL7KtpMi8RUckbsf0MwVVBJJOQAFOGblV7vWB1R7VOzu5LMzHMknWSTxPNfvP0bGrAEMAwByI5/0FYQypEEIdnIJ0lBrCrftGrCrftGrCrftGrCrftGrCrftGrCrftGrCrftGrCrftGrCrftGrCrftGrCrftGrCrftGrCrftGrCYPXasKt+0asKt+0asKt+0asKt+0asKt+0asKt+0asKt+0akCtNBHIQNQLjPfuFiiXkHlMehRzmtK2w7PkiB8KTrkI/dxvNfvOJuhwy3uIyBJFNdxJIp6wzAit1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardVg/fodqt1WD9+h2q3VYP36HardDhlxcyHJIobuJ3Y9CqpJPjPJi+oPHW4cf8AEJNBxyPGTEnKpoG5sM+SdB7nqcc3H5rOAfN3iLi/I8GBTq63PMKnLvyhVHIiDoUcw4/mv3nE/WYv4Kfp/wDWZf4L+M8mL6g8d+0J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",
              width: 100,
              margin: [40, 15],
              height: 40,
              border: [true, true, true, true],
            },
            //    {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            //      width: '*',
            //text: 'Second column'
            //   },
            {
              // fixed width
              width: "*",
              margin: [125, 20, 100, 100],
              text: "Delivery Run Sheet",
              style: "tableHeader",
            },
            {
              image:
                "data:image/png;base64,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",
              width: 125,
              height: 50,
              margin: [-40, 0],
              border: [true, true, true, true],
            },
          ],
        },
        {
          margin: [375, -50, 0, 25],
          style: "itemsTable",
          table: {
            widths: [90, 100],
            border: [true, true, true, true],
            heights: [25, 25, 25],

            body: [
              [
                //{ text: 'Hello'},
                { text: "Rider Name: ", style: "tableHeader" },
                { text: riderAssigned },
              ],
              [
                //{ text: 'Hello'},
                { text: "Date: ", style: "tableHeader" },
                { text: date },
              ],
              [
                //{ text: 'Hello'},
                { text: "Assignment No: ", style: "tableHeader" },
                { text: "123456789 " },
              ],
            ],
          },
          layout: "noBorders",
        },

        {
          // style: "tableExample",
          // margin: [0, 25, 0, 50],
          table: {
            headerRows: 1,
            widths: [25, "*", 30, 50, 75, 50, 40, 55],
            heights: 35,
            body: rows,
          },
          layout: "lightHorizontalLines",
        },
      ],
      // pageBreakBefore: function (
      //   currentNode,
      //   followingNodesOnPage,
      //   nodesOnNextPage,
      //   previousNodesOnPage
      // ) {
      //   return (
      //     currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0
      //   );
      // },
      pageBreakBefore: function (
        currentNode,
        followingNodesOnPage,
        nodesOnNextPage,
        previousNodesOnPage
      ) {
        return currentNode.startPosition.top >= 700;
      },

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableContent: {
          alignment: "center",
          fontSize: 8,
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: "black",
        },
      },
      defaultStyle: {
        // alignment: 'justify'
      },
    };
  }

  static generatePdfTableEmployee(employeeList: Employee[]) {
    // const documentDefinition = { content: html };
    console.log(employeeList);
    var rows = [];
    rows.push([
      "EmployeeId",
      "EmployeeName",
      "Mobile",
      "CNIC",
      "License No",
      "Date Of Birth",
    ]);
    employeeList.forEach(function (item) {
      rows.push([
        item.EmployeeId,
        item.EmployeeName,
        item.Mobile1,
        item.CNIC,
        item.LicenseNo,
        item.DOB,
      ]);
    });
    var docDefinition = {
      pageOrientation: "portrait",
      pageMargins: [5, 5, 0, 5],
      content: [
        {
          layout: "lightHorizontalLines", // optional

          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [75, 75, 75, 75, 75, 75],

            body: rows,
          },
        },
      ],
      defaultStyle: {
        fontSize: 10,
        bold: true,
      },
    };
    pdfMake.createPdf(docDefinition).open();
  }

  //  SearchTable
  static SearchFunction(searchVal: any) {
    if (searchVal != undefined) {
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
