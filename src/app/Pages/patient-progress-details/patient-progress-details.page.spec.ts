import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientProgressDetailsPage } from './patient-progress-details.page';

describe('PatientProgressDetailsPage', () => {
  let component: PatientProgressDetailsPage;
  let fixture: ComponentFixture<PatientProgressDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PatientProgressDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
