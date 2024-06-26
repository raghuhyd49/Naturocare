import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DischargeSummaryPage } from './discharge-summary.page';

const routes: Routes = [
  {
    path: '',
    component: DischargeSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DischargeSummaryPageRoutingModule {}
