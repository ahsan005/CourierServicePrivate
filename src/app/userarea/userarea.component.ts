import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './upages-menu';

@Component({
  selector: 'ngx-userarea',
  templateUrl: './userarea.component.html',
  styleUrls: ['./userarea.component.scss']
})
export class UserareaComponent implements OnInit {
  menu=MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
