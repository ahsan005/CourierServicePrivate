import { FinanacialAccount } from "./../models/FinancialAccount";
import { OrderTracking } from "./../models/ordertracking";
import { Observable, Subject, throwError } from "rxjs";

import { OrderBookingForm } from "./../models/order-booking-form";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Filters } from "../models/filters";
import { HttpParams } from "@angular/common/http";
import { Employee } from "../models/employee";
import { Organization } from "../models/organization";
import { Location } from "../models/location";
import { CustomerInfo } from "../models/CustomerInfo";
import { LOV } from "../models/citiesLOV";
@Injectable({
  providedIn: "root",
})
export class UserService {
  // base_url = environment.baseUrlDebug;
  base_url = environment.baseUrl;
  // base_url = environment.baseUrlLocal;

  constructor(private http: HttpClient) {}

  errorString: string;

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error);
    } else if (error.status === 500) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError("Something bad happened; please try again later.");
  }
  // Handle Error Based on  response.Status
  // handleError(
  //   Status: boolean,
  //   Message: string,
  //   error?: HttpErrorResponse
  // ): string {
  //   if (Status == false && Message != "") {
  //     console.error("An error occurred: ", Message);
  //     (this.errorString = "An error occurred: "), Message;
  //     console.log(this.errorString);
  //   }
  //   if (Status == false && Message == "")
  //     return (this.errorString =
  //       "Something bad happened; please try again later.");
  //   console.log(this.errorString);
  // }
  // Handle Error Based on  response.Status

  // Order Post method
  OrderBooking(orderBooking: OrderBookingForm): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(orderBooking);
    console.log(body);
    return this.http.post(
      this.base_url + "api/courierService/OrderBooking",
      body,
      httpOptions
    );
  }
  // Order Post method

  // Get All Orders
  GetOrders(): Observable<OrderBookingForm[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<OrderBookingForm[]>(
      this.base_url + "api/CourierService/GetOrders",
      httpOptions
    );
  }
  // Get All Orders

  // Get Orders By User
  GetOrdersByUser(): Observable<OrderBookingForm[]> {
    var LoggedInUserId = localStorage.getItem("USERID");
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<OrderBookingForm[]>(
      this.base_url +
        "api/CourierService/GetOrdersByUserID?id=" +
        LoggedInUserId,
      httpOptions
    );
  }
  // Get Orders By UserId

  GetOrdersFiltered(filters: Filters): Observable<OrderBookingForm[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(filters);

    console.log(body);
    return this.http.post<OrderBookingForm[]>(
      this.base_url + "api/CourierService/GetOrders",
      body,
      httpOptions
    );
  }
  // Order Requests Filter Method

  // Get ORder by ID
  GetOrderByID(id: number): Observable<OrderBookingForm> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get<OrderBookingForm>(
      this.base_url + "api/CourierService/GetOrdersByID" + "?id=" + id,
      httpOptions
    );
  }
  // Get ORder by ID

  // Get All Users
  GetAllUsers(): Observable<CustomerInfo> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get<CustomerInfo>(
      this.base_url + "api/CourierService/GetAllUsers",
      httpOptions
    );
  }
  // Get All Users

  ActivateCustomer(item): Observable<Object> {
    let id = item.PartyId;
    var AlteredById = localStorage.getItem("USERID");
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return this.http.get(
      this.base_url +
        "api/CourierService/ActivateCustomer?id=" +
        id +
        "&AlteredById=" +
        AlteredById,
      httpOptions
    );
  }
  // Get ORderTracking by ID

  DeleteCustomer(item): Observable<Object> {
    let id = item.PartyId;
    var AlteredById = localStorage.getItem("USERID");
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get(
      this.base_url +
        "api/CourierService/DeleteCourierCustomer?id=" +
        id +
        "&AlteredById=" +
        AlteredById,
      httpOptions
    );
  }
  GetOrderTrackingByID(id: number): Observable<OrderTracking> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get<OrderTracking>(
      this.base_url + "api/CourierService/GetOrderTrackingByID" + "?id=" + id,
      httpOptions
    );
  }
  // Get ORderTracking by ID

  // Bulk ORders Post Method
  BulkOrders(array: Array<OrderBookingForm>) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(array);
    console.log(body);
    return this.http.post(
      this.base_url + "api/courierService/BOrderBooking",
      body,
      httpOptions
    );
  }
  // Bulk ORders Post Method

  DeleteBookedOrder(item): Observable<Object> {
    let id = item;
    var AlteredById = localStorage.getItem("USERID");
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get(
      this.base_url +
        "api/CourierService/DeleteOrderBooking?id=" +
        id +
        "&AlteredById=" +
        AlteredById,
      httpOptions
    );
  }

  // Courier Emloyee
  AddCourierEmployee(obj: Employee): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(obj);
    console.log(body);
    return this.http.post(
      this.base_url + "api/courierService/AddCourier",
      body,
      httpOptions
    );
  }
  GetCourierEmployees(): Observable<Employee[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<Employee[]>(
      this.base_url + "api/CourierService/GetAllCouriers",
      httpOptions
    );
  }
  DeleteCourierEmployee(item): Observable<Object> {
    let id = item;
    var AlteredById = localStorage.getItem("USERID");
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get(
      this.base_url +
        "api/CourierService/DeleteCourierEmployee?id=" +
        id +
        "&AlteredById=" +
        AlteredById,
      httpOptions
    );
  }
  // Courier Emloyee

  // Update ORder Status
  UpdateOrderStatus(orderBookingId: number, statusProfileId: number) {
    let OrderBookingId = orderBookingId;
    let StatusProfileId = statusProfileId;
    var AlteredById = localStorage.getItem("USERID");
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get(
      this.base_url +
        "api/CourierService/UpdatOrderStatus?Orderid=" +
        OrderBookingId +
        "&StatusId=" +
        StatusProfileId +
        "&AlteredById=" +
        AlteredById,
      httpOptions
    );
  }
  // Update ORder Status

  // BulkUpdate Order Status
  BulkUpdateOrderStatus(array): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(array);
    console.log(body);
    return this.http.post(
      this.base_url + "api/courierService/BulkUpdateOrderStatus",
      body,
      httpOptions
    );
  }
  // BulkUpdate Order Status

  // Add Organization
  AddOrganization(obj: Organization): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(obj);
    console.log(body);
    return this.http.post(
      this.base_url + "api/courierService/SaveOrganizationInfo",
      body,
      httpOptions
    );
  }
  // Add Organization

  // Add Financial Account
  AddFinancialAccount(obj: FinanacialAccount): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(obj);
    console.log(body);
    return this.http.post(
      this.base_url + "api/courierService/AddFinancialAccount",
      body,
      httpOptions
    );
  }
  // Add Financial Account

  // Get Financial Account
  GetFinancialAccount(): Observable<FinanacialAccount[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    var OrginizationId = parseInt(localStorage.getItem("ORGANIZATIONID"));
    // const body = JSON.stringify(obj);
    // console.log(body);
    return this.http.get<FinanacialAccount[]>(
      this.base_url +
        "api/courierService/GetFinancialAccountsByOrganization?organizationid=" +
        OrginizationId,
      // body,
      httpOptions
    );
  }
  // Get Financial Account

  GetAccountSubTypeLOV(): Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<LOV[]>(
      this.base_url + "api/courierService/GetAllAccountSubType",

      httpOptions
    );
  }
  GetSubControlAccountLOV(): Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<LOV[]>(
      this.base_url + "api/courierService/GetAllSubControlAccount",

      httpOptions
    );
  }

  GetOrganization() {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<Organization[]>(
      this.base_url + "api/CourierService/GetOrganization",
      httpOptions
    );
  }

  GetLocation() {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<Location[]>(
      this.base_url + "api/CourierService/GetLocation",
      httpOptions
    );
  }
  // AddOrganizationLocation
  AddOrganizationLocation(obj: Location): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(obj);
    console.log(body);
    return this.http.post(
      this.base_url + "api/courierService/SaveOrganizationLocationInfo",
      body,
      httpOptions
    );
  }
  // AddOrganizationLocation

  // Service Event Listeners
  private _listeners = new Subject<any>();
  listen(): Observable<any> {
    return this._listeners.asObservable();
  }
  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
  // Service Event Listeners
}
