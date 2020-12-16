import { TestBed } from '@angular/core/testing';

import { CookiezService } from './cookie.service';

describe('CookiezService', () => {
  let service: CookiezService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiezService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
