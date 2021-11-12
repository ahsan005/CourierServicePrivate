export class Customer{
  public constructor(init?: Partial<Customer>) {
    Object.assign(this, init);
}

  public CustomerName: string;
  public BusinessName: string;
  public BankName: string;
  public AccountNumber: number;
  public MobileNo: string;
  public Email: string;
  public CityId: number;
  public Cnic : string;
  public Password: string;

}
