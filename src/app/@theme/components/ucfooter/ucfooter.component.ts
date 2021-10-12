import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-ucfooter',
  templateUrl: './ucfooter.component.html',
  styleUrls: ['./ucfooter.component.scss']
})
export class UcfooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
    console.log("Click on contact")
  }

}
