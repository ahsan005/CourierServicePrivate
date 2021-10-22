import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserareaComponent } from './userarea.component';

describe('UserareaComponent', () => {
  let component: UserareaComponent;
  let fixture: ComponentFixture<UserareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
