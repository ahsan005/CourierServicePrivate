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
    var docDefinition = {
      content: [
        {
          layout: "lightHorizontalLines", // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["*", "auto", 100, "*", "*", "*", "*", "*"],

            body: [
              [
                "Sr No.",
                "Order No.",
                "Order Date",
                "Shipment Details",
                "Receiver Details",
                "Payments",
                "Status",
                "Action",
              ],
              [
                "Value 1",
                "Value 2",
                "Value 3",
                "Value 4",
                "Value 5 ",
                "Value 6",
                "Value 7",
                "Value 8",
              ],
            ],
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

  resume;
  // Generate PDF Report Using PDFMAKE
  static generatePdf(orderBookingObj: OrderBookingForm, action = "open") {
    const documentDefinition = this.getDocumentDefinitionV2P(orderBookingObj);
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
  resetForm() {
    // this.resume = new Resume();
  }
  static textToBase64Barcode(text) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, { format: "CODE39" });
    return canvas.toDataURL("image/png");
  }

  // http://localhost:4200/assets/images/happ1%20(1).png
  static getDocumentDefinitionV2P(orderBookingObj: OrderBookingForm) {
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
      pageSize: "A3",

      content: [
        {
          style: "tableExample",
          table: {
            widths: [125, 200, 60, 100, 100, 100],

            body: [
              // ["width=100", "star-sized", "width=200", "star-sized"],
              [
                {
                  rowSpan: 3,
                  image: String(logoFromSession),
                  width: 80,
                  height: 55,
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
                { text: "Date", style: "header" },
                { text: date[0] },
                { text: "COD Amount", style: "header" },
                { text: orderBookingObj.CODAmount },
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
                { text: "COD" },
                { text: "" },
                { text: "" },
              ],
              [
                {},
                {},
                { text: "Origin", style: "header" },
                { text: orderBookingObj.OriginCityName },
                { text: "Destination", style: "header" },
                { text: orderBookingObj.DestinationCityName },
              ],

              [
                { colSpan: 2, text: "Shipper", style: "header" },
                {},
                {
                  colSpan: 4,
                  text: "Consignee",
                  style: "header",
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
                },
                {
                  border: [true, true, false, true],
                  text: "Phone No",
                  style: "header",
                },
                {
                  border: [false, true, true, true],
                  colSpan: 3,
                  text: orderBookingObj.ConsigneeMobile,
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
                  text: "hello",
                  alignment: "center",
                },
                {},
                {
                  colSpan: 2,
                  text: "Product Code",
                  style: "header",
                },
                {},
                {
                  text: orderBookingObj.ProductCode,
                },
              ],
              [
                { text: "COD Amount", style: "header" },
                {
                  text: "Rs." + orderBookingObj.CODAmount,
                  bold: true,
                },
                {
                  text: "Weight",
                  style: "header",
                },
                {
                  text: orderBookingObj.WeightProfileId,
                  alignment: "center",
                },
                {
                  text: "Quantity",
                  style: "header",
                },
                {
                  text: orderBookingObj.Quantity,
                  alignment: "center",
                },
              ],
              [
                {
                  text: "Product Description",
                  style: "header",
                  margin: [10, 5, 10, 5],
                },

                {
                  colSpan: 5,
                  text: orderBookingObj.ProductDescription,
                  margin: [10, 10, 10, 10],
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
                  margin: [10, 5, 10, 5],
                },
                {
                  colSpan: 5,
                  text: orderBookingObj.SpecialInstruction,
                  margin: [10, 10, 10, 10],
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
          bold: true,
          alignment: "center",
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

  getDocumentDefinition() {
    sessionStorage.setItem("resume", JSON.stringify(this.resume));
    return {
      content: [
        {
          text: "RESUME",
          bold: true,
          fontSize: 20,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        {
          columns: [
            [
              {
                text: this.resume.name,
                style: "name",
              },
              {
                text: this.resume.address,
              },
              {
                text: "Email : " + this.resume.email,
              },
              {
                text: "Contant No : " + this.resume.contactNo,
              },
              {
                text: "GitHub: " + this.resume.socialProfile,
                link: this.resume.socialProfile,
                color: "blue",
              },
            ],
            [this.getProfilePicObject()],
          ],
        },
        {
          text: "Skills",
          style: "header",
        },
        {
          columns: [
            {
              ul: [
                ...this.resume.skills
                  .filter((value, index) => index % 3 === 0)
                  .map((s) => s.value),
              ],
            },
            {
              ul: [
                ...this.resume.skills
                  .filter((value, index) => index % 3 === 1)
                  .map((s) => s.value),
              ],
            },
            {
              ul: [
                ...this.resume.skills
                  .filter((value, index) => index % 3 === 2)
                  .map((s) => s.value),
              ],
            },
          ],
        },
        {
          text: "Experience",
          style: "header",
        },
        this.getExperienceObject(this.resume.experiences),
        {
          text: "Education",
          style: "header",
        },
        this.getEducationObject(this.resume.educations),
        {
          text: "Other Details",
          style: "header",
        },
        {
          text: this.resume.otherDetails,
        },
        {
          text: "Signature",
          style: "sign",
        },
        {
          columns: [
            {
              qr: this.resume.name + ", Contact No : " + this.resume.contactNo,
              fit: 100,
            },
            {
              text: `(${this.resume.name})`,
              alignment: "right",
            },
          ],
        },
      ],
      info: {
        title: this.resume.name + "_RESUME",
        author: this.resume.name,
        subject: "RESUME",
        keywords: "RESUME, ONLINE RESUME",
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: "underline",
        },
        name: {
          fontSize: 16,
          bold: true,
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true,
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: "right",
          italics: true,
        },
        tableHeader: {
          bold: true,
        },
      },
    };
  }
  getExperienceObject(experiences) {
    const exs = [];
    experiences.forEach((experience) => {
      exs.push([
        {
          columns: [
            [
              {
                text: experience.jobTitle,
                style: "jobTitle",
              },
              {
                text: experience.employer,
              },
              {
                text: experience.jobDescription,
              },
            ],
            {
              text: "Experience : " + experience.experience + " Months",
              alignment: "right",
            },
          ],
        },
      ]);
    });
    return {
      table: {
        widths: ["*"],
        body: [...exs],
      },
    };
  }
  getEducationObject(educations) {
    return {
      table: {
        widths: ["*", "*", "*", "*"],
        body: [
          [
            {
              text: "Degree",
              style: "tableHeader",
            },
            {
              text: "College",
              style: "tableHeader",
            },
            {
              text: "Passing Year",
              style: "tableHeader",
            },
            {
              text: "Result",
              style: "tableHeader",
            },
          ],
          ...educations.map((ed) => {
            return [ed.degree, ed.college, ed.passingYear, ed.percentage];
          }),
        ],
      },
    };
  }
  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic,
        width: 75,
        alignment: "right",
      };
    }
    return null;
  }
  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }
  addSkill() {
    // this.resume.skills.push(new Skill());
  }
  // Generate PDF Report Using PDFMAKE
}
