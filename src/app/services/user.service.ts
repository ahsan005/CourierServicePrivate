import { Observable } from "rxjs";

import { OrderBookingForm } from "./../models/order-booking-form";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Filters } from "../models/filters";
import { HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class UserService {
  base_url = environment.baseUrlDebug;
  // base_url = environment.baseUrlLive;
  // base_url = environment.baseUrlLocal;

  constructor(private http: HttpClient) {}
  errorString: string;
  // Handle Error Based on  response.Status
  handleError(
    Status: boolean,
    Message: string,
    error?: HttpErrorResponse
  ): string {
    if (Status == false && Message != "") {
      console.error("An error occurred: ", Message);
      (this.errorString = "An error occurred: "), Message;
      console.log(this.errorString);
    }
    if (Status == false && Message == "")
      return (this.errorString =
        "Something bad happened; please try again later.");
    console.log(this.errorString);
  }
  // Handle Error Based on  response.Status

  // Order Post method
  OrderBooking(orderBooking: OrderBookingForm) {
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
}
