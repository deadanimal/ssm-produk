import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingTasksComponent } from './outstanding-tasks.component';

describe('OutstandingTasksComponent', () => {
  let component: OutstandingTasksComponent;
  let fixture: ComponentFixture<OutstandingTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
