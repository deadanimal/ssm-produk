import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocManagementComponent } from './foc-management.component';

describe('FocManagementComponent', () => {
  let component: FocManagementComponent;
  let fixture: ComponentFixture<FocManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
