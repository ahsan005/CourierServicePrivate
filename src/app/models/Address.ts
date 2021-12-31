export class Address{
  public constructor(init?: Partial<Address>) {
    Object.assign(this, init);
}

public AddressId:number;
public CountryId:number;
public ProvinceId:number;
public CityId:number;
public LocationId:number;
public AddressDetail:number;
public AreaName:number;
public Email:string;
public ZipCode:number;
public Website:string;
public Longitude:number;
public Latitude:number;
public Altitude:number;
public CreatedById:number;
public AlteredById:number;

}
