import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInvolvementEgovComponent } from './personal-involvement-egov.component';

describe('PersonalInvolvementEgovComponent', () => {
  let component: PersonalInvolvementEgovComponent;
  let fixture: ComponentFixture<PersonalInvolvementEgovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalInvolvementEgovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInvolvementEgovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
