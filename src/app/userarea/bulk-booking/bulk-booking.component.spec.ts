import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkBookingComponent } from './bulk-booking.component';

describe('BulkBookingComponent', () => {
  let component: BulkBookingComponent;
  let fixture: ComponentFixture<BulkBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
