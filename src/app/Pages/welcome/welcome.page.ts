import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/services/alert.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {


  tabs = [
    {
      title: 'Schedule Activities',
      url: 'patient-details',
      icon: 'health3',
    }

  ]


  constructor(private alertservice: AlertService, private navCtrl: NavController,) { }

  ngOnInit() {
  }
  _doNavTopage(tab: any) {
    if (tab.url == "") {
      this.alertservice.doInfoAlert("This feature will be available soon.Please Stay tuned!'")
    } else {
      this.navCtrl.navigateForward(tab.url);
    }

  }

}
