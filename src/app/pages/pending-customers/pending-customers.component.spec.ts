import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCustomersComponent } from './pending-customers.component';

describe('PendingCustomersComponent', () => {
  let component: PendingCustomersComponent;
  let fixture: ComponentFixture<PendingCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
