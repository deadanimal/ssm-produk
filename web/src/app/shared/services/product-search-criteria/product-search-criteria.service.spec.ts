import { TestBed } from '@angular/core/testing';

import { ProductSearchCriteriaService } from './product-search-criteria.service';

describe('ProductSearchCriteriaService', () => {
  let service: ProductSearchCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSearchCriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
