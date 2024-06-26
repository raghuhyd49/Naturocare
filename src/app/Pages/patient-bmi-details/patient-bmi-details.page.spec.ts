import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientBmiDetailsPage } from './patient-bmi-details.page';

describe('PatientBmiDetailsPage', () => {
  let component: PatientBmiDetailsPage;
  let fixture: ComponentFixture<PatientBmiDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PatientBmiDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
