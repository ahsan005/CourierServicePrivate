import { CountriesComponent } from './countries/countries.component';
import { AddCityComponent } from './add-city/add-city.component';
import { CityListComponent } from './city-list/city-list.component';
import { CitiesComponent } from './cities.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvincesComponent } from './provinces/provinces.component';

const routes: Routes = [
  {
    path: "",
    component: CitiesComponent,
    children:[
      {
        path:'city-list',
        component:CityListComponent
      },
      {
        path:'country-list',
        component:CountriesComponent
      },
      {
        path:'province-list',
        component:ProvincesComponent
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
