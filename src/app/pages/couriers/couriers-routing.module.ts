import { CouriersComponent } from './couriers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
  path: "",
  component: CouriersComponent,
  children: [
    {
      path: "list",
      component: ListComponent,
    },

  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouriersRoutingModule { }
