import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-profile',
  template:`<router-outlet></router-outlet>`,

})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
