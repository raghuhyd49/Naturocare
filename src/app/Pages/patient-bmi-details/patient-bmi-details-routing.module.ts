import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientBmiDetailsPage } from './patient-bmi-details.page';

const routes: Routes = [
  {
    path: '',
    component: PatientBmiDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientBmiDetailsPageRoutingModule {}
