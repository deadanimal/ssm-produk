import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedDataComponent } from './customized-data.component';

describe('CustomizedDataComponent', () => {
  let component: CustomizedDataComponent;
  let fixture: ComponentFixture<CustomizedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizedDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
