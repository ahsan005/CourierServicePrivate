import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcheaderComponent } from './ucheader.component';

describe('UcheaderComponent', () => {
  let component: UcheaderComponent;
  let fixture: ComponentFixture<UcheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UcheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
