import * as internal from "stream";

export class OrderBookingForm {
  public constructor(init?: Partial<OrderBookingForm>) {
    Object.assign(this, init);
  }
  // Shipper Info
  public OrderBookingId: number;
  public OrderBookingOn: Date;
  public LocationId: number;
  public OriginCityId: number;
  public OriginCityName: string;
  public PartyLocationId: number;
  public UserLogId: number;
  public ShipperName: string;
  public ShipperMobile: string;
  public ShipperEmail: string;
  public ShipperAddress: string;
  // Shipper Info

  public EmployeeId: number;
  // Consignee Info
  public OrderBookingNo: number;
  public DestinationCityId: number;
  public DestinationCityName: string;
  public CityName: string;
  public ConsigneeName: string;
  public ConsigneeMobile: string;
  public ConsigneeAddress: string;
  public ConsigneeEmail: string;
  public DeliveryFee: number;
  
  // Consignee Info

  // ShipmentInfo
  public ProductCode: number;
  public ReceivedStatus: string;
  public StatusProfileId: number;
  public StatusName: string;
  public Quantity: number;
  public WeightProfileId: number;
  public CODAmount: number;
  public ProductDescription: string;
  public SpecialInstruction: string;
  public CourierEmployeeId: number;
  // ShipmentInfo

  // Party Info
  public PartyId: number;
  public PartyName: string;
  public PartyLocationName: string;
  public BusinessName: string;
  // Party Info

  // DB InforMatics
  public ActionTypeId: number;
  public AlteredById: number;
  public AlteredOn: Date;
  public CreatedById: number;
  public CreatedOn: Date;
  // DB InforMatics

  public isSelected: boolean;
}
