import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/services/alert.service';
import { DataService } from 'src/services/data.service';
import { OrientationLockOptions, ScreenOrientation } from '@capacitor/screen-orientation';
import { Platform } from '@ionic/angular';
import { UtilService } from 'src/services/util.service';
import { Network } from '@capacitor/network';


@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.page.html',
  styleUrls: ['./pdf-viewer.page.scss'],
})
export class PdfViewerPage implements OnInit {
  pageHeaderTitle = "";
  zoomLevel = 1.3;
  pdfSrc = "";
  isLoading = false;
  connectionType: string = 'Unknown';
  //trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrl);

  constructor(private navCtrl: NavController,
    private utilservice: UtilService,
    private platform: Platform,
    private alertservice: AlertService,
    private dataservice: DataService) {
    window.screen.orientation.unlock();
  }


  ngOnInit() {
    this.platform.ready().then(() => {
      const orientation = this.platform.isLandscape() ? 'landscape' : 'portrait';
      console.log(`Current orientation is ${orientation}`);
    });
    const options: OrientationLockOptions = { orientation: 'landscape' };
    ScreenOrientation.lock({ orientation: 'landscape' });
    this.pageHeaderTitle = this.dataservice.activities.menu;
    console.log(this.pageHeaderTitle, "title")
    if (this.pageHeaderTitle == "BMI") {
      this._doGetDetails("GetPatientBMIReportDetails?appId=")
    }
    else if (this.pageHeaderTitle == "PROGRESS") {
      this._doGetDetails("GetPatientProgressReportDetails?AppId=")
    }
    else {
      this.pdfSrc = "https://www.drmanthena.com/webapi/API/GetMSRMapPlanFile";
      //this.pdfSrc="https://drmanthena.com/MobileAPP_Files/msrplan.pdf"
      // this._doConvertImageAsBase64()
    }
  }

  _doBack() {
    this.navCtrl.navigateBack("/patient-details")
  }

  ionViewWillLeave() {
    ScreenOrientation.unlock();
  }

  _doZoomOut() {
    this.zoomLevel = this.zoomLevel + 0.5;
  }

  _doZoomIn() {
    this.zoomLevel = this.zoomLevel - 0.5;
  }

  async _doGetDetails(url: any) {
    const { connectionType } = await Network.getStatus();
    this.connectionType = connectionType;
    if (this.connectionType == "none" || this.connectionType == "Unknown" || this.connectionType == "undefined") {
      this.alertservice.doInfoAlert("No Internet connection found. Check your connection or try again");
    }
    else {
      this.isLoading = true;
      this.dataservice.get(url + this.dataservice.patientApplicationId).then(res => {
        let resultOutput = res;
        console.log(resultOutput, "resultOutput");
        let height=resultOutput.RowsList.filter((subArray: string | string[]) => subArray.includes("Height"))
        if (resultOutput) {
          let pdfData = {
            Height:height,
            Headers: resultOutput.ColumnsList,
            Data: resultOutput.RowsList.filter((subArray: string | string[]) => !subArray.includes("Height")),
            subTitle: this.pageHeaderTitle == "BMI" ? "BMI Report" : "Progress Report"
          }
          this.pdfSrc = this.utilservice._doExportPDF(pdfData)
        }
        console.log(resultOutput, "this.resultOutput")
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      }, err => {
        this.isLoading = false;
        this.dataservice.globalErrorHandler(err)
      })
    }
  }

  // the below methods will be usefull in feature

  async _doConvertImageAsBase64() {
    console.log("coming to the method")
    let pdfPath = "assets/images/Layout - MSRA.png";
    try {
      const response = await fetch(pdfPath);
      const blob = await response.blob();
      const base64String = await this.blobToBase64(blob);
      let x = this.utilservice._doConvertImageBase64ToPdfBase64(base64String)
      this.pdfSrc = "data:application/pdf;base64," + x.split(",")[1]
      console.log(this.pdfSrc, "pdfsrc")
    } catch (error) {
      console.error('Error reading PDF file:', error);
    }
  }

  async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}









