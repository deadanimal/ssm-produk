import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInvolvementSearchComponent } from './personal-involvement-search.component';

describe('PersonalInvolvementSearchComponent', () => {
  let component: PersonalInvolvementSearchComponent;
  let fixture: ComponentFixture<PersonalInvolvementSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalInvolvementSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInvolvementSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
