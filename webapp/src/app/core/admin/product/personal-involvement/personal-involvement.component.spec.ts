import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInvolvementComponent } from './personal-involvement.component';

describe('PersonalInvolvementComponent', () => {
  let component: PersonalInvolvementComponent;
  let fixture: ComponentFixture<PersonalInvolvementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalInvolvementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInvolvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
