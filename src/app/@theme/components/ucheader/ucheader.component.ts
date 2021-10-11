

import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ngx-ucheader',
  templateUrl: './ucheader.component.html',
  styleUrls: ['./ucheader.component.scss']
})
export class UcheaderComponent implements OnInit {

  constructor(private router:Router) { }

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

}
