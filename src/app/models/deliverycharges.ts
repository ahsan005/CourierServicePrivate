export class DeliveryCharges{
  public constructor(init?: Partial<DeliveryCharges>) {
    Object.assign(this, init);
}

public ActionTypeId:number;
public PartyLocationId:number;
public AlteredById:number;
public CreatedById:number;
public AlteredOn:number;
public CreatedOn:number;
public DeliveryChargesId:number;
public FirstKGPrice:number;
public FromCityId:number;
public FromCityName:string;
public ToCityId:number;
public ToCityName:number;
public PricePerKG:number;
public UserLogId:number;

}
