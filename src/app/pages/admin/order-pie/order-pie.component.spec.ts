import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPieComponent } from './order-pie.component';

describe('OrderPieComponent', () => {
  let component: OrderPieComponent;
  let fixture: ComponentFixture<OrderPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
