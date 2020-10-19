import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgovTaskManagementComponent } from './egov-task-management.component';

describe('EgovTaskManagementComponent', () => {
  let component: EgovTaskManagementComponent;
  let fixture: ComponentFixture<EgovTaskManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgovTaskManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgovTaskManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
