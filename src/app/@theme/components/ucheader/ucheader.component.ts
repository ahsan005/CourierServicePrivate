// import { filter } from 'rxjs/operators';
import 'rxjs/add/operator/filter';
import { AuthService } from "./../../../services/auth.service";
import { registerMap } from "echarts";
import { Router, NavigationEnd } from "@angular/router";

import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "ngx-ucheader",
  templateUrl: "./ucheader.component.html",
  styleUrls: ["./ucheader.component.scss"],
})
export class UcheaderComponent implements OnInit {
  currentRoute: string;
  constructor(private router: Router, private authService: AuthService) {


  }

  isNavbarCollapsed = true;
  userName: string;
  isMenuCollapsed: boolean = true;
  // Check Screen Width
  addclass: any;
  innerWidth: any;




  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    console.log(this.innerWidth);
    if (this.innerWidth < 768) {
      this.addclass = true;
      console.log("Breakpoint initiated");
    } else {
      this.addclass = false;
    }
  }
  isLoggedIn: boolean = false;
  checkRole: string;
  // Check Windows Width At page load (IniT)
  ngOnInit() {

    // this.currentRoute = this.router.url
    // console.log(this.currentRoute)

    this.isLoggedIn = this.authService.isLoggedIn();
    console.log("isLoggedIn: " + this.isLoggedIn);
    if (this.isLoggedIn) {
      this.userName = localStorage.getItem("USERNAME");
      this.checkRole = this.authService.getRole();
    }

    console.log(this.isLoggedIn);
    if (window.innerWidth < 768) {
      this.addclass = true;
      console.log("Breakpoint initiated");
    } else {
      this.addclass = false;
    }
  }
  // Check Windows Width At page load

  // Check Screen Width

  scrollToHome() {

    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
    console.log('click')
    if(this.currentRoute == '/home')
    {
      document.getElementById("home").scrollIntoView({ behavior: "smooth" });
      console.log("Click on Home");
    }
    else{
      this.router.navigate(["/home"])
    }

  }
  scrollToAbout() {
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
     console.log('click')
    if(this.currentRoute == '/home')
    {
      document.getElementById("about").scrollIntoView({ behavior: "smooth" });
      console.log("about");
    }
    else{
      this.router.navigate(["/home"]);
    }

  }
  scrollToTracking() {
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
    console.log('click')
    if(this.currentRoute == '/home')
    {
      document.getElementById("tracking").scrollIntoView({ behavior: "smooth" });
      console.log("tracking");
    }
    else{
      this.router.navigate(["/home"]);
    }

  }
  scrollToContact() {
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
    console.log('click')
    if(this.currentRoute == '/home')
    {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      console.log("Click on Home");
    }
    else{
      this.router.navigate(["/home"]);
    }

  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/home"]);
  }


}
