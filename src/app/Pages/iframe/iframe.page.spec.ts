import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IframePage } from './iframe.page';

describe('IframePage', () => {
  let component: IframePage;
  let fixture: ComponentFixture<IframePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IframePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
