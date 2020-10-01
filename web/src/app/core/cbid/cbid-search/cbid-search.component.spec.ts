import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbidSearchComponent } from './cbid-search.component';

describe('CbidSearchComponent', () => {
  let component: CbidSearchComponent;
  let fixture: ComponentFixture<CbidSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbidSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbidSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
