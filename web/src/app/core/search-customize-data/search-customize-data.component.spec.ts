import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCustomizeDataComponent } from './search-customize-data.component';

describe('SearchCustomizeDataComponent', () => {
  let component: SearchCustomizeDataComponent;
  let fixture: ComponentFixture<SearchCustomizeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCustomizeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCustomizeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
