import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCustomDataPackageBComponent } from './product-custom-data-package-b.component';

describe('ProductCustomDataPackageBComponent', () => {
  let component: ProductCustomDataPackageBComponent;
  let fixture: ComponentFixture<ProductCustomDataPackageBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCustomDataPackageBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCustomDataPackageBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
