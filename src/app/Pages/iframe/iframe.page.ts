import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { OrientationLockOptions, ScreenOrientation } from '@capacitor/screen-orientation';
import { Platform } from '@ionic/angular';
import { UtilService } from 'src/services/util.service';
@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.page.html',
  styleUrls: ['./iframe.page.scss'],
})
export class IframePage implements OnInit {
  constructor(private dataservice: DataService,
    private navCtrl: NavController,
    private platform: Platform,
    private utilservice: UtilService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      const orientation = this.platform.isLandscape() ? 'landscape' : 'portrait';
      console.log(`Current orientation is ${orientation}`);
    });
    const options: OrientationLockOptions = { orientation: 'landscape' };
    ScreenOrientation.lock({ orientation: 'landscape' })
  }
  _doBack() {
    this.navCtrl.navigateBack("/patient-details")
  }
  ionViewWillLeave() {
    ScreenOrientation.unlock();
  }








}
