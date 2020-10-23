import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchEgovPiComponent } from './product-search-egov-pi.component';

describe('ProductSearchEgovPiComponent', () => {
  let component: ProductSearchEgovPiComponent;
  let fixture: ComponentFixture<ProductSearchEgovPiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchEgovPiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchEgovPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
