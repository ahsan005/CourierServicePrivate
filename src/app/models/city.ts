export class City{
  public constructor(init?: Partial<City>) {
    Object.assign(this, init);
}


public CityCode:string;
public CityId:number;
public CityName:string;
public CityShortName:string;
public IsActive:boolean;
public ProvinceId:number;
public ActionTypeId:number;
public CreatedById:number;
public CreatedOn:Date;
public AlteredById:number;
public AlteredOn:Date;
public UserLogId:number;

}


