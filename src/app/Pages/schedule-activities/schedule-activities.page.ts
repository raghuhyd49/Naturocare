import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { DataService } from 'src/services/data.service';
import { AlertService } from 'src/services/alert.service';
import * as moment from 'moment';
import { Network } from '@capacitor/network';


@Component({
  selector: 'app-schedule-activities',
  templateUrl: './schedule-activities.page.html',
  styleUrls: ['./schedule-activities.page.scss'],
})
export class ScheduleActivitiesPage implements OnInit {
  isLoading = false;
  connectionType: string = 'Unknown';
  isAllDietsEmpty = false;
  scheduleActivities: any = [];
  pageHeaders = {
    date: "",
    title: "",
    formatedHeaderDate: ""
  }

  colorCodes = {
    dietColor: "",
    treatmentColor: "",
    others: ""
  }

  groupScheduleActivities: any = [
    {
      scheduledName: "BreakFast",
      scheduledTimings: '08:00-08:30 AM',
      groupedActivities: [],
      isShownSchedule: false
    },
    {
      scheduledName: "Pre Lunch",
      scheduledTimings: '11:00-12:00 PM',
      groupedActivities: [],
      isShownSchedule: false
    },
    {
      scheduledName: "Lunch",
      scheduledTimings: '12:00-01:00 PM',
      groupedActivities: [],
      isShownSchedule: false
    },
    {
      scheduledName: "Post Lunch",
      scheduledTimings: '03:00-04:00 PM',
      groupedActivities: [],
      isShownSchedule: false
    },
    {
      scheduledName: "Dinner",
      scheduledTimings: '06:00-07:00 PM',
      groupedActivities: [],
      isShownSchedule: false
    },
    {
      scheduledName: "Others",
      scheduledTimings: '',
      groupedActivities: [],
      isShownSchedule: false
    }
  ];


  tabsList = [
    {
      tabId: 1,
      tabName: "Patient Details",
      tabstyle: "active",
      icon: "person"
    },
    {
      tabId: 2,
      tabName: "Schedule Activities",
      tabstyle: "",
      icon: "calendar"
    }
  ]

  constructor(private navCtrl: NavController,
    private alertservice: AlertService,
    private dataservice: DataService) { }

  ngOnInit() {
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    this.pageHeaders.title = this.dataservice.activities.menu;
    this.pageHeaders.date = this.dataservice.activities.day == 'today' ? moment(today).format('YYYY-MM-DD') : moment(tomorrow).format('YYYY-MM-DD');
    this.pageHeaders.formatedHeaderDate = moment(this.pageHeaders.date).format('DD MMM YYYY');
    console.log(this.pageHeaders.title, "  this.pageHeaders.title")
    if (this.pageHeaders.title == 'Diet Activities') {
      this._doGetDietScheduleActivities()
    }
    else {
      this._doGetScheduleActivities()
    }
  }
  _doBack() {
    this.navCtrl.navigateBack("/patient-details")
  }


  // _doTabAction(tab: any) {
  //   this.tabName = tab.tabName
  //   this.tabsList.forEach(ele => {
  //     ele.tabstyle = "";
  //     if (ele.tabId == tab.tabId) {
  //       ele.tabstyle = "active"
  //     }
  //   })
  // }


  async _doGetScheduleActivities() {
    const { connectionType } = await Network.getStatus();
    this.connectionType = connectionType;
    if (this.connectionType == "none" || this.connectionType == "Unknown" || this.connectionType == "undefined") {
      this.alertservice.doInfoAlert("No Internet connection found. Check your connection or try again");
    }
    else {
      this.isLoading = true;
      this.dataservice.get("GetScheduleActivitiesList?appId=" + this.dataservice.patientApplicationId + "&date=" + encodeURIComponent(this.pageHeaders.date)).then(res => {
        console.log(this.scheduleActivities, "schdule activities");
        this.colorCodes.others = res.m_Item1.Others;
        this.colorCodes.dietColor = res.m_Item1.Diet;
        this.colorCodes.treatmentColor = res.m_Item1.Treatment
        this.scheduleActivities = res.m_Item2;
        this.isLoading = false;
        console.log(res, "res of the schedule")
      }, err => {
        this.isLoading = false;
        this.dataservice.globalErrorHandler(err)
      })
    }
  }



  async _doGetDietScheduleActivities() {
    const { connectionType } = await Network.getStatus();
    this.connectionType = connectionType;
    if (this.connectionType == "none" || this.connectionType == "Unknown" || this.connectionType == "undefined") {
      this.alertservice.doInfoAlert("No Internet connection found. Check your connection or try again");
    }
    else {
      this.isLoading = true;
      this.dataservice.get("GetDietScheduleActivitiesList?appId=" + this.dataservice.patientApplicationId + "&date=" + encodeURIComponent(this.pageHeaders.date)).then(res => {
        console.log(this.scheduleActivities, "schdule activities");
        this.colorCodes.others = res.m_Item1.Others;
        this.colorCodes.dietColor = res.m_Item1.Diet;
        this.colorCodes.treatmentColor = res.m_Item1.Treatment
        this.scheduleActivities = res.m_Item2;
        this.isLoading = false;
        this._doGroupActivities()
        console.log(res, "res of the Diet schedule")
      }, err => {
        this.isLoading = false;
        this.dataservice.globalErrorHandler(err)
      })
    }
  }





  _doGroupActivities() {
    this.scheduleActivities.forEach((activity: any) => {
      if (activity.Time == "08:00-08:30 AM") {
        this.groupScheduleActivities[0].isShownSchedule = true;
        this.groupScheduleActivities[0].groupedActivities.push(activity.Activity)
      }
      else if (activity.Time == "11:00-12:00 PM") {
        this.groupScheduleActivities[1].isShownSchedule = true;
        this.groupScheduleActivities[1].groupedActivities.push(activity.Activity)
      }
      else if (activity.Time == "12:00-01:00 PM") {
        this.groupScheduleActivities[2].isShownSchedule = true;
        this.groupScheduleActivities[2].groupedActivities.push(activity.Activity)
      }
      else if (activity.Time == "03:00-04:00 PM") {
        this.groupScheduleActivities[3].isShownSchedule = true;
        this.groupScheduleActivities[3].groupedActivities.push(activity.Activity)
      }
      else if (activity.Time == "06:00-07:00 PM") {
        this.groupScheduleActivities[4].isShownSchedule = true;
        this.groupScheduleActivities[4].groupedActivities.push(activity.Activity)
      }
      else {
        this.groupScheduleActivities[5].isShownSchedule = true;
        this.groupScheduleActivities[5].groupedActivities.push(activity.Activity)
      }
    });
    this.isAllDietsEmpty = this.groupScheduleActivities.every((item: { groupedActivities: string | any[]; }) => item.groupedActivities.length === 0);
    console.log(this.isAllDietsEmpty, "groupedschdule activitirseess")
  }
}