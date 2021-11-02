import { ListCityComponent } from './list-city/list-city.component';
import { CitiesComponent } from './cities.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: CitiesComponent,
    children: [
      {
        path: "list",
        component: ListCityComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
