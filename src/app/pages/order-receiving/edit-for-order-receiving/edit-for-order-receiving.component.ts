import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LOV } from "../../../models/citiesLOV";
import { OrderBookingForm } from "../../../models/order-booking-form";
import { SharedService } from "../../../services/shared.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "ngx-edit-for-order-receiving",
  templateUrl: "./edit-for-order-receiving.component.html",
  styleUrls: ["./edit-for-order-receiving.component.scss"],
})
export class EditForOrderReceivingComponent implements OnInit {
  citiesLOV = new Array<LOV>();
  orderBookingModel = new OrderBookingForm();
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.populateForm();
  }

  get originCityId() {
    return this.editOrder.get("originCityId");
  }
  get selectProfile() {
    return this.editOrder.get("selectProfile");
  }
  get shipperMobile() {
    return this.editOrder.get("shipperMobile");
  }
  get shipperEmail() {
    return this.editOrder.get("shipperEmail");
  }
  get shipperAddress() {
    return this.editOrder.get("shipperAddress");
  }
  get shipperName() {
    return this.editOrder.get("shipperName");
  }
  get destinationCityId() {
    return this.editOrder.get("destinationCityId");
  }
  get consigneeName() {
    return this.editOrder.get("consigneeName");
  }
  get consigneeMobile() {
    return this.editOrder.get("consigneeMobile");
  }
  get productCode() {
    return this.editOrder.get("productCode");
  }
  get quantity() {
    return this.editOrder.get("quantity");
  }
  get weightprofileId() {
    return this.editOrder.get("weightprofileId");
  }
  get productDescription() {
    return this.editOrder.get("productDescription");
  }
  get codAmount() {
    return this.editOrder.get("codAmount");
  }
  get specialInstruction() {
    return this.editOrder.get("specialInstruction");
  }
  get consigneeAddress() {
    return this.editOrder.get("consigneeAddress");
  }
  get consigneeEmail() {
    return this.editOrder.get("consigneeEmail");
  }
  public weightLOV: Array<Object> = [
    { id: "1", name: "0.5" },
    { id: "2", name: "1" },
    { id: "3", name: "2" },
    { id: "4", name: "3" },
    { id: "5", name: "4" },
    { id: "6", name: "5" },
    { id: "7", name: "6" },
    { id: "8", name: "7" },
    { id: "9", name: "8" },
    { id: "10", name: "9" },
    { id: "11", name: "10" },
    { id: "12", name: "11" },
    { id: "13", name: "12" },
    { id: "14", name: "13" },
    { id: "15", name: "14" },
    { id: "16", name: "15" },
    { id: "17", name: "16" },
    { id: "18", name: "17" },
    { id: "19", name: "18" },
    { id: "20", name: "19" },
    { id: "21", name: "20" },
  ];
  populateForm() {
    this.editOrder.patchValue({
      // ShipperInfo
      OrderBookingId: this.orderBookingModel.OrderBookingId,
      OrderBookingOn: this.orderBookingModel.OrderBookingOn,

      originCityId: this.orderBookingModel.OriginCityId,

      shipperName: this.orderBookingModel.ShipperName,
      shipperMobile: this.orderBookingModel.ShipperMobile,

      shipperEmail: this.orderBookingModel.ShipperEmail,
      shipperAddress: this.orderBookingModel.ShipperAddress,

      // ShipperInfo

      // Consignee Info
      destinationCityId: this.orderBookingModel.DestinationCityId,

      consigneeName: this.orderBookingModel.ConsigneeName,

      consigneeMobile: this.orderBookingModel.ConsigneeMobile,

      consigneeAddress: this.orderBookingModel.ConsigneeAddress,

      consigneeEmail: this.orderBookingModel.ConsigneeEmail,

      // Consignee Info
      // Shipment Details
      productCode: this.orderBookingModel.ProductCode,
      quantity: this.orderBookingModel.Quantity,
      weightprofileId: this.orderBookingModel.WeightProfileId,

      codAmount: this.orderBookingModel.CODAmount,
      productDescription: this.orderBookingModel.ProductDescription,
      // Validators.required,

      specialInstruction: this.orderBookingModel.SpecialInstruction,
      createdById: this.orderBookingModel.CreatedById,

      // Shipment Details
    });
  }

  editOrder = this.fb.group({
    // ShipperInfo
    OrderBookingId: [""],
    OrderBookingOn: ["", Validators.required],
    originCityId: ["", Validators.required],
    selectProfile: [""],
    shipperName: ["", Validators.required],
    shipperMobile: ["", Validators.required],
    shipperEmail: ["", Validators.required],
    shipperAddress: ["", Validators.required],
    // ShipperInfo

    // Consignee Info
    destinationCityId: ["", Validators.required],
    consigneeName: ["", Validators.required],
    consigneeMobile: ["", Validators.required],
    consigneeAddress: ["", Validators.required],
    consigneeEmail: ["", Validators.required],
    // Consignee Info
    // Shipment Details
    productCode: ["", Validators.required],
    quantity: ["", Validators.required],
    weightprofileId: ["", Validators.required],
    codAmount: ["", Validators.required],
    productDescription: [
      "",
      // Validators.required,
    ],
    specialInstruction: [""],
    createdById: [""],

    // Shipment Details
  });

  editOrderObj: OrderBookingForm;
  onSubmit() {
    console.log(this.editOrder);
    this.editOrderObj = new OrderBookingForm(this.editOrder.value);

    this.editOrderObj.AlteredById = parseInt(localStorage.getItem("USERID"));

    console.log(this.editOrderObj);
    this.modal.close("Close Modal");
    this.userService.OrderBooking(this.editOrderObj).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      console.log(response);
      if (response.Status) {
        this.showToast("success", response.Message, "", "top-right");
        this.userService.filter("New Entry");
        console.log(response.Message);
      } else {
        this.showToast(
          "danger",
          response.Message,
          "Operation failed",
          "top-right"
        );
      }
    });
  }
  closeModal() {
    this.modal.close("close modal");
  }
  // private index:number = 0;
  showToast(status, title?, description?, position?) {
    // this.index += 1;
    // const iconConfig: NbIconConfig = { icon: iconName, pack: 'eva' };
    // position='top-right'

    this.toastrService.show(status || description, title, { position, status });
  }
}
