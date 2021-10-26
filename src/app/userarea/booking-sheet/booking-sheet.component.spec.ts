import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSheetComponent } from './booking-sheet.component';

describe('BookingSheetComponent', () => {
  let component: BookingSheetComponent;
  let fixture: ComponentFixture<BookingSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
