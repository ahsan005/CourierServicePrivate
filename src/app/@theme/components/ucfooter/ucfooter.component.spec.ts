import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcfooterComponent } from './ucfooter.component';

describe('UcfooterComponent', () => {
  let component: UcfooterComponent;
  let fixture: ComponentFixture<UcfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcfooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UcfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
