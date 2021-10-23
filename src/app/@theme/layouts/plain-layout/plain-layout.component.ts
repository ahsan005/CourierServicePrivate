import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-plain-layout',
  templateUrl: './plain-layout.component.html',
  styleUrls: ['./plain-layout.component.scss']
})
export class PlainLayoutComponent implements OnInit {
  isNavbarCollapsed=true;
  constructor() { }

  ngOnInit(): void {
  }
  innerWidth:any = 800;
  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth;
}

}
