export class AccountSubType {
  public constructor(init?: Partial<AccountSubType>) {
    Object.assign(this, init);
  }

  public AccountSubTypeId: number;
  public OrginizationId: number;
  public AccountTypeProfileId: number;
  public AccountSubtypeName: string;
  public AccountSubCode: string;
}
