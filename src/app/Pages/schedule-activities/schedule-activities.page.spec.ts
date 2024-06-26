import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleActivitiesPage } from './schedule-activities.page';

describe('ScheduleActivitiesPage', () => {
  let component: ScheduleActivitiesPage;
  let fixture: ComponentFixture<ScheduleActivitiesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScheduleActivitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
