import { LOV } from '../models/citiesLOV';
import { Observable, throwError } from "rxjs";
import { environment } from "./../../environments/environment";
import { map } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

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


  GetAllCities():Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http
      .get<LOV[]>(
        this.base_url + "api/courierService/GetAllCities",

        httpOptions
      )
      // .subscribe((data) => {
      //   var response = JSON.parse(JSON.stringify(data));
      //   if (response.Status) {
      //     console.log(response.Data);
      //   } else {
      //     this.handleError(response.Status, response.Message);
      //   }
      // });
  }

  GetCitiesByProvince(id:number):Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http
      .get<LOV[]>(
        this.base_url + "api/courierService/GetCitiesByProvince?id="+id,

        httpOptions
      )

  }

  GetProvincesByCountry(id:number):Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http
      .get<LOV[]>(
        this.base_url + "api/courierService/GetProvincesByCountry?id="+id,

        httpOptions
      )

  }

  GetAllCountries():Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http
      .get<LOV[]>(
        this.base_url + "api/courierService/GetAllCountries",

        httpOptions
      )

  }
  GetAllStatuses():Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http
      .get<LOV[]>(
        this.base_url + "api/courierService/GetAllOrderStatus",

        httpOptions
      )

  }
  GetAllCourier():Observable<LOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http
      .get<LOV[]>(
        this.base_url + "api/courierService/GetAllCourier",

        httpOptions
      )

  }

}

