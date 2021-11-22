import { CitiesLOV } from './../models/citiesLOV';
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


  GetAllCities():Observable<CitiesLOV[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    return this.http
      .get<CitiesLOV[]>(
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
}
