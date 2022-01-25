import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPaidForComponent } from './orders-paid-for.component';

describe('OrdersPaidForComponent', () => {
  let component: OrdersPaidForComponent;
  let fixture: ComponentFixture<OrdersPaidForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersPaidForComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPaidForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
