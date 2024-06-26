import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.component.module';
import { IonicModule } from '@ionic/angular';
import { ScheduleActivitiesPageRoutingModule } from './schedule-activities-routing.module';
import { ScheduleActivitiesPage } from './schedule-activities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    ScheduleActivitiesPageRoutingModule
  ],
  declarations: [ScheduleActivitiesPage]
})
export class ScheduleActivitiesPageModule {}
