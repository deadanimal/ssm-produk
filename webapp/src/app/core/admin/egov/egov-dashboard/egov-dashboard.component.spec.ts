import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgovDashboardComponent } from './egov-dashboard.component';

describe('EgovDashboardComponent', () => {
  let component: EgovDashboardComponent;
  let fixture: ComponentFixture<EgovDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgovDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgovDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
