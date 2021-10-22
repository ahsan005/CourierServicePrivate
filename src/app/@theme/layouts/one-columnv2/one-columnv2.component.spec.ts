import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneColumnv2Component } from './one-columnv2.component';

describe('OneColumnv2Component', () => {
  let component: OneColumnv2Component;
  let fixture: ComponentFixture<OneColumnv2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneColumnv2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneColumnv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
