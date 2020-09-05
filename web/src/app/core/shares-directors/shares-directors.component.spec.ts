import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharesDirectorsComponent } from './shares-directors.component';

describe('SharesDirectorsComponent', () => {
  let component: SharesDirectorsComponent;
  let fixture: ComponentFixture<SharesDirectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharesDirectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharesDirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
