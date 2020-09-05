import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResupplyComponent } from './resupply.component';

describe('ResupplyComponent', () => {
  let component: ResupplyComponent;
  let fixture: ComponentFixture<ResupplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResupplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
