import { TestBed } from '@angular/core/testing';

import { ModalserviceService } from './modalservice.service';

describe('ModalserviceService', () => {
  let service: ModalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
