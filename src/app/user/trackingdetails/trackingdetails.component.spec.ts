import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingdetailsComponent } from './trackingdetails.component';

describe('TrackingdetailsComponent', () => {
  let component: TrackingdetailsComponent;
  let fixture: ComponentFixture<TrackingdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
