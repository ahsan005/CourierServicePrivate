import { UserService } from '../../../services/user.service';
import { SharedService } from './../../../services/shared.service';
import { TableUtil } from './../../../utilities/tableutil';
import { Component, OnInit } from '@angular/core';
import { OrderBookingForm } from '../../../models/order-booking-form';

@Component({
  selector: 'ngx-booked-orders',
  templateUrl: './booked-orders.component.html',
  styleUrls: ['./booked-orders.component.scss']
})
export class BookedOrdersComponent implements OnInit {
p:number=1;
Orders:Array<OrderBookingForm>;
  constructor(private sharedService:SharedService,
    private userService:UserService) {
      this.initialize()
     }
  onSubmit(){

  }
  exportTable(){
    TableUtil.exportToExcel('ExampleTable')
  }
  generatePDF(){
    TableUtil.generatePDF('ExampleTable')
  }
  ngOnInit(): void {
  }
  initialize() {
    this.sharedService.GetAllCities().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);

      // this.CitiesLOV = response.Data;
    });

    this.userService.GetOrders().subscribe((result) => {
      console.warn("result", result);
      var response = JSON.parse(JSON.stringify(result));

      this.Orders = response.Data;
      this.Orders.sort((a, b) => {
        return (
          <any>new Date(b.OrderBookingOn) - <any>new Date(a.OrderBookingOn)
        );
      });
    });
  }

  // Sorting
  key='id';
  reverse:boolean;
  sort(key){
    this.key = key
    this.reverse=!this.reverse
  }
  // Sorting


}
