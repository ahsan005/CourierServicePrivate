export class Country{
  public constructor(init?: Partial<Country>) {
    Object.assign(this, init);
}


public CountryId:number;
public CountryName:string;
public CountryCode:string;
public CountryShortName:string;
public ActionTypeId:number;
public CreatedById:number;
public CreatedOn:Date;
public AlteredById:number;
public AlteredOn:Date;
public UserLogId:number;

}


