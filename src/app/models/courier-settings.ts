export class CourierSetting{
  public constructor(init?: Partial<CourierSetting>) {
    Object.assign(this, init);
}

public CourierSettingId:number;
public GSTPercentage:number;
public ActionTypeId:number;
public AlteredById:number;
public CreatedById:number;
public AlteredOn:Date;
public CreatedOn:Date;


}
