import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgovHomeComponent } from './egov-home.component';

describe('EgovHomeComponent', () => {
  let component: EgovHomeComponent;
  let fixture: ComponentFixture<EgovHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgovHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgovHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
