import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedOrdersComponent } from './booked-orders.component';

describe('BookedOrdersComponent', () => {
  let component: BookedOrdersComponent;
  let fixture: ComponentFixture<BookedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
