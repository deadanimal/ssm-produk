import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryGeneralComponent } from './enquiry-general.component';

describe('EnquiryGeneralComponent', () => {
  let component: EnquiryGeneralComponent;
  let fixture: ComponentFixture<EnquiryGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
