import { NbToastrService,NbIconConfig  } from '@nebular/theme';
import { LOV } from "../../../../models/citiesLOV";
import { SharedService } from "./../../../../services/shared.service";
import { UserService } from "./../../../../services/user.service";
import { OrderBookingForm } from "./../../../../models/order-booking-form";
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-edit-request",
  templateUrl: "./edit-request.component.html",
  styleUrls: ["./edit-request.component.scss"],
})
export class EditRequestComponent implements OnInit {
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private toastrService: NbToastrService
  ) {}

  public orderBookingModel: OrderBookingForm;
  public citiesLOV: Array<any> = [];

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
  ngOnInit(): void {
    console.log(this.citiesLOV);
    console.log(this.orderBookingModel);

    this.setForm();
  }

  editOrder: any;
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
  get specialInstructions() {
    return this.editOrder.get("specialInstructions");
  }
  get consigneeAddress() {
    return this.editOrder.get("consigneeAddress");
  }
  get consigneeEmail() {
    return this.editOrder.get("consigneeEmail");
  }
  setForm() {
    //    this.sharedService.GetAllCities().subscribe((data) => {

    //     //  = JSON.stringify(data)
    //     var response = JSON.parse(JSON.stringify(data));
    //      console.log(response)
    //      this.citiesLOV = response.Data

    // //     console.log("Status", response);
    //     if (response.Status) {
    //       console.log(response.title);
    //     } else {
    //       console.warn(response.title);
    //     }
    //   });
    console.log(this.citiesLOV);
    this.editOrder = this.fb.group({
      // ShipperInfo
      OrderBookingId: [this.orderBookingModel.OrderBookingId],
      OrderBookingOn: [
        this.orderBookingModel.OrderBookingOn,
        Validators.required,
      ],
      originCityId: [this.orderBookingModel.OriginCityId, Validators.required],
      selectProfile: [""],
      shipperName: [this.orderBookingModel.ShipperName, Validators.required],
      shipperMobile: [
        this.orderBookingModel.ShipperMobile,
        Validators.required,
      ],
      shipperEmail: [this.orderBookingModel.ShipperEmail, Validators.required],
      shipperAddress: [
        this.orderBookingModel.ShipperAddress,
        Validators.required,
      ],
      // ShipperInfo

      // Consignee Info
      destinationCityId: [
        this.orderBookingModel.DestinationCityId,
        Validators.required,
      ],
      consigneeName: [
        this.orderBookingModel.ConsigneeName,
        Validators.required,
      ],
      consigneeMobile: [
        this.orderBookingModel.ConsigneeMobile,
        Validators.required,
      ],
      consigneeAddress: [
        this.orderBookingModel.ConsigneeAddress,
        Validators.required,
      ],
      consigneeEmail: [
        this.orderBookingModel.ConsigneeEmail,
        Validators.required,
      ],
      // Consignee Info
      // Shipment Details
      productCode: [this.orderBookingModel.ProductCode, Validators.required],
      quantity: [this.orderBookingModel.Quantity, Validators.required],
      weightprofileId: [
        this.orderBookingModel.WeightProfileId,
        Validators.required,
      ],
      codAmount: [this.orderBookingModel.CODAmount, Validators.required],
      productDescription: [
        this.orderBookingModel.ProductDescription,
        // Validators.required,
      ],
      specialInstructions: [this.orderBookingModel.SpecialInstructions],

      // Shipment Details
    });
  }
  editOrderObj: OrderBookingForm;
  onSubmit() {
    console.log(this.editOrder);
    this.editOrderObj = new OrderBookingForm(this.editOrder.value);



    this.editOrderObj.AlteredById = parseInt(localStorage.getItem("USERID"));

    console.log(this.editOrderObj);
    this.modal.close('Close Modal')
    this.userService.OrderBooking(this.editOrderObj).subscribe((data) => {

      var response = JSON.parse(JSON.stringify(data));
      console.log(response)
      if (response.Status) {
        this.showToast('success',response.Message,'','top-right');
        console.log(response.Message)
      } else {
        this.showToast('danger',response.Message,'Operation failed','top-right');
      }
    });
  }
  // private index:number = 0;
  showToast( status, title?,description?,position?) {
    // this.index += 1;
    // const iconConfig: NbIconConfig = { icon: iconName, pack: 'eva' };
    // position='top-right'

    this.toastrService.show(
      status || description,
      title,
      { position, status});
  }
}
