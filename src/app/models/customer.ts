export class Customer{
  public constructor(init?: Partial<Customer>) {
    Object.assign(this, init);
}
  public CustomerName: string;
  public BusinessName: string;
  public BankName: string;
  public AccountNumber: number;
  public MobileNumber: number;
  public Email: string;
  public City: string;
  public Cnic : string;
  public Password: string;
}
