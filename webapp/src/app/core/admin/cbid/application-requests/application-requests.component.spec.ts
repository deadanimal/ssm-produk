import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRequestsComponent } from './application-requests.component';

describe('ApplicationRequestsComponent', () => {
  let component: ApplicationRequestsComponent;
  let fixture: ComponentFixture<ApplicationRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
