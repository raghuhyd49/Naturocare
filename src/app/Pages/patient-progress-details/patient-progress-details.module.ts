import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PatientProgressDetailsPageRoutingModule } from './patient-progress-details-routing.module';
import { PatientProgressDetailsPage } from './patient-progress-details.page';
import { SharedModule } from 'src/app/shared.component.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    PatientProgressDetailsPageRoutingModule
  ],
  declarations: [PatientProgressDetailsPage]
})
export class PatientProgressDetailsPageModule {}
