import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryDetailsComponent } from './enquiry-details.component';

describe('EnquiryDetailsComponent', () => {
  let component: EnquiryDetailsComponent;
  let fixture: ComponentFixture<EnquiryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
