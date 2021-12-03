import { Customer } from "./../models/customer";
import { environment } from "./../../environments/environment";
import { User } from "../models/user";

import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { map, filter, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // base_url = environment.baseUrlDebug;
  // base_url = environment.baseUrlLocal;
  base_url = environment.baseUrl;
  // userpass;
  // base64token;
  roleAs: string;
  constructor(private http: HttpClient, private router: Router) {}

  // Login(loginUser: User) {

  //   //API Header With Authorization
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       // Authorization: "Basic " + this.base64token,
  //       Accept: "application/json",
  //     }),
  //   };

  //   return this.http
  //     .get(this.base_url + "api/CourierService/Login", httpOptions)
  //     .subscribe(
  //       (data) => {
  //         // json data
  //         console.log("Success: ", data);

  //         localStorage.setItem("access_token", data.toString());
  //         alert("Successfully Loggedin (JWT Token Received)");
  //         this.router.navigate(["/user"]);
  //       },
  //       (error) => {
  //         this.handleError(error);
  //       }
  //     );
  // }

  Login(user: User): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": " application/json" }),
    };
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post(
      this.base_url + "api/courierService/login",
      body,
      httpOptions
    );
  }

  // getToken() {
  //   return localStorage.getItem("access_token");
  // }
  // Check if Logged IN
  isLoggedIn() {
    if (
      localStorage.getItem("ISLOGGEDIN") != null &&
      localStorage.getItem("USERID") != null
    )
      return true;
    else {
      return false;
    }
    //   return true;
    // else false;
  }
  // Check if Logged IN
  getRole() {
    this.roleAs = localStorage.getItem("ROLENAME");
    console.log(this.roleAs);
    return this.roleAs.toUpperCase();

  }
  // Logout
  // After clearing localStorage redirect to login screen
  logout() {
    localStorage.clear();
    this.router.navigate(["/auth/login"]);
  }
  // After clearing localStorage redirect to login screen

  // Handle Errors
  // handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }
  // // Handle Errors

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

  // Register Customer
  Register(customer: Customer) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        responseType: "text",
      }),
    };
    const body = JSON.stringify(customer);
    console.log(customer);
    console.log(body);
    return this.http.post<Customer>(
      this.base_url + "api/CourierService/Register",
      body,
      httpOptions
    );
  }
}

// Register Customer
