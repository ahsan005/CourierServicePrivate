import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleProfilesComponent } from './multiple-profiles.component';

describe('MultipleProfilesComponent', () => {
  let component: MultipleProfilesComponent;
  let fixture: ComponentFixture<MultipleProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
