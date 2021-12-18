import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NbCardModule, NbButtonModule, NbInputModule, NbButtonGroupModule, NbIconLibraries, NbIconModule, NbSelectModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { CitiesComponent } from './cities.component';
import { CityListComponent } from './city-list/city-list.component';
import { AddCityComponent } from './add-city/add-city.component';
import { Ng2OrderModule } from 'ng2-order-pipe';




@NgModule({
  declarations: [
    CitiesComponent,
    CityListComponent,
    AddCityComponent,



  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    Ng2OrderModule,
    NgxPaginationModule,
    FormsModule,
    NbButtonGroupModule,
    NbSelectModule,
    NbIconModule
  ]
})
export class CitiesModule { }
