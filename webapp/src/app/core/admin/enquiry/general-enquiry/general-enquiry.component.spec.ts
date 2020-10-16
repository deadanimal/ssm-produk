import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEnquiryComponent } from './general-enquiry.component';

describe('GeneralEnquiryComponent', () => {
  let component: GeneralEnquiryComponent;
  let fixture: ComponentFixture<GeneralEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
