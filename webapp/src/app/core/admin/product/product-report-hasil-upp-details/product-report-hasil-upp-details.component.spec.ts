import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportHasilUppDetailsComponent } from './product-report-hasil-upp-details.component';

describe('ProductReportHasilUppDetailsComponent', () => {
  let component: ProductReportHasilUppDetailsComponent;
  let fixture: ComponentFixture<ProductReportHasilUppDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReportHasilUppDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReportHasilUppDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
