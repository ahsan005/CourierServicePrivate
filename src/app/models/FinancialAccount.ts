export class FinanacialAccount {
  public constructor(init?: Partial<FinanacialAccount>) {
    Object.assign(this, init);
  }

  public AccountCode: string;
  public AccountId: number;
  public AccountName: string;
  public AccountPrefix: string;
  public AccountSubType: string;
  public AccountSubTypeId: number;
  public ActionTypeId: number;
  public AlteredById: number;
  public AlteredOn: Date;
  public CreatedById: number;
  public CreatedOn: Date;
  public OrginizationId: number;
  public SubControlAccount: string;
  public SubControlAccountId: number;
  public UserLogId: number;
}
