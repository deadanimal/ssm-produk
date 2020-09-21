import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestInvestigationDocumentComponent } from './request-investigation-document.component';

describe('RequestInvestigationDocumentComponent', () => {
  let component: RequestInvestigationDocumentComponent;
  let fixture: ComponentFixture<RequestInvestigationDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestInvestigationDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestInvestigationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
