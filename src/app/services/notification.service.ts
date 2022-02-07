import { NbToastrService } from "@nebular/theme";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private toastrService: NbToastrService) {}

  showToast(status, title?, description?, position?) {
    // this.index += 1;
    // const iconConfig: NbIconConfig = { icon: iconName, pack: 'eva' };
    // position='top-right'
    var pos = "top-right";
    position = pos;
    this.toastrService.show(description, title, { position, status });
  }
}
