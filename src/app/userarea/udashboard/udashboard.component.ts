import { takeWhile } from "rxjs/operators";
import { NbThemeService } from "@nebular/theme";
import { Component, OnInit } from "@angular/core";

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  status?: string;
}
@Component({
  selector: "ngx-udashboard",
  templateUrl: "./udashboard.component.html",
  styleUrls: ["./udashboard.component.scss"],
})
export class UdashboardComponent implements OnInit {
  private alive = true;
  constructor(private themeService: NbThemeService) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
  }

  ngOnInit(): void {}
  totalOrders: CardSettings = {
    title: "Total Orders",
    iconClass: "nb-lightbulb",
    type: "primary",
    status: "info",
  };
  newBookedOrders: CardSettings = {
    title: "New Booked Orders",
    iconClass: "nb-roller-shades",
    type: "success",
    status: "primary",
  };
  sentToPaceCourier: CardSettings = {
    title: "Sent To Pace Courier",
    iconClass: "nb-roller-shades",
    type: "success",
    status: "secondary",
  };
  dispatchedForOutStation: CardSettings = {
    title: "Dispatched for Outstation",
    iconClass: "nb-roller-shades",
    type: "success",
    status: "warning",
  };
  assignedToCourier: CardSettings = {
    title: "Assigned to Courier",
    iconClass: "nb-roller-shades",
    type: "success",
    status: "success",
  };
  pendingOrders: CardSettings = {
    title: "Pending Orders",
    iconClass: "nb-roller-shades",
    type: "success",
    status: "info",
  };
  deliveredOrders: CardSettings = {
    title: "Delivered Orders",
    iconClass: "nb-roller-shades",
    type: "success",
    status: "primary",
  };
  totalreturnedOrders: CardSettings = {
    title: "Total Returned Orders",
    iconClass: "nb-roller-shades",
    type: "success",
    status: "secondary",
  };
  totalCancelledOrders: CardSettings = {
    title: "Total Cancelled Orders",
    iconClass: "nb-roller-shades",
    type: "success",
    status: "danger",
  };
  balanceRs: CardSettings = {
    title: "Balance (Rs.)",
    iconClass: "nb-roller-shades",
    type: "success",
    status: "info",
  };
  trackOrders: CardSettings = {
    title: "Track Orders",
    iconClass: "nb-roller-shades",
    type: "success",
    status: "primary",
  };
  viewOrders: CardSettings = {
    title: "View Orders",
    iconClass: "nb-roller-shades",
    type: "success",
    status: "secondary",
  };
  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.totalOrders,
    this.newBookedOrders,
    this.sentToPaceCourier,
    this.dispatchedForOutStation,
    this.assignedToCourier,
    this.pendingOrders,
    this.deliveredOrders,
    this.totalreturnedOrders,
    this.totalCancelledOrders,
    this.balanceRs,
    this.trackOrders,
    this.viewOrders,
  ];

  // Cards Theme Setup
  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.totalOrders,
        type: "warning",
      },
      {
        ...this.newBookedOrders,
        type: "primary",
      },
      // {
      //   ...this.wirelessAudioCard,
      //   type: 'danger',
      // },
      // {
      //   ...this.coffeeMakerCard,
      //   type: 'info',
      // },
    ],
    dark: this.commonStatusCardsSet,
  };

  // Cards Theme Setup
}
