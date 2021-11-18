import { OrderBookingForm } from "./../models/order-booking-form";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  base_url = environment.baseUrlDebug;
  // base_url = environment.baseUrlLive;
  // base_url = environment.baseUrlLocal;

  constructor(private http: HttpClient) {}
  errorString: string;
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
  GetOrderBookings() {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get(
      this.base_url + "api/CourierService/GetOrders",
      httpOptions
    );
  }
}
