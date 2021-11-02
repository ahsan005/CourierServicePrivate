import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsReceivedLahoreComponent } from './items-received-lahore.component';

describe('ItemsReceivedLahoreComponent', () => {
  let component: ItemsReceivedLahoreComponent;
  let fixture: ComponentFixture<ItemsReceivedLahoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsReceivedLahoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsReceivedLahoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
