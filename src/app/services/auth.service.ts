import { User } from "../models/user";

import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  base_url = "https://localhost:44369/api";
  userpass;
  base64token;
  constructor(private http: HttpClient, private router: Router) {}

  Login(loginUser: User) {
    this.userpass = loginUser.UserName + ":" + loginUser.Password;
    this.base64token = window.btoa(this.userpass);

    //API Header With Authorization
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Basic " + this.base64token,
        Accept: "application/json",
      }),
    };

    return this.http
      .get(this.base_url + "/Authentication", httpOptions)
      .subscribe(
        (data) => {
          // json data
          console.log("Success: ", data);

          localStorage.setItem("access_token", data.toString());
          alert("Successfully Loggedin (JWT Token Received)");
          this.router.navigate(["/user"]);
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
      return localStorage.getItem('access_token') != null;
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

  // Add new User
    AddUser(user: User) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          responseType: 'text',
        }),
      };
      const body = JSON.stringify(user);
      console.log(body);
      return this.http.post<User>(this.base_url + '/User', body, httpOptions);
    }
}
