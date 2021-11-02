import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentBookedOrdersComponent } from './recent-booked-orders.component';

describe('RecentBookedOrdersComponent', () => {
  let component: RecentBookedOrdersComponent;
  let fixture: ComponentFixture<RecentBookedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentBookedOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentBookedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
