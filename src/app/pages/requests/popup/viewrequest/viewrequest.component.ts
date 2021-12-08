import { OrderBookingForm } from './../../../../models/order-booking-form';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-viewrequest',
  templateUrl: './viewrequest.component.html',
  styleUrls: ['./viewrequest.component.scss']
})
export class ViewrequestComponent implements OnInit {
  public orderBookingModel: OrderBookingForm;
  public citiesLOV: Array<any> = [];
  constructor(public modal: NgbActiveModal,) { }

  ngOnInit(): void {
  }

}
