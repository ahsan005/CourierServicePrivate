import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent  {
  constructor(private fb: FormBuilder,private modalService: NgbModal) {}
  // NgBootstrapModal methods
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  closeResult = '';

  // NgBootstrapModal methods
  // Angular ReactiveForms FormBuilder
  profileForm = this.fb.group({
    cname: [''],
    buname: [''],
    baname: [''],
    accnum: [''],
    mnumber:[''],
    city:[''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });
  // Angular ReactiveForms FormBuilder

}
