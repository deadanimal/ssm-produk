import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationEnquiryComponent } from './configuration-enquiry.component';

describe('ConfigurationEnquiryComponent', () => {
  let component: ConfigurationEnquiryComponent;
  let fixture: ComponentFixture<ConfigurationEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
