import { SharedService } from "./../../services/shared.service";
import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { CourierSetting } from "../../models/courier-settings";
import { flatten } from "@angular/compiler";
import { Router } from '@angular/router';

@Component({
  selector: "ngx-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.scss"],
})
export class SettingComponent implements OnInit {
  constructor(public router:Router){}
  ngOnInit(): void {}



}
