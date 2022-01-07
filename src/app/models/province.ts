export class Province {
  public constructor(init?: Partial<Province>) {
    Object.assign(this, init);
  }

  public ProvinceId: number;
  public CountryId: number;
  public ProvinceName: string;
  public ActionTypeId: number;
  public CreatedById: number;
  public CreatedOn: Date;
  public AlteredById: number;
  public AlteredOn: Date;
  public UserLogId: number;
}
