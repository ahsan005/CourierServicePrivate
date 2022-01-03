import { Address } from "./Address";

export class Location {
  public constructor(init?: Partial<Location>) {
    Object.assign(this, init);
  }

  public LocationId: number;
  public OrginizationId: number;
  public LocationSettingId: number;
  public AddressId: number;
  public Address:Address;
  public AddressDetail:string;
  public CityId:number;
  public CountryId:number;
  public ProvinceId:number;
  public Latitude:number;
  public Longitude:number;
  public Altitude:number;






  public LocationTypeProfileId: number;
  public LocationName: string;
  public LicenseNo: string;
  public SubLocationName: string;
  public LocationShortName: string;
  public Mobile1: string;
  public Mobile2: string;
  public Email: string;
  public PortalURL: string;
  public HeaderDetail: string;
  public FooterDetail: string;
  public IsDefaultLocation: boolean;
  public CreatedById: number;
  public CreatedOn: Date;
  public AlteredById: number;
  public AlteredOn: Date;
  public ActionTypeId: number;
  public UserLogId: number;
}
