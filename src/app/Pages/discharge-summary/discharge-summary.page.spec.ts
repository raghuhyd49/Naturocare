import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DischargeSummaryPage } from './discharge-summary.page';

describe('DischargeSummaryPage', () => {
  let component: DischargeSummaryPage;
  let fixture: ComponentFixture<DischargeSummaryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DischargeSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
