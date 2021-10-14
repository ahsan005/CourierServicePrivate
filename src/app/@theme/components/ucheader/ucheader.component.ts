import { registerMap } from 'echarts';
import { Router, NavigationEnd } from "@angular/router";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalserviceService } from "../../../services/modalservice.service";


@Component({
  selector: "ngx-ucheader",
  templateUrl: "./ucheader.component.html",
  styleUrls: ["./ucheader.component.scss"],
})
export class UcheaderComponent implements OnInit {


  constructor(private router: Router,private modalService:ModalserviceService) {}

  ngOnInit(): void {}


  isMenuCollapsed: boolean = true;




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
