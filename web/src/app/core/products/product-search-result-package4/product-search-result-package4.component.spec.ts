import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchResultPackage4Component } from './product-search-result-package4.component';

describe('ProductSearchResultPackage4Component', () => {
  let component: ProductSearchResultPackage4Component;
  let fixture: ComponentFixture<ProductSearchResultPackage4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchResultPackage4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchResultPackage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
