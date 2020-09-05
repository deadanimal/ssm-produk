import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvolvementManagementComponent } from './involvement-management.component';

describe('InvolvementManagementComponent', () => {
  let component: InvolvementManagementComponent;
  let fixture: ComponentFixture<InvolvementManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvolvementManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvolvementManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
