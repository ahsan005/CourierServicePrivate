import { Filters } from './../../../models/filters';
import { CitiesLOV } from './../../../models/citiesLOV';
import { FormBuilder } from '@angular/forms';
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
 public citiesLOV:CitiesLOV;
p:number=1;
searchVal;
requestFilters:Filters;
Orders:Array<OrderBookingForm>;
  constructor(private sharedService:SharedService,
    private userService:UserService,
    private fb:FormBuilder) {
      this.initialize()
     }
  onSubmit(){
    console.log(this.citiesLOV)
    console.log(this.bookedOrderFilters.value)
    this.requestFilters = new Filters(this.bookedOrderFilters.value)
    console.log(this.requestFilters);
  }
  exportTable(){
    TableUtil.exportToExcel('ExampleTable')
  }
  generatePDF(){
    TableUtil.generatePDF('ExampleTable')
  }
  SearchFunction(){
    TableUtil.SearchFunction(this.searchVal);
  }
  ngOnInit(): void {
  }
  bookedOrderFilters;
  initialize() {
    this.bookedOrderFilters = this.fb.group({
      originCityId: [""],

      fromDate: [""],
      toDate: [""],
    });
    this.sharedService.GetAllCities().subscribe((result) => {
      var response = JSON.parse(JSON.stringify(result));
      console.log(response);

      this.citiesLOV = response.Data;
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
