export class Filters{
  public constructor(init?: Partial<Filters>) {
    Object.assign(this, init);
}

public selectDestination:number;
public selectOrigin:number;
public selectStatus:string;
public assignedCourier:string;
public fromDate:Date;
public toDate:Date;

}
