import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportHasilUppSummaryComponent } from './product-report-hasil-upp-summary.component';

describe('ProductReportHasilUppSummaryComponent', () => {
  let component: ProductReportHasilUppSummaryComponent;
  let fixture: ComponentFixture<ProductReportHasilUppSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReportHasilUppSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReportHasilUppSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
