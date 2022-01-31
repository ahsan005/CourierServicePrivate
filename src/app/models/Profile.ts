export class Profile{
  public constructor(init?: Partial<Profile>) {
    Object.assign(this, init);
}

public ProfileId:string;
public OrginizationId:string;
public ProfileTypeId:string;
public ProfileName:string;
public ProfilePrefix:string;
public ProfileCode:string;
public ProfileUrduName:string;
public ProfileSeqNo:number;
public IsActive:boolean;
public CreatedById:number;
public CreatedOn:Date;
public AlteredById:number;
public AlteredOn:Date;
public ActionTypeId:number;
public UserLogId:number;


}
