import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/services/alert.service';
import { DataService } from 'src/services/data.service';
import { Network } from '@capacitor/network';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-bmi-details',
  templateUrl: './patient-bmi-details.page.html',
  styleUrls: ['./patient-bmi-details.page.scss'],
})
export class PatientBmiDetailsPage implements OnInit {
  isLoading = false;
  connectionType: string = 'Unknown';
  BMIDetails: any = [];
  constructor(private navCtrl: NavController,
    private alertservice: AlertService,
    private dataservice: DataService) { }

  ngOnInit() {
    this._doGetBMIDetails();
  }

  _doBack() {
    this.navCtrl.navigateBack("/patient-details")
  }

  async _doGetBMIDetails() {
    const { connectionType } = await Network.getStatus();
    this.connectionType = connectionType;
    if (this.connectionType == "none" || this.connectionType == "Unknown" || this.connectionType == "undefined") {
      this.alertservice.doInfoAlert("No Internet connection found. Check your connection or try again");
    }
    else {
      this.isLoading = true;
      this.dataservice.get("GetPatientBMIReportDetails?appId=" +this.dataservice.patientApplicationId).then(res => {
        console.log(res, "bmi activities");
        let resultOutput = res;
        if (resultOutput != null) {
          resultOutput.forEach((item: any) => {
            const { Date,ApplicationId, ...rest } = item; // Remove 'Date' property from the item
            // Convert each item to key-value pairs
            let keyValuePairs: any = Object.entries(rest).map(([key, value],index) => ({
              key,
              value,
            }));
            this.BMIDetails.push(
              {
                date: item.Date,
                details: keyValuePairs
              })
          });
        }
        console.log(this.BMIDetails, "this.BMIDetails")
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        this.dataservice.globalErrorHandler(err)
      })
    }
  }



}
