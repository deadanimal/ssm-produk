import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchPiComponent } from './product-search-pi.component';

describe('ProductSearchPiComponent', () => {
  let component: ProductSearchPiComponent;
  let fixture: ComponentFixture<ProductSearchPiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchPiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
