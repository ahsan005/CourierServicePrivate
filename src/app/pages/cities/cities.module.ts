import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NbCardModule, NbButtonModule, NbInputModule, NbButtonGroupModule, NbIconLibraries, NbIconModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { CitiesComponent } from './cities.component';
import { CityListComponent } from './city-list/city-list.component';
import { AddCityComponent } from './add-city/add-city.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { CountriesComponent } from './countries/countries.component';
import { ProvincesComponent } from './provinces/provinces.component';
import { AddProvinceComponent } from './provinces/add-province/add-province.component';
import { AddCountryComponent } from './countries/add-country/add-country.component';




@NgModule({
  declarations: [
    CitiesComponent,
    CityListComponent,
    AddCityComponent,
    CountriesComponent,
    ProvincesComponent,
    AddProvinceComponent,
    AddCountryComponent,



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
    NbIconModule,
    NbSpinnerModule
  ]
})
export class CitiesModule { }
