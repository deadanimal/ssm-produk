import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportSpByRankingComponent } from './product-report-sp-by-ranking.component';

describe('ProductReportSpByRankingComponent', () => {
  let component: ProductReportSpByRankingComponent;
  let fixture: ComponentFixture<ProductReportSpByRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReportSpByRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReportSpByRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
