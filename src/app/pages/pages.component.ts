import { CitiesComponent } from './cities/cities.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  constructor(private modalService:NgbModal) { }

  onSubmit(){

  }

  AddBtn(){
    const ref = this.modalService.open(CitiesComponent,{size:'tiny'});

  }
  menu = MENU_ITEMS;
}
