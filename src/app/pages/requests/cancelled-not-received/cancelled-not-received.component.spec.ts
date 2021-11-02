import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledNotReceivedComponent } from './cancelled-not-received.component';

describe('CancelledNotReceivedComponent', () => {
  let component: CancelledNotReceivedComponent;
  let fixture: ComponentFixture<CancelledNotReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledNotReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledNotReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
