export class Employee{
  public constructor(init?: Partial<Employee>) {
    Object.assign(this, init);
}
public EmployeeId:number;
public EmployeeName:string;
public PartyLocationId:number;
public Email:string;
public Mobile1:string;
public CNIC:string;
public LicenseNo:string;
public DOB:string;
public EmployeePictureString:string;
public CreatedById:number;
public AlteredById:number;


}
