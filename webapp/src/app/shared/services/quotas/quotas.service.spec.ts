import { TestBed } from '@angular/core/testing';

import { QuotasService } from './quotas.service';

describe('QuotasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuotasService = TestBed.get(QuotasService);
    expect(service).toBeTruthy();
  });
});
