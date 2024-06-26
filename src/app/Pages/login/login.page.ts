import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, MenuController, LoadingController } from '@ionic/angular';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { AlertService } from 'src/services/alert.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading = false;
  connectionType: string = 'Unknown';
  constructor(private navCtrl: NavController,
    private dataservice: DataService,
    private loadingController: LoadingController,
    private alertservice: AlertService,
    public menuCtrl: MenuController) {
  }

  // user:"vijjimahesh8791@gmail.com/3167"
  loginAuthentication = {
    userName: "",
    userpassword: "",
  }
  passwordType = "password"

  ngOnInit() {
    let battery = Device.getBatteryInfo();
    let info = Device.getInfo();
    console.log(battery, "battery");
    console.log(info, "info");
    let id = Device.getId();
    console.log(id, "id");
  }

  _doTogglePasswordView(action: any) {
    if (action == "show") {
      this.passwordType = "text"
    }
    else {
      this.passwordType = "password"
    }
  }



  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeGesture(true);
  }

  _doNavToRegister() {
    this.navCtrl.navigateForward("register");
  }

  async _doLogin() {
    console.log(this.loginAuthentication, "login")
    const { connectionType } = await Network.getStatus();
    this.connectionType = connectionType;
    console.log(this.connectionType, "connectionty")
    if (this.connectionType == "none" || this.connectionType == "Unknown" || this.connectionType == "undefined") {
      this.alertservice.doInfoAlert("No Internet connection found. Check your connection or try again");
    }
    else if (this.loginAuthentication.userName.trim() == "") {
      this.alertservice._doErrorToast("Please enter UHID", "error")
    }
    else if (this.loginAuthentication.userpassword.trim() == "") {
      this.alertservice._doErrorToast("Please enter Password", "error")
    }
    else {
      this.isLoading = true;
      this.loginAuthentication.userName = this.loginAuthentication.userName.replace(/\s/g, '');
      this.loginAuthentication.userpassword = this.loginAuthentication.userpassword.replace(/\s/g, '');
      console.log(this.loginAuthentication, "login after removing space")
      this.dataservice.token('token', this.loginAuthentication).then(res => {
        let loginOutput = res;
        this.isLoading = false
        localStorage.setItem("token", loginOutput.access_token)
        console.log(loginOutput, "loginOutput")
        localStorage.setItem("LoginUserName", loginOutput.FullName);
        localStorage.setItem("LoginEmailId", loginOutput.EmailId);
        this.navCtrl.navigateRoot("patient-details");
      }, err => {
        console.log(err, "error")
        this.alertservice.doErrorAlert(err.error.error);
        console.log(this.loginAuthentication, "login after removing space in errrr")
        this.isLoading = false;
        this.dataservice.globalErrorHandlerlogin(err)
      })
    }
  }


  async _doForgotPassword() {
    this.loginAuthentication.userpassword = "";
    const { connectionType } = await Network.getStatus();
    this.connectionType = connectionType;
    console.log(this.connectionType, "connectionty")
    if (this.connectionType == "none" || this.connectionType == "Unknown" || this.connectionType == "undefined") {
      this.alertservice.doInfoAlert("No Internet connection found. Check your connection or try again");
    }
    else if (this.loginAuthentication.userName.trim() == "") {
      this.alertservice._doErrorToast("Please enter UserName", "error")
    }
    else {
      this.loginAuthentication.userName = this.loginAuthentication.userName.replace(/\s/g, '');
      this.isLoading = true;
      this.dataservice.getwithoutauth("/GetAccountPasswordDetails?userName=" + this.loginAuthentication.userName).then(res => {
        console.log(res, "result")
        this.loginAuthentication.userpassword = res.Password
        this.passwordType = "text"
        this.isLoading = false;

      }, err => {
        this.alertservice.doErrorAlert(err.error.Message)
        this.isLoading = false;
        this.dataservice.globalErrorHandler(err)
      })
    }
  }






}
