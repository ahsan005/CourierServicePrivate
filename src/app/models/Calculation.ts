export class Calculation{
  public constructor(init?: Partial<Calculation>) {
    Object.assign(this, init);
}

public TotalCODAmount:number;
public TotalDeliveryFee:number;
public TotalPayable:number;

}
