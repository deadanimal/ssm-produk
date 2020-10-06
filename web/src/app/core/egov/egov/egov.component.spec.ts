import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgovComponent } from './egov.component';

describe('EgovComponent', () => {
  let component: EgovComponent;
  let fixture: ComponentFixture<EgovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
