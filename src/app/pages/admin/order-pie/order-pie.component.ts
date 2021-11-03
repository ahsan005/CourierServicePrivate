import { NbThemeService } from '@nebular/theme';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-order-pie',
  templateUrl: './order-pie.component.html',
  styleUrls: ['./order-pie.component.scss']
})
export class OrderPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'horizontal',
          left: 'left',
          data: ['Booked-orders', 'Pending-Orders', 'Received-for-Lahore', 'Received-for-outstations', 'Cancelled-orders','Dispatched-orders','Assigned-Orders','Delivered','Returned','Total-Orders','Total-Customers','Total-Drivers'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Orders',
            type: 'pie',
            radius: '70%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: 'Booked-orders' },
              { value: 310, name: 'Pending-Orders' },
              { value: 234, name: 'Received-for-Lahore' },
              { value: 135, name: 'Received-for-outstations' },
              { value: 150, name: 'Dispatched-orders' },
              { value: 200, name: 'Assigned-Orders' },
              { value: 225, name: 'Delivered' },
              { value: 300, name: 'Total-Orders' },
              { value: 325, name: 'Total-Customers' },
              { value: 450, name: 'Total-Drivers' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
