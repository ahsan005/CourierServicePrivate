import * as internal from "stream";

export class OrderBookingForm{
  public constructor(init?: Partial<OrderBookingForm>) {
    Object.assign(this, init);
}
// Shipper Info
public Origin:number;
public ProfileID:number;
public ShipperName:string;
public ShipperPhone:string;
public ShipperEmail:string;
public ShipperAddress:string;
// Shipper Info

// Consignee Info
public ConsigneeDestination:string;
public ConsigneeName:string;
public ConsigneePhone:string;
public ConsigneeAddress:string;
// Consignee Info

// ShipmentInfo
public ProductCode:number;
public Pieces:number;
public Weight:number;
public CODAmount:number;
public ProductDescription:string;
public SpecialInstructions:string;
// ShipmentInfo


}
