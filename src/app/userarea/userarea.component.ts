import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './upages-menu';

@Component({
  selector: 'ngx-userarea',
  templateUrl: './userarea.component.html',
  styleUrls: ['./userarea.component.scss']
})
export class UserareaComponent implements OnInit {
  menu=MENU_ITEMS;
  constructor(private router:Router) { }

  ngOnInit(): void {
    // this.functionOnWhichRedirectShouldHappen()
  }
  functionOnWhichRedirectShouldHappen(){
    this.router.navigate(['user/dashboard']);
  }
}
