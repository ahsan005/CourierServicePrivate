import { Injectable } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: "root",
})
export class ModalserviceService {
  closeResult = "";

  // NgBootstrapModal methods
  constructor(private modalServices: NgbModal) {}

  open(content) {
    this.modalServices
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "lg" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

}
