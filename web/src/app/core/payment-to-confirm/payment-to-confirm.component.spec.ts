import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentToConfirmComponent } from './payment-to-confirm.component';

describe('PaymentToConfirmComponent', () => {
  let component: PaymentToConfirmComponent;
  let fixture: ComponentFixture<PaymentToConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentToConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentToConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
