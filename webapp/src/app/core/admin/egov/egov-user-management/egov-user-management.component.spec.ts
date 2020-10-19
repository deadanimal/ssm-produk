import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgovUserManagementComponent } from './egov-user-management.component';

describe('EgovUserManagementComponent', () => {
  let component: EgovUserManagementComponent;
  let fixture: ComponentFixture<EgovUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgovUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgovUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
