import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent implements OnInit {


  constructor() { }



  ngOnInit(): void {
  }
  @Input() status:string;
  @Input() title: string;
  @Input() type: string;
  @Input() on = true;

}
