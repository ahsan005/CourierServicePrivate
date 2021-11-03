import { FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { MustMatch } from "../../../_helpers/MustMatch-validator";


@Component({
  selector: "ngx-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  changePassword = this.fb.group(
    {
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    },
    {
      validator: MustMatch("newPassword", "confirmPassword"),
    }
  );
}
