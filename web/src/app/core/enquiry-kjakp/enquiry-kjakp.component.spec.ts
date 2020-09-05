import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryKjakpComponent } from './enquiry-kjakp.component';

describe('EnquiryKjakpComponent', () => {
  let component: EnquiryKjakpComponent;
  let fixture: ComponentFixture<EnquiryKjakpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryKjakpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryKjakpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
