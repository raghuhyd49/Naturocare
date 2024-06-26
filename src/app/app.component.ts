import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  selectedIndex = 0;
  Menus: any = [
    // {
    //   title: 'welcome',
    //   arrowdirection: 'forward',
    //   url: 'welcome',
    //   icon: 'tv',
    //   IsSubmenu: false,
    //   IshowSubmenu: false,
    //   style: '',
    //   subMenu: [],
    //   Value: '',
    // },
    {
      title: 'Patient Details',
      arrowdirection: 'forward',
      url: 'patient-details',
      icon: 'tv',
      IsSubmenu: false,
      IshowSubmenu: false,
      style: '',
      subMenu: [],
      Value: '',
    },

    // {
    //   title: 'Help & Support',
    //   url: '/folder/Inbox',
    //   icon: 'information-circle-sharp',
    //   IsSubmenu: true,
    //   arrowdirection: "up",
    //   style: "",
    //   IshowSubmenu: false,
    //   subMenu: [
    //     {
    //       title: 'Report a Problem',
    //       url: "report-problem"
    //     },
    //     {
    //       title: 'Terms & Conditions',
    //       url: "terms-conditions"
    //     },
    //     {
    //       title: 'Privacy Policy',
    //       url: "privacy-policy"
    //     }
    //   ],
    //   Value: "",
    // },
    {
      title: 'Sign Out',
      arrowdirection: '',
      url: 'login',
      icon: 'log-out',
      IsSubmenu: false,
      style: '',
      IshowSubmenu: false,
      subMenu: [],
      Value: '',
    },
  ];
  constructor(
    private navCtrl: NavController,
    private altCtrl: AlertController,
    private platform: Platform
  ) {
    SplashScreen.hide();
    let userLoggedIn = localStorage.getItem('token');
    console.log(userLoggedIn, 'userloggdin appcomeponent');
    if (userLoggedIn) {
      this.navCtrl.navigateRoot('patient-details');
    }
  }

  userInfo: any = {
    userName: '',
    userMail: '',
  };
  ionWillOpen() {
    console.log('ion open');
    this.userInfo.userName = localStorage.getItem('LoginUserName');
    this.userInfo.userMail = localStorage.getItem('LoginEmailId');
  }
  ngOnInit() {
    this._doInitializeApp();
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.Menus.findIndex(
        (page: { title: string }) =>
          page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }
  _doInitializeApp() {
    this.platform.ready().then(async () => {
      await SplashScreen.hide();
      let data = StatusBar.getInfo();
      await StatusBar.setBackgroundColor({ color: '#4b8843' });
      SplashScreen.hide();
      await StatusBar.setOverlaysWebView({ overlay: false });
    });
  }

  _doShowSubmenu(p: any, index: any) {
    console.log(p, 'ppp');
    this.Menus.forEach(
      (
        element: {
          arrowdirection: string;
          IshowSubmenu: boolean;
          style: string;
        },
        index: any
      ) => {
        if (index != index) {
          element.IshowSubmenu = false;
          element.style = '';
        }
      }
    );

    if (p.IshowSubmenu === false) {
      p.IshowSubmenu = true;
      p.style = 'active';
      p.arrowdirection = 'down';
    } else {
      p.IshowSubmenu = false;
      p.style = '';
      p.arrowdirection = 'up';
    }
  }

  goToPage(p: any, i: any) {
    this.Menus.forEach(
      (
        element: {
          arrowdirection: string;
          IshowSubmenu: boolean;
          style: string;
        },
        index: any
      ) => {
        if (index != i) {
          element.IshowSubmenu = false;
          element.style = '';
          element.arrowdirection = 'up';
        }
      }
    );
    console.log(p.url, 'url');
    if (p.url == 'login') {
      console.log('hi');
      this._doFinishAction(p);
    } else {
      this.navCtrl.navigateRoot(p.url);
    }
  }
  async _doFinishAction(item: any) {
    const alert = await this.altCtrl.create({
      cssClass: 'app-exit-alertpopup',
      message: `Are you  sure want exit the App`,
      buttons: [
        {
          text: 'YES',
          cssClass: 'yes',
          handler: () => {
            localStorage.clear();
            this.navCtrl.navigateBack('login');
          },
        },
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'no',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
      ],
    });

    await alert.present();
  }
}
