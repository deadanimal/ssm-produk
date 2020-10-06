import { TestBed } from '@angular/core/testing';

import { SearchCriteriasService } from './search-criterias.service';

describe('SearchCriteriasService', () => {
  let service: SearchCriteriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCriteriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
