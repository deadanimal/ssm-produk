import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchSdComponent } from './product-search-sd.component';

describe('ProductSearchSdComponent', () => {
  let component: ProductSearchSdComponent;
  let fixture: ComponentFixture<ProductSearchSdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchSdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchSdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
