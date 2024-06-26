import { Injectable } from '@angular/core';
import jsPDF, { RGBAData } from "jspdf";
import autoTable from "jspdf-autotable";
import { Filesystem, Directory, Encoding, } from '@capacitor/filesystem';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
const { Network } = Plugins;
@Injectable({
	providedIn: 'root'
})
export class UtilService {
	patientInfo: any;
	dischargeSummaryUrl = "";
	constructor(private http: HttpClient) { }

	validation = {
		isEmailAddress: function (str: string) {
			var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return pattern.test(str);  // returns a boolean
		},
		isAlphaNumaric: function (str: string) {
			var pattern = /^[a-zA-Z0-9]*$/;
			return pattern.test(str);  // returns a boolean
		},
		isString: function (str: string) {
			var pattern = /^[A-Za-z]*$/;
			return pattern.test(str);  // returns a boolean
		},
		isStringSpaces: function (str: string) {
			var pattern = /^[a-zA-Z ]+$/;
			return pattern.test(str);  // returns a boolean
		},
		isNotEmpty: function (str: string) {
			var pattern = /\S+/;
			return pattern.test(str);  // returns a boolean
		},
		isSpl: function (str: string) {
			var pattern = /`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/;
			return pattern.test(str);  // returns a boolean
		},
		isNumber: function (str: string) {
			var pattern = /^\d+$/;
			return pattern.test(str);  // returns a boolean
		},
		isSame: function (str1: any, str2: any) {
			return str1 === str2;
		}
	};

	// checkGPSPermission() {
	// 	this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
	// 		result => {
	// 			if (result.hasPermission) {
	// 				this.askToTurnOnGPS();
	// 			} else {
	// 				this.requestGPSPermission();
	// 			}
	// 		},
	// 		err => {
	// 			console.log(err);
	// 		}
	// 	);
	// }

	// requestGPSPermission() {
	// 	this.locationAccuracy.canRequest().then((canRequest: boolean) => {
	// 		if (canRequest) {
	// 			console.log("4");
	// 		} else {
	// 			this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
	// 				.then(
	// 					() => {
	// 						this.askToTurnOnGPS();
	// 					},
	// 					error => {
	// 						console.log('requestPermission Error requesting location permissions ' + error);
	// 					}
	// 				);
	// 		}
	// 	});
	// }

	// askToTurnOnGPS() {
	// 	this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_LOW_POWER).then(
	// 		() => {
	// 			this.getLocationCoordinates();
	// 		},
	// 		error => {
	// 			this.askToTurnOnGPS();
	// 		}
	// 	);
	// }
	// getLocationCoordinates() {
	// 	this.geolocation.getCurrentPosition().then((resp) => {
	// 		localStorage.setItem('latitude', resp.coords.latitude + '');
	// 		localStorage.setItem('longitude', resp.coords.longitude + '');
	// 		console.log(resp);
	// 	}).catch((error) => {
	// 		alert('Error getting location' + error);
	// 	});
	// }
	// _doCheckGPS() {

	// }

	// filterItems(searchTerm) {
	// 	return this.myProgramsList.filter(item => {
	// 		return item.TrainingMasterName.toLowerCase().indexOf(searchTerm.toLowerCase()) || item.TrainingMasterName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
	// 	});
	// }



	// convertFileToBase64(url: string) {
	// 	const promise = new Promise((resolve, reject) => {
	// 		this.file.resolveLocalFilesystemUrl(url).then((entry: FileEntry) => {
	// 			entry.file(file => {
	// 				const reader = new FileReader();
	// 				reader.onloadend = () => {
	// 					console.log(reader.result);
	// 					resolve(reader.result);
	// 				};
	// 				reader.onerror = () => {
	// 					console.log(reader.error);
	// 					reject(reader.error);
	// 				};
	// 				reader.readAsDataURL(file);
	// 			});
	// 		});
	// 	});
	// 	return promise;
	// }


	_doExportPDF(Data: any) {
		let height=Data.Height[0][2]? Data.Height[0][2]:"NA"
		console.log(Data, "Data")
		console.log(this.patientInfo, Data, "patientinfo")
		const doc: any = new jsPDF('p', 'pt', 'a4');
		const addFooters = (doc: any) => {
			const pageCount = doc.internal.getNumberOfPages();
			doc.setTextColor('red');
			doc.setFontSize(10);
			for (var i = 1; i <= pageCount; i++) {
				doc.setPage(i)
				doc.text('Page ' + String(i) + ' of ' + String(pageCount), 530, 820, 'justify'
				);
			}
		}
		autoTable(doc, {
			columns: Data.Headers,
			body: Data.Data,
			useCss: true,
			margin: {
				top: 110,
				right: 30,
				left: 30
			},
			//showHead: 'firstPage',
			theme: "grid",
			// startY: 100,
			headStyles: {
				lineWidth: 1, fillColor: [0, 128, 0], textColor: [255, 255, 255], cellPadding: 8, valign: 'middle', halign: 'center'
			},
			bodyStyles: {
				cellPadding: 6,
				valign: 'middle',
				halign: 'center',
			},
			didDrawPage: (dataArg: any) => {
				dataArg.doc.setFontSize(13);
				dataArg.doc.addImage('', 'JPEG', 30, 15, 120, 60)
				dataArg.doc.setTextColor('#000');
				dataArg.doc.text('MANTHENA SATHYANARAYANA RAJU AROGYALAYAM', 120, 48, 'justify');
				let subHeader = dataArg.doc;
				subHeader.setFontSize(10);
				subHeader.setTextColor('#000');
				subHeader.text(Data.subTitle, 260, 66, 'justify');
				let subheaderparams = dataArg.doc;
				// Add additional information below the title
				subheaderparams.text("Name: " + this.patientInfo.FullName, 30, 90, { align: 'left', maxWidth: 200 });
				subheaderparams.text(this.patientInfo.UHID, dataArg.doc.internal.pageSize.width / 2, 90, { align: 'center' });
				subheaderparams.text("Height: " + height, dataArg.doc.internal.pageSize.width - 30, 90, { align: 'right' });
				const currentdate = new Date();
				const datetime = currentdate.getDate() + '/' + (currentdate.getMonth() + 1) + '/' + currentdate.getFullYear();
				dataArg.doc.text('Date: ' + datetime, 485, 20, 'justify');
			}
		});
		addFooters(doc);
		//doc.save(Data.Title + moment(new Date).format("MMM DD YYYY") + '.pdf');
		const pdfContent = doc.output();
		console.log(pdfContent, "pdfContent")
		// Convert to Base64
		const base64String = btoa(pdfContent);
		let pdfSrc = 'data:application/pdf;base64,' + base64String;
		return pdfSrc;
	}

	_doConvertImageBase64ToPdfBase64(imageBase64: any) {
		// Create a new instance of jsPDF without specifying a page size
		const pdf = new jsPDF('l', 'px', [500, 500]);
		// Create an Image object to get the original image dimensions
		const img = new Image();
		img.src = imageBase64;
		// Add the image to the PDF, using the actual dimensions
		console.log(pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight())
		pdf.addImage(imageBase64, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
		// Get the base64 data of the PDF
		const pdfBase64 = pdf.output('datauristring');
		console.log('PDF Base64:', pdfBase64);
		return pdfBase64;
	}





}






