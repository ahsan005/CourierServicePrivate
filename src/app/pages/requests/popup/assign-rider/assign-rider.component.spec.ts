import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRiderComponent } from './assign-rider.component';

describe('AssignRiderComponent', () => {
  let component: AssignRiderComponent;
  let fixture: ComponentFixture<AssignRiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
