import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDeliveriesComponent } from './track-deliveries.component';

describe('TrackDeliveriesComponent', () => {
  let component: TrackDeliveriesComponent;
  let fixture: ComponentFixture<TrackDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackDeliveriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
