import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  constructor(private fb: FormBuilder, private modalService: NgbModal) {}

  // NgBootstrapModal methods
  // Angular ReactiveForms FormBuilder
  profileForm = this.fb.group({
    cname: [""],
    buname: [""],
    baname: [""],
    accnum: [""],
    mnumber: [""],
    city: [""],
    address: this.fb.group({
      street: [""],
      city: [""],
      state: [""],
      zip: [""],
    }),
  });
  // Angular ReactiveForms FormBuilder
}
