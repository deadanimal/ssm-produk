import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEgovComponent } from './profile-egov.component';

describe('ProfileEgovComponent', () => {
  let component: ProfileEgovComponent;
  let fixture: ComponentFixture<ProfileEgovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEgovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEgovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
