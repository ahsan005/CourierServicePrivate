import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ProfileComponent } from "./profile.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    children: [
      {
        path: "change-pass",
        component: ChangePasswordComponent,
      },
      {
        path: "edit-profile",
        component: EditProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
