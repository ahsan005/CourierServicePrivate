import { registerMap } from 'echarts';
import { Router, NavigationEnd } from "@angular/router";
import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { ModalserviceService } from "../../../services/modalservice.service";


@Component({
  selector: "ngx-ucheader",
  templateUrl: "./ucheader.component.html",
  styleUrls: ["./ucheader.component.scss"],
})
export class UcheaderComponent implements OnInit {


  constructor(private router: Router,private modalService:ModalserviceService) {}



  isNavbarCollapsed=true;

  isMenuCollapsed: boolean = true;
// Check Screen Width
addclass:any
innerWidth:any;
@HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = event.target.innerWidth;
  console.log(this.innerWidth)
  if (this.innerWidth < 768) {
    this.addclass =true
    console.log("Breakpoint initiated")
    } else {
     this.addclass=false
    }
}

// Check Windows Width At page load (IniT)
ngOnInit(){
  if (window.innerWidth < 768) {
    this.addclass =true
    console.log("Breakpoint initiated")
    } else {
     this.addclass=false
    }
}
// Check Windows Width At page load

// Check Screen Width


  scrollToHome() {
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
    console.log("Click on Home");
  }
  scrollToAbout() {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    console.log("about");
  }
  scrollToTracking() {
    document.getElementById("tracking").scrollIntoView({ behavior: "smooth" });
    console.log("tracking");
  }
  scrollToContact() {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    console.log("Click on Home");
  }


}
