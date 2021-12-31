export class Organization{
  public constructor(init?: Partial<Organization>) {
    Object.assign(this, init);
}

public OrginizationId:number;
public OrginizationSettingId:number;
public CurrencyId:number;
public OrginizationName:string;
public OrginizationTitle:string;
public NTN:string;
public STN:string;
public LogoImageURL:string;
public WaterMark:string;
public Certificate1:number;
public Certificate2:number;
public CreatedById:number;
public CreatedOn:Date;
public AlteredById:number;
public AlteredOn:number;
public ActionTypeId:number;
public UserLogId:number;


}
