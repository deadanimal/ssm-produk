import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
<<<<<<< HEAD:webapp/src/app/core/admin/finance/gaf-generator/gaf-generator.component.spec.ts
=======
>>>>>>> d37a34d91d45e7c42be0e25a8c12b10ef8dae024
import { GafGeneratorComponent } from './gaf-generator.component';

describe('GafGeneratorComponent', () => {
  let component: GafGeneratorComponent;
  let fixture: ComponentFixture<GafGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GafGeneratorComponent ]
<<<<<<< HEAD
=======
import { EgovDetails2Component } from './egov-details2.component';

describe('EgovDetails2Component', () => {
  let component: EgovDetails2Component;
  let fixture: ComponentFixture<EgovDetails2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgovDetails2Component ]
>>>>>>> d37a34d91d45e7c42be0e25a8c12b10ef8dae024:web/src/app/pages/egov-details2/egov-details2.component.spec.ts
=======
>>>>>>> d37a34d91d45e7c42be0e25a8c12b10ef8dae024
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD
<<<<<<< HEAD:webapp/src/app/core/admin/finance/gaf-generator/gaf-generator.component.spec.ts
    fixture = TestBed.createComponent(GafGeneratorComponent);
=======
    fixture = TestBed.createComponent(EgovDetails2Component);
>>>>>>> d37a34d91d45e7c42be0e25a8c12b10ef8dae024:web/src/app/pages/egov-details2/egov-details2.component.spec.ts
=======
    fixture = TestBed.createComponent(GafGeneratorComponent);
>>>>>>> d37a34d91d45e7c42be0e25a8c12b10ef8dae024
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
