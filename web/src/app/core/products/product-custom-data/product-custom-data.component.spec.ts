import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCustomDataComponent } from './product-custom-data.component';

describe('ProductCustomDataComponent', () => {
  let component: ProductCustomDataComponent;
  let fixture: ComponentFixture<ProductCustomDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCustomDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCustomDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
