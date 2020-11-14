import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:webapp/src/app/core/admin/egov/egov-dropdown/egov-dropdown.component.spec.ts
import { EgovDropdownComponent } from './egov-dropdown.component';

describe('EgovDropdownComponent', () => {
  let component: EgovDropdownComponent;
  let fixture: ComponentFixture<EgovDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgovDropdownComponent ]
=======
import { EgovDetails2Component } from './egov-details2.component';

describe('EgovDetails2Component', () => {
  let component: EgovDetails2Component;
  let fixture: ComponentFixture<EgovDetails2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgovDetails2Component ]
>>>>>>> d37a34d91d45e7c42be0e25a8c12b10ef8dae024:web/src/app/pages/egov-details2/egov-details2.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD:webapp/src/app/core/admin/egov/egov-dropdown/egov-dropdown.component.spec.ts
    fixture = TestBed.createComponent(EgovDropdownComponent);
=======
    fixture = TestBed.createComponent(EgovDetails2Component);
>>>>>>> d37a34d91d45e7c42be0e25a8c12b10ef8dae024:web/src/app/pages/egov-details2/egov-details2.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
