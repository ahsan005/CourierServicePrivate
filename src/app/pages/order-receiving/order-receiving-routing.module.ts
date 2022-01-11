import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { OrderReceivingComponent } from "./order-receiving.component";

const routes: Routes = [
  {
    path: "",
    component: OrderReceivingComponent,
    children: [
      {
        path: "list",
        component: ListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class OrderReceivingRoutingModule {}
