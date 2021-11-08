import { AddCityComponent } from './add-city/add-city.component';
import { CityListComponent } from './city-list/city-list.component';
import { CitiesComponent } from './cities.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: CitiesComponent,
    children:[
      {
        path:'list',
        component:CityListComponent
      },
      {
        path:'add',
        component:AddCityComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
