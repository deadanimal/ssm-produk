import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { GafGeneratorComponent } from './gaf-generator.component';

describe('GafGeneratorComponent', () => {
  let component: GafGeneratorComponent;
  let fixture: ComponentFixture<GafGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GafGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GafGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
