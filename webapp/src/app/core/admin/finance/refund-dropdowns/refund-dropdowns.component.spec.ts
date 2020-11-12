import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundDropdownsComponent } from './refund-dropdowns.component';

describe('RefundDropdownsComponent', () => {
  let component: RefundDropdownsComponent;
  let fixture: ComponentFixture<RefundDropdownsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundDropdownsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundDropdownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
