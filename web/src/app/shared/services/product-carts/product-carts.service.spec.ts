import { TestBed } from '@angular/core/testing';

import { ProductCartsService } from './product-carts.service';

describe('ProductCartsService', () => {
  let service: ProductCartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
