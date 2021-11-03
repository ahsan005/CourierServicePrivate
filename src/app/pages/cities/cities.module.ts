import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { CitiesComponent } from './cities.component';

import { ListCityComponent } from './list-city/list-city.component';
import { AddCityComponent } from './add-city/add-city.component';


@NgModule({
  declarations: [
    CitiesComponent,

    ListCityComponent,
    AddCityComponent
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule
  ]
})
export class CitiesModule { }
