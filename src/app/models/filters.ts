export class Filters{
  public constructor(init?: Partial<Filters>) {
    Object.assign(this, init);
}

public selectDestination:number;
public selectStatus:string;
public fromDate:Date;
public toDate:Date;

}
