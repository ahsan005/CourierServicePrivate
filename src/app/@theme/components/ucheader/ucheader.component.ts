

import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';



@Component({
  selector: 'ngx-ucheader',
  templateUrl: './ucheader.component.html',
  styleUrls: ['./ucheader.component.scss']
})
export class UcheaderComponent implements OnInit {

  constructor(private router:Router,private vps: ViewportScroller) { }

  ngOnInit(): void {
  }
  navHome(){
    this.router.navigate(['/uc'])
    console.log('click')
  }
  isMenuCollapsed:boolean = true;
  login(){
    this.router.navigate(['/login'])
    console.log("click")
  }

  register(){
    this.router.navigate(['/register'])
  }

  scrollToHome(){
    document.getElementById("home").scrollIntoView({behavior:"smooth"})
    console.log("Click on Home")
  }
  scrollToAbout(){
    document.getElementById("about").scrollIntoView({behavior:"smooth"})
    console.log("about")
  }
  scrollToTracking(){
    document.getElementById("tracking").scrollIntoView({behavior:"smooth"})
    console.log("tracking")
  }
  scrollToContact(){
    document.getElementById("contact").scrollIntoView({behavior:"smooth"})
    console.log("Click on Home")
  }






}
