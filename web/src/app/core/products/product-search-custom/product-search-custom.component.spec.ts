import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchCustomComponent } from './product-search-custom.component';

describe('ProductSearchCustomComponent', () => {
  let component: ProductSearchCustomComponent;
  let fixture: ComponentFixture<ProductSearchCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
