import * as internal from "stream";

export class OrderTracking {
  public constructor(init?: Partial<OrderTracking>) {
    Object.assign(this, init);
  }
public OrderBookingTrackingId:number;
public OrderBookingId:number;
public Remarks:string;
public CreatedById:number;
public CreatedOn:Date;
public AlteredById:number;
public AlteredOn:Date;
public ActionTypeId:number;
public UserLogId:number;
public StatusProfileId:number;
public StatusName:string;
}
