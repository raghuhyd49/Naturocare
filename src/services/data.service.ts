import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  msgs = [];
  messages: any[] = [];
  activities: any;
  Apiurl = "https://drmanthena.com/WEBAPI/API/";
  LoginToken = localStorage.getItem("token");
  patientApplicationId: any;
  tabMenuName="";
  constructor(private http: HttpClient, private _alert: AlertService,
    private navCtrl: NavController) {
  }

  private headers1 = new HttpHeaders({ 'Content-Type': 'application/json' });
  private Options1 = this.headers1.append('Authorization', 'bearer' + ' ' + this.LoginToken);
  private headers2 = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private Options2 = this.headers2.append('Authorization', 'bearer' + ' ' + this.LoginToken);


  ngOnInit() { }
  /* ========================== Get method======================================================*/

  get(url: string = ''): Promise<any> {
    let token = localStorage.getItem('token')
    let Options = this.headers1.append('Authorization', 'bearer' + ' ' + token);
    return this.http.get(this.Apiurl + url, { headers: Options })
      .toPromise()
      .then(response => response)
      .catch(err => {
        console.log(err, "API Error")
      });
  }

  getwithoutauth(url: string = ''): Promise<any> {
    return this.http.get(this.Apiurl + url)
      .toPromise()
      .then(response => response)
      .catch(err => {
        console.error(err.error.Message, "API Error"); // Log the error message
        // Rethrow the error so it can be caught in the calling code
        return Promise.reject(err);
      });
  }

  /* ========================= Post method =====================================================*/

  post(url: string = '', data: any): Promise<any> {
    return this.http.post(this.Apiurl + url, JSON.stringify(data), { headers: this.Options1 }).toPromise()
      .then(response => response)
      .catch(this.handleErrorToken);
  }
  /*============================ Token & login Method ===================================================*/

  token(url: string = '', data: any): Promise<any> {
    return this.http.post(this.Apiurl + url, 'grant_type=password&UserName=' + encodeURIComponent(data.userName) + '&Password=' + encodeURIComponent(data.userpassword), { headers: this.headers2 }).toPromise()
      .then(response => response)
      .catch(err => {
        this.handleErrorToken(err)
        console.error(err.error.Message, "API Error"); // Log the error message
        // Rethrow the error so it can be caught in the calling code
        return Promise.reject(err);
      });
  }


  login(url: string = '', data: any): Promise<any> {
    return this.http.post(this.Apiurl + url, JSON.stringify(data), { headers: this.Options1 }).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  /*============================Post Form Urlencode Method==================================================*/

  postFormUrlEncodedData(data: any, url: string = ''): Promise<any> {
    let tempData = ""
    let data1 = Object.entries(data)
    data1.forEach(ele => {
      tempData = tempData + `${ele[0]}=${ele[1]}&`
    })
    tempData = tempData.slice(0, -1)
    return this.http.post(this.Apiurl + url, tempData, { headers: this.Options2 })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  /*======== ===================Message and Error Display Methods====================================*/


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error.status); // for demo purposes only
    return Promise.reject(error.status);
  }


  private handleErrorToken(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.status);
  }

  globalErrorHandlerlogin(erroCode: number) {
    // this._alert.loaderHide();
    if (erroCode === 400) {
      this._alert.doErrorAlert('Access is denied due to invalid credentials');
    } else if (erroCode === 500) {
      this._alert.doErrorAlert('Unable to process your request and try again');
    } else if (erroCode === 0) {
      this._alert.doErrorAlert('No response from server. please try again');
    } else if (erroCode === 503) {
      this._alert.doErrorAlert('The server is currently unavailable (overloaded or down)');
    } else if (erroCode === 401) {
      this._alert.doErrorAlert('Access is denied due to invalid credentials');
    }
  }


  globalErrorHandler(erroCode: number) {
    if (erroCode === 400) {
      this._alert.doErrorAlert('Bad Request Failed To Save');
    } else if (erroCode === 500) {
      this._alert.doErrorAlert('Unable to process your request and try again');
    } else if (erroCode === 0) {
      this._alert.doErrorAlert('You are in Offline, we will push the data once the internet avilable');
    } else if (erroCode === 503) {
      this._alert.doErrorAlert('The server is currently unavailable (overloaded or down)');
    } else if (erroCode === 401) {
      this._alert.doErrorAlert('Unauthorised Access, Please login');
      this.navCtrl.navigateRoot('login');
    }
  }

  Error(err: any) {
    this._alert.doError(err);
  }
}
