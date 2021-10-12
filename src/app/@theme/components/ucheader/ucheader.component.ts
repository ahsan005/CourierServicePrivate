

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
    window.scrollTo(0,0);
    console.log("Click on Home")
  }

  public onClick(elementId: string): void {

    this.vps.scrollToAnchor(elementId);
    console.log("Hello");

}




}
