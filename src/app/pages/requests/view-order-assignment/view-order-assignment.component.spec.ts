import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderAssignmentComponent } from './view-order-assignment.component';

describe('ViewOrderAssignmentComponent', () => {
  let component: ViewOrderAssignmentComponent;
  let fixture: ComponentFixture<ViewOrderAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrderAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
