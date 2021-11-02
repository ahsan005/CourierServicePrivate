import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRunSheetComponent } from './delivery-run-sheet.component';

describe('DeliveryRunSheetComponent', () => {
  let component: DeliveryRunSheetComponent;
  let fixture: ComponentFixture<DeliveryRunSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryRunSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryRunSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
