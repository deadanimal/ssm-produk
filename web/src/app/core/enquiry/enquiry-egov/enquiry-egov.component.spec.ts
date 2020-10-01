import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryEgovComponent } from './enquiry-egov.component';

describe('EnquiryEgovComponent', () => {
  let component: EnquiryEgovComponent;
  let fixture: ComponentFixture<EnquiryEgovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryEgovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryEgovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
