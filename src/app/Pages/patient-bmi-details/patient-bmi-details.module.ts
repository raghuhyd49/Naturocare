import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PatientBmiDetailsPageRoutingModule } from './patient-bmi-details-routing.module';
import { PatientBmiDetailsPage } from './patient-bmi-details.page';
import { SharedModule } from 'src/app/shared.component.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    PatientBmiDetailsPageRoutingModule
  ],
  declarations: [PatientBmiDetailsPage]
})
export class PatientBmiDetailsPageModule {}
