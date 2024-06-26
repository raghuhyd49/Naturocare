import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DischargeSummaryPageRoutingModule } from './discharge-summary-routing.module';

import { DischargeSummaryPage } from './discharge-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DischargeSummaryPageRoutingModule
  ],
  declarations: [DischargeSummaryPage]
})
export class DischargeSummaryPageModule {}
