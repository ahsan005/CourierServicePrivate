import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReceivingComponent } from './order-receiving.component';

describe('OrderReceivingComponent', () => {
  let component: OrderReceivingComponent;
  let fixture: ComponentFixture<OrderReceivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReceivingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
