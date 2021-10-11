
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-userclient',
  templateUrl: './userclient.component.html',
  styleUrls: ['./userclient.component.scss']
})
export class UserclientComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }
  innerWidth:any = 800;
  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth;
}


}
