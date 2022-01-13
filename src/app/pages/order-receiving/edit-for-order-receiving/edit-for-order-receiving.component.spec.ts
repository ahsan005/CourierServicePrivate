import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditForOrderReceivingComponent } from './edit-for-order-receiving.component';

describe('EditForOrderReceivingComponent', () => {
  let component: EditForOrderReceivingComponent;
  let fixture: ComponentFixture<EditForOrderReceivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditForOrderReceivingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditForOrderReceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
