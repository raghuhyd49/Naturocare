import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleActivitiesPage } from './schedule-activities.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleActivitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleActivitiesPageRoutingModule {}
