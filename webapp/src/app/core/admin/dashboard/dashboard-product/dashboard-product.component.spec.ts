import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductComponent } from './dashboard-product.component';

describe('DashboardProductComponent', () => {
  let component: DashboardProductComponent;
  let fixture: ComponentFixture<DashboardProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
