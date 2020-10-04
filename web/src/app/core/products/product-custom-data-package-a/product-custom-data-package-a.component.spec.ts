import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCustomDataPackageAComponent } from './product-custom-data-package-a.component';

describe('ProductCustomDataPackageAComponent', () => {
  let component: ProductCustomDataPackageAComponent;
  let fixture: ComponentFixture<ProductCustomDataPackageAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCustomDataPackageAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCustomDataPackageAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
