import { registerMap } from 'echarts';
import { Router, NavigationEnd } from "@angular/router";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalserviceService } from "../../../services/modalservice.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "ngx-ucheader",
  templateUrl: "./ucheader.component.html",
  styleUrls: ["./ucheader.component.scss"],
})
export class UcheaderComponent implements OnInit {
  @ViewChild("register") register: ElementRef;
  closeResult='';
  constructor(private router: Router,private modalService:ModalserviceService,private fb:FormBuilder) {}

  ngOnInit(): void {}
  OpenRegisterModal(){
    this.modalService.open(this.register);
  }
  navHome() {
    this.router.navigate(["/uc"]);
    console.log("click");
  }
  isMenuCollapsed: boolean = true;
  login() {
    this.router.navigate(["/login"]);
    console.log("click");
  }
  dropdown(){
    event.stopPropagation()
  }



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

  // Register Modal Form Stuff

  profileForm = this.fb.group({
    cname: [""],
    buname: [""],
    baname: [""],
    accnum: [""],
    mnumber: [""],
    city: [""],
    address: this.fb.group({
      street: [""],
      city: [""],
      state: [""],
      zip: [""],
    }),
  });
}
