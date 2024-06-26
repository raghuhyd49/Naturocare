import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientProgressDetailsPage } from './patient-progress-details.page';

const routes: Routes = [
  {
    path: '',
    component: PatientProgressDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientProgressDetailsPageRoutingModule {}
