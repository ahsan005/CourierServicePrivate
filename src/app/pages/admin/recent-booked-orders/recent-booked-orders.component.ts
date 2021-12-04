import { UserService } from '../../../services/user.service';
import { SharedService } from './../../../services/shared.service';
import { OrderBookingForm } from './../../../models/order-booking-form';
import { FormBuilder } from '@angular/forms';
import { TableUtil } from './../../../utilities/tableutil';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'ngx-recent-booked-orders',
  templateUrl: './recent-booked-orders.component.html',
  styleUrls: ['./recent-booked-orders.component.scss']
})
export class RecentBookedOrdersComponent implements OnInit {
  Orders = new Array<OrderBookingForm>();
  constructor(private sharedService:SharedService,
    private userService:UserService) {
      this.initialize();
    }

  ngOnInit(): void {
  }
  exportTable(){
    TableUtil.exportToExcel('ExampleTable')
  }
  generatePDF(){
    TableUtil.generatePDF('ExampleTable')
  }
  searchVal:any;

  SearchFunction(){
    TableUtil.SearchFunction(this.searchVal)
  }

  p: number = 1;


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
}
