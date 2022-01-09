import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfinancialaccountComponent } from './addfinancialaccount.component';

describe('AddfinancialaccountComponent', () => {
  let component: AddfinancialaccountComponent;
  let fixture: ComponentFixture<AddfinancialaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfinancialaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfinancialaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
