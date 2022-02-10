export class VoucherDetail {
  public constructor(init?: Partial<VoucherDetail>) {
    Object.assign(this, init);
  }
  public AccountPrefix:string;
  public VoucherDetalId: number;
  public VoucherId: number;
  public VoucherDetailLineId: number;
  public AccountId: number;
  public AccountMappingControlId: number;
  public ServiceId: number;
  public ProductId: number;
  public PatientId: number;
  public PartyId: number;
  public PartyLocationId: number;
  public EmployeeId: number;
  public ProjectId: number;
  public EntryMode: number;
  public NetAmount: number;
  public TaxPercent: number;
  public TaxAmount: number;
  public TaxId: number;
  public DiscountAmount: number;
  public DebitAmount: number;
  public CreditAmount: number;
  public VoucherMode: string;
  public IsAutoRow: number;
  public LineDescription: string;
  public CreatedById: number;
  public CreatedOn: Date;
  public AlteredById: Date;
  public AlteredOn: Date;
  public ActionTypeId: Date;
  public UserLogId: Date;
}
