import { LOV } from "../models/citiesLOV";
import { Observable, Subject, throwError } from "rxjs";
import { environment } from "./../../environments/environment";
import { map } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { City } from "../models/city";
import { DeliveryCharges } from "../models/deliverycharges";
import { CourierSetting } from "../models/courier-settings";
import { Province } from "../models/province";
import { Country } from "../models/country";
import { CustomerInfo } from "../models/CustomerInfo";
import { Customer } from "../models/customer";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  // base_url = environment.baseUrlDebug;
  base_url = environment.baseUrl;
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

  GetAllCurrencies(): Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<LOV[]>(
      this.base_url + "api/courierService/GetAllCurrencies",

      httpOptions
    );
    // .subscribe((data) => {
    //   var response = JSON.parse(JSON.stringify(data));
    //   if (response.Status) {
    //     console.log(response.Data);
    //   } else {
    //     this.handleError(response.Status, response.Message);
    //   }
    // });
  }
  GetAllCities(): Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<LOV[]>(
      this.base_url + "api/courierService/GetAllCities",

      httpOptions
    );
    // .subscribe((data) => {
    //   var response = JSON.parse(JSON.stringify(data));
    //   if (response.Status) {
    //     console.log(response.Data);
    //   } else {
    //     this.handleError(response.Status, response.Message);
    //   }
    // });
  }
  GetAllLocationType(): Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<LOV[]>(
      this.base_url + "api/courierService/GetAllLocationType",

      httpOptions
    );
    // .subscribe((data) => {
    //   var response = JSON.parse(JSON.stringify(data));
    //   if (response.Status) {
    //     console.log(response.Data);
    //   } else {
    //     this.handleError(response.Status, response.Message);
    //   }
    // });
  }

  GetCitiesByProvince(id: number): Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<LOV[]>(
      this.base_url + "api/CourierService/GetCitiesByProvince?id=" + id,

      httpOptions
    );
  }

  GetProvincesByCountry(id: number): Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<LOV[]>(
      this.base_url + "api/courierService/GetProvincesByCountry?id=" + id,

      httpOptions
    );
  }
  AddNewCountry(obj: Country): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(obj);
    console.log(body);
    return this.http.post(
      this.base_url + "api/CourierService/AddCountry",
      body,
      httpOptions
    );
  }
  DeleteCountry(id: number): Observable<Object> {
    var AlteredById = localStorage.getItem("USERID");
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get(
      this.base_url +
        "api/CourierService/DeleteCountry?id=" +
        id +
        "&AlteredById=" +
        AlteredById,
      httpOptions
    );
  }
  AddNewProvince(obj: Province): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(obj);
    console.log(body);
    return this.http.post(
      this.base_url + "api/CourierService/AddProvince",
      body,
      httpOptions
    );
  }
  DeleteProvince(id: number): Observable<Object> {
    var AlteredById = localStorage.getItem("USERID");
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get(
      this.base_url +
        "api/CourierService/DeleteProvince?id=" +
        id +
        "&AlteredById=" +
        AlteredById,
      httpOptions
    );
  }
  AddNewCity(obj: City): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(obj);
    console.log(body);
    return this.http.post(
      this.base_url + "api/CourierService/AddCity",
      body,
      httpOptions
    );
  }
  DeleteCity(id: number): Observable<Object> {
    var AlteredById = localStorage.getItem("USERID");
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get(
      this.base_url +
        "api/CourierService/DeleteCity?id=" +
        id +
        "&AlteredById=" +
        AlteredById,
      httpOptions
    );
  }

  AddDeliveryCharges(obj: DeliveryCharges): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(obj);
    console.log(body);
    return this.http.post(
      this.base_url + "api/CourierService/AddDeliveryCharges",
      body,
      httpOptions
    );
  }
  GetStandardDeliveryCharges(): Observable<DeliveryCharges> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get<DeliveryCharges>(
      this.base_url + "api/CourierService/GetStandardDeliveryCharges",

      httpOptions
    );
  }

  GetUserInfo(id): Observable<Customer> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get<Customer>(
      this.base_url + "api/CourierService/GetUserInfo?id=" + id,

      httpOptions
    );
  }
  EditUserInfo(obj: Customer): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(obj);
    console.log(body);
    return this.http.post(
      this.base_url + "api/courierService/EditUserInfo",
      body,
      httpOptions
    );
  }

  GetAllDeliveryCharges(): Observable<DeliveryCharges> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get<DeliveryCharges>(
      this.base_url + "api/CourierService/GetAllDeliveryCharges",

      httpOptions
    );
  }
  GetDeliveryChargesByPartyLocation(id: number): Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<LOV[]>(
      this.base_url +
        "api/courierService/GetDeliveryChargesByPartyLocationId?id=" +
        id,

      httpOptions
    );
  }
  DeleteDeliveryCharges(id: number): Observable<Object> {
    var AlteredById = localStorage.getItem("USERID");
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get(
      this.base_url +
        "api/CourierService/DeleteDeliveryCharges?id=" +
        id +
        "&AlteredById=" +
        AlteredById,
      httpOptions
    );
  }

  GetAllCountries(): Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<LOV[]>(
      this.base_url + "api/courierService/GetAllCountries",

      httpOptions
    );
  }
  GetAllStatuses(): Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<LOV[]>(
      this.base_url + "api/courierService/GetAllOrderStatus",

      httpOptions
    );
  }
  GetAllCourierLOV(): Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<LOV[]>(
      this.base_url + "api/courierService/GetAllCourierLOV",

      httpOptions
    );
  }

  GetCourierSettings(): Observable<CourierSetting[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http.get<CourierSetting[]>(
      this.base_url + "api/courierService/GetAllCourierSettings",

      httpOptions
    );
  }
  AddCourierSettings(obj: CourierSetting): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(obj);
    console.log(body);
    return this.http.post(
      this.base_url + "api/courierService/AddCourierSettings",
      body,
      httpOptions
    );
  }
  DeleteCourierSettings(id: number): Observable<Object> {
    var AlteredById = localStorage.getItem("USERID");
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };

    return this.http.get(
      this.base_url +
        "api/CourierService/DeleteCourierSettings?id=" +
        id +
        "&AlteredById=" +
        AlteredById,
      httpOptions
    );
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any> {
    return this._listeners.asObservable();
  }
  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
}
