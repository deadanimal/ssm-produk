import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgovDetailsComponent } from './egov-details.component';

describe('EgovDetailsComponent', () => {
  let component: EgovDetailsComponent;
  let fixture: ComponentFixture<EgovDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgovDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgovDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
