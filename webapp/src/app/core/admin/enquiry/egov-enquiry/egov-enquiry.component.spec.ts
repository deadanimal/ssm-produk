import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgovEnquiryComponent } from './egov-enquiry.component';

describe('EgovEnquiryComponent', () => {
  let component: EgovEnquiryComponent;
  let fixture: ComponentFixture<EgovEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgovEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgovEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
