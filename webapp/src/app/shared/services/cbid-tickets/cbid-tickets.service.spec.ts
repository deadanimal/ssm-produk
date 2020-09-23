import { TestBed } from '@angular/core/testing';

import { CbidTicketsService } from './cbid-tickets.service';

describe('CbidTicketsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CbidTicketsService = TestBed.get(CbidTicketsService);
    expect(service).toBeTruthy();
  });
});
