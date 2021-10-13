
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent  {

  constructor( ) { }




  firstFunction() {
    alert( 'Hello ' + '\nWelcome to C# Corner \nFunction in First Component');
  }

}
