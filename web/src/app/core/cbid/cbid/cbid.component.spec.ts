import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbidComponent } from './cbid.component';

describe('CbidComponent', () => {
  let component: CbidComponent;
  let fixture: ComponentFixture<CbidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
