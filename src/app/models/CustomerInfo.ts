
export class CustomerInfo{
  public constructor(init?: Partial<CustomerInfo>) {
    Object.assign(this, init);
}

public UserId:number;
public BusinessName:string;
public PartyLocationName:string;
public AddressDetail:string;
public CityName:string;
public ProvinceName:string;
public CountryName:string;
public PartyLocationId:number;
public UserName:number;
public UserShortName:number;
public LoginName:number;
public LoginDomain:number;
public IsActive:number;
public CreatedOn:Date;


}



// [User].UserId,
// 			[User].RoleId,
// 			Party.BusinessName,
// 			PartyLocation.PartyLocationName,
// 			Address.AddressDetail,
// 			City.CityName,
// 			Province.ProvinceName,
// 			Country.CountryName,
// 			[User].PartyLocationId,
// 			[User].UserName,
// 			[User].UserShortName,
// 			[User].LoginName,
// 			[User].LoginDomain,
// 			[User].LoginPassword,
// 			[User].SecretQuestion,
// 			[User].SecretAnswer,
// 			[User].IsAdmin,
// 			[User].IsActive,
// 			[User].FirstLoginPrompt,
// 			[User].CreatedById,
// 			[User].CreatedOn,
// 			[User].AlteredById,
// 			[User].AlteredOn,
// 			[User].ActionTypeId,
// 			[User].TokenNotification,
// 			[User].FireBaseId
