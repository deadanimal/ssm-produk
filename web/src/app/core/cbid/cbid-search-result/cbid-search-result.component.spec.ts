import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbidSearchResultComponent } from './cbid-search-result.component';

describe('CbidSearchResultComponent', () => {
  let component: CbidSearchResultComponent;
  let fixture: ComponentFixture<CbidSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbidSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbidSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
