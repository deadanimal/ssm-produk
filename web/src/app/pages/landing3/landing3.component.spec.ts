import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Landing3Component } from './landing3.component';

describe('Landing3Component', () => {
  let component: Landing3Component;
  let fixture: ComponentFixture<Landing3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Landing3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Landing3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
