export class Voucher {
  public constructor(init?: Partial<Voucher>) {
    Object.assign(this, init);
  }

  public VoucherId: number;
  public DocMovementId: number;
  public LocationId: number;
  public FiscalYearId: number;
  public BranchId;
  public ShiftId: number;
  public ShiftRecordsId: number;
  public ControlTypeProfileId: number;
  public VoucherTypeProfileId: number;
  public PayModeProfileId: number;
  public VoucherNo: number;
  public VoucherOn: Date;
  public VoucherTo: Date;
  public Narration: string;
  public IsPosted: boolean;
  public IsCancel: boolean;
  public CancelRemarks: string;
  public NetAmount: number;
  public TaxPercent: number;
  public TaxAmount: number;
  public DiscountAmount: number;
  public OtherAmount: number;
  public TotalDebit: number;
  public TotalCredit: number;
  public PostedById: number;
  public PostedOn: Date;
  public CreatedById: number;
  public CreatedOn: Date;
  public AlteredById: number;
  public AlteredOn: Date;
  public ActionTypeId: number;
  public UserLogId: number;
}
