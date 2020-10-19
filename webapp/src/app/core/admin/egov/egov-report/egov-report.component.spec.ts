import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgovReportComponent } from './egov-report.component';

describe('EgovReportComponent', () => {
  let component: EgovReportComponent;
  let fixture: ComponentFixture<EgovReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgovReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgovReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
