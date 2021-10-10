

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
  isMenuCollapse:boolean;
  showFlag:boolean;
sandwichMenu(){
this.showFlag = true;

}
}
