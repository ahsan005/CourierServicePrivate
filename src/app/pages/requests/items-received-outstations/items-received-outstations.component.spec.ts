import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsReceivedOutstationsComponent } from './items-received-outstations.component';

describe('ItemsReceivedOutstationsComponent', () => {
  let component: ItemsReceivedOutstationsComponent;
  let fixture: ComponentFixture<ItemsReceivedOutstationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsReceivedOutstationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsReceivedOutstationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
