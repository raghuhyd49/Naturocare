import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { UtilService } from 'src/services/util.service';
import { Browser } from '@capacitor/browser';



@Component({
  selector: 'app-discharge-summary',
  templateUrl: './discharge-summary.page.html',
  styleUrls: ['./discharge-summary.page.scss'],
})
export class DischargeSummaryPage implements OnInit {
  isLoading = false;
  connectionType: string = 'Unknown';
  constructor(private utilservice: UtilService,
    private navCtrl: NavController,
  ) { }



  ngOnInit() {
  }

  _doBack() {
    this.navCtrl.navigateBack("/patient-details")
  }

  _doDownload = async () => {
    await Browser.open({ url: this.utilservice.dischargeSummaryUrl });
  };














}






