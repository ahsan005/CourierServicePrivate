import { CitiesComponent } from "./cities/cities.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";

import { MENU_ITEMS } from "./pages-menu";
import { EventEmitterServiceService } from "../services/event-emitter-service.service";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private eventEmitterServiceService: EventEmitterServiceService
  ) {}
  ngOnInit(): void {

  }

  onSubmit() {}

  AddBtn() {
    const ref = this.modalService.open(CitiesComponent, { size: "tiny" });
  }
  menu = MENU_ITEMS;
}
