import { Customer } from './../models/customer';
import { environment } from './../../environments/environment';
import { User } from "../models/user";

import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  base_url = environment.baseUrlDebug;
  // base_url = environment.baseUrlLocal;
  // base_url = environment.baseUrlLive;
  userpass;
  base64token;
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


  Login(user: User){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': ' application/json' }),
    };
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post(
      this.base_url + 'api/courierService/login',
      body,
      httpOptions
    ).subscribe(
            (data) => {
              // json data


              //  = JSON.stringify(data)
               var response= JSON.parse(JSON.stringify(data))
              //  console.log(response.Status,response.Message)
              console.log("Success: ", data);
              if(response.Status){
                alert("Successfully Loggedin");
                sessionStorage.setItem("isLoggedIn",response.Status)
              }
              else{
              alert('This wont work')
              }



              // this.router.navigate(["/user"]);
            },
            (error) => {
              this.handleError(error);
            }
          );
  }






  getToken(){
    return localStorage.getItem('access_token');
  }
    // Check if Logged IN
    isLoggedIn() {
      return localStorage.getItem('Validate') != null;
    }
    // Check if Logged IN

  // Logout
    // After clearing localStorage redirect to login screen
    logout() {
      localStorage.clear();
      this.router.navigate(['/auth/login']);
    }
    // After clearing localStorage redirect to login screen

    // Handle Errors
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    }
    // Handle Errors

  // Register Customer
    Register(customer: Customer) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          responseType: 'text',
        }),
      };
      const body = JSON.stringify(customer);
      console.log(customer)
      console.log(body);
      return this.http.post<Customer>(this.base_url + 'api/CourierService/Register', body, httpOptions)
    }
  // Register Customer

  }
