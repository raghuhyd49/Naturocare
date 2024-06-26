import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { DataService } from 'src/services/data.service';
import { AlertService } from 'src/services/alert.service';
import { Network } from '@capacitor/network';
import { DomSanitizer } from '@angular/platform-browser';
import { Browser, OpenOptions } from '@capacitor/browser';
import { Platform } from '@ionic/angular';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
})
export class PatientDetailsPage implements OnInit {
  isLoading = false;
  connectionType: string = 'Unknown';

  patientDetails = {
    image: "",
    Name: "Mr/Mrs.xxxxxxx",
    UHId: "xxxxxxxxxx",
    QRCode: "",
    bookingURL: "",
    dischargeSummaryURL: "",
    bmiReportURL: "",
    progressReportURL: "",
    mapURL: "https://www.drmanthena.com/webapi/API/GetMSRMapPlanFile"
  };

  constructor(private navCtrl: NavController,
    private altCtrl: AlertController,
    private alertservice: AlertService,
    private dataservice: DataService,
    private platform: Platform,
    private utilservice: UtilService,
    private sanitizer: DomSanitizer) {
    this._doGetURLs();
  }

  ngOnInit() {
    this._doGetPatientDetails();
  }

  _doNavToScheduleActivities(day: any, data: any) {
    this.dataservice.activities = { day: day, menu: data }
    this.navCtrl.navigateForward("/activities")
  }


  _doNavToPage(data: any) {
    console.log(data, "data")
    this.dataservice.activities = { day: new Date(), menu: data }
    // if (data == 'MAP') {
    //   this.navCtrl.navigateForward("/iframe");
    // }

    if (data == 'PROGRESS' || data == 'BMI' || data == 'MAP') {
      this.navCtrl.navigateForward("/pdfviewer");
    }
    else if (data == "DISUM") {
      this._doNavToBrowser("DISUM", this.patientDetails.dischargeSummaryURL)
      //this.navCtrl.navigateForward("/dischargesummary");
    }
    else {
      this.alertservice.doInfoAlert("Please stay tune!,The feature will avialable soon")
    }
  }


  async _doGetPatientDetails() {
    const { connectionType } = await Network.getStatus();
    this.connectionType = connectionType;
    console.log(this.connectionType, "connectionty")
    if (this.connectionType == "none" || this.connectionType == "Unknown" || this.connectionType == "undefined") {
      this.alertservice.doInfoAlert("No Internet connection found. Check your connection or try again");
    }
    else {
      this.isLoading = true;
      this.dataservice.get('GetPatientDetails').then(res => {
        if (res) {
          let resultOutput = res;
          this.utilservice.patientInfo = resultOutput;
          console.log(res, "patient details")
          this.patientDetails.UHId = resultOutput.UHID;
          this.patientDetails.Name = resultOutput.FullName;
          this.patientDetails.image = resultOutput.ProfilePath;
          this.dataservice.patientApplicationId = resultOutput.ApplicationId;
          this.patientDetails.QRCode = resultOutput.QRcodePath
        }
        else {
          this.presentAlert()
        }
        this.isLoading = false
        console.log(res, "result")
      }, err => {
        this.isLoading = false
        this.dataservice.globalErrorHandler(err)
      })
    }
  }

  async _doGetURLs() {
    const { connectionType } = await Network.getStatus();
    this.connectionType = connectionType;
    console.log(this.connectionType, "connectionty")
    if (this.connectionType == "none" || this.connectionType == "Unknown" || this.connectionType == "undefined") {
      this.alertservice.doInfoAlert("No Internet connection found. Check your connection or try again");
    }
    else {
      this.isLoading = true;
      this.dataservice.get("GetPatientFooterUrlDetails").then(res => {
        this.patientDetails.bookingURL = res.BookingURL;
        this.patientDetails.dischargeSummaryURL = res.DischargeSummaryURL;
        this.patientDetails.bmiReportURL = res.BMIReportURL;
        this.patientDetails.progressReportURL = res.ProgressReportURL;
        this.utilservice.dischargeSummaryUrl = res.DischargeSummaryURL
        console.log(res, "result of footerlinks")
      }, err => {
        this.isLoading = false
        this.dataservice.globalErrorHandler(err)
      })
    }
  }

  _doNavToBrowser(tab: any, url: any) {
    let URL = url
    this._doOpenFileInBrowser(URL);
  }

  _doOpenFileInBrowser(URL: any) {
    //const trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.bookingURL);
    const options: OpenOptions = {
      presentationStyle: 'fullscreen',
      windowName: '_system',
      toolbarColor: '#FFFFFF',
      url: URL
    };
    Browser.open(options)
      .catch(error => {
        console.error('Error opening browser', error);
        // Handle error (e.g., show a message to the user)
      });
  }


  ngOnDestroy() {
    if (this.platform.is('capacitor')) {
      Browser.close();
    }
  }



  async presentAlert() {
    const alert = await this.altCtrl.create({
      message: 'No Data Found',
      cssClass: 'alert info-alert',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
            this.navCtrl.navigateBack("login")
          },
        }
      ]
    });
    await alert.present();
  }








}

