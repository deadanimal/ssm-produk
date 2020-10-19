import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgovDropdownComponent } from './egov-dropdown.component';

describe('EgovDropdownComponent', () => {
  let component: EgovDropdownComponent;
  let fixture: ComponentFixture<EgovDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgovDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgovDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
