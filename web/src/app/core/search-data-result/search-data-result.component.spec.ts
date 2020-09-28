import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDataResultComponent } from './search-data-result.component';

describe('SearchDataResultComponent', () => {
  let component: SearchDataResultComponent;
  let fixture: ComponentFixture<SearchDataResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDataResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDataResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
