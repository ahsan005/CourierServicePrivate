import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderAssignmentComponent } from './rider-assignment.component';

describe('RiderAssignmentComponent', () => {
  let component: RiderAssignmentComponent;
  let fixture: ComponentFixture<RiderAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiderAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
