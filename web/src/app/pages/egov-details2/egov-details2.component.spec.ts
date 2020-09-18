import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgovDetails2Component } from './egov-details2.component';

describe('EgovDetails2Component', () => {
  let component: EgovDetails2Component;
  let fixture: ComponentFixture<EgovDetails2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgovDetails2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgovDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
