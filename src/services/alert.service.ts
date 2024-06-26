import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
	isLoading = false;
	constructor(public loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController) { }

	// async loader() {
	// 	const loading = await this.loadingCtrl.create({
	// 		cssClass: 'my-custom-class',
	// 		message: `<div class="" id="loader1"><div class="loading"><div class="outer"></div><div class="loader_inner"></div><div class="him-logo"><img src="assets/imges/transperent.png" alt="oxysheild"></div></div></div>`,
	// 	});
	// 	await loading.present();
	// }

	// async loaderHide(): Promise<boolean> {
	// 	const result = await this.loadingCtrl.getTop();
	// 	if (result) {
	// 		this.loadingCtrl.dismiss();
	// 		return false;
	// 	}
	// 	return true; // Return a default value if `result` is falsy
	// }


	async _doErrorToast(msg: any, msgType: string) {
		console.log("toast" + " " + msgType + '-toast' + " " + ' animation', "class of the error")
		const toast = await this.toastCtrl.create({
			message: msg,
			position: 'top',
			cssClass: "toast" + " " + msgType + '-toast' + " " + ' animation',
			duration: 3000,
			animated: true,
			buttons: [
				{
					icon: "close",
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		toast.present();
	}


	async _doSuccessToast(msg: any, msgType: string) {
		console.log("toast" + msgType + '-toast' + 'animation');
		const toast = await this.toastCtrl.create({
			message: msg,
			position: 'top',
			cssClass: "toast" + " " + msgType + '-toast' + " " + ' animation',
			duration: 3000,
			animated: true,
			buttons: [
				{
					icon: "close",
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		toast.present();
	}


	// async doErrorAlert(infoMessage) {
	// 	const alert = await this.alertCtrl.create({
	// 		cssClass: 'error-alert -global-alerts',
	// 		message: '<div class="c-alert"><div class="c-alert__circle"><ion-icon name="alert" class="c-alert__icon"></ion-icon></div><div class="c-alert__body"><div class="c-alert__container"><p class="c-alert__message">' + infoMessage + '</p></div></div></div>',
	// 		buttons: ['Try again']
	// 	});
	// 	await alert.present();
	// }

	async doErrorAlert(Message: string) {
		const alert = await this.alertCtrl.create({
			cssClass: 'alert error-alert',
			message: Message,
			//message: `<div class="m-alert"><div class="m-alert__circle"><ion-icon name="warning-outline" class="m-alert__icon  waring-icon"></ion-icon></div><div class="m-alert__body"><div class="m-alert__container"><p class="m-alert__message">' + Message + ' </p></div></div></div>`,
			buttons: ['Try again']
		});
		await alert.present();
	}

	async doSuccessAlert(Message: string) {
		const alert = await this.alertCtrl.create({
			cssClass: 'alert success-alert',
			message: Message,
			//   message: '<div class="m-alert"><div class="m-alert__circle"><div class="m-alert__circle--inner"><div class="m-alert__checkmark draw"></div></div></div><div class="m-alert__body"><div class="m-alert__container"><p class="m-alert__message">' + Message + ' </p></div></div></div>',
			buttons: ['Ok']
		});
		await alert.present();
	}

	async doInfoAlert(Message: string) {
		const alert = await this.alertCtrl.create({
			cssClass: 'alert info-alert',
			message: Message,
			//   message: '<div class="m-alert"><div class="m-alert__circle"><ion-icon name="information-circle-outline" class="m-alert__icon waring-icon"></ion-icon></div><div class="m-alert__body"><div class="m-alert__container"><p class="m-alert__message">' + Message + '</p></div></div></div>',
			buttons: ['Ok']
		});
		await alert.present();
	}


	// async doInfoAlert(infoMessage, type) {
	// 	let alert = await this.alertCtrl.create({
	// 		cssClass: 'info-alert -global-alerts ' + '' + type,
	// 		message: '<div class="c-alert"><div class="c-alert__circle"><ion-icon name="information-circle-outline" class="c-alert__icon"></ion-icon></div><div class="c-alert__body"><div class="c-alert__container"><p class="c-alert__message">' + infoMessage + '</p></div></div></div>',
	// 		buttons: ['Ok']
	// 	});
	// 	await alert.present();
	// }


	async networkAlert(infoMessage: string) {
		let alert = await this.alertCtrl.create({
			cssClass: 'error-alert -global-alerts',
			message: '<div class="c-alert"><div class="c-alert__circle"><ion-icon name="logo-rss" class="c-alert__icon -network"></ion-icon></div><div class="c-alert__body"><div class="c-alert__container"><p class="c-alert__message">' + infoMessage + '</p></div></div></div>',
			buttons: ['Try again']
		});
		await alert.present();
	}

	async doError(Message: string) {
		const alert = await this.alertCtrl.create({
			cssClass: 'alert error-alert',
			message: '<div class="m-alert"><div class="m-alert__circle"><ion-icon name="alert-outline" class="m-alert__icon  waring-icon"></ion-icon></div><div class="m-alert__body"><div class="m-alert__container"><p class="m-alert__message">' + Message + ' </p></div></div></div>',
			buttons: ['OK']
		});
		await alert.present();
	}
}