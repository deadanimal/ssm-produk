import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KjakpComponent } from './kjakp.component';

describe('KjakpComponent', () => {
  let component: KjakpComponent;
  let fixture: ComponentFixture<KjakpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KjakpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KjakpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
