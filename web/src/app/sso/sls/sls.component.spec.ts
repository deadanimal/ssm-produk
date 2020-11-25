import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlsComponent } from './sls.component';

describe('SlsComponent', () => {
  let component: SlsComponent;
  let fixture: ComponentFixture<SlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
