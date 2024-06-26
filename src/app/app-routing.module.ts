import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./Pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'patient-details',
    loadChildren: () => import('./Pages/patient-details/patient-details.module').then( m => m.PatientDetailsPageModule)
  },
  {
    path: 'activities',
    loadChildren: () => import('./Pages/schedule-activities/schedule-activities.module').then( m => m.ScheduleActivitiesPageModule)
  },
  {
    path: 'progressdetails',
    loadChildren: () => import('./Pages/patient-progress-details/patient-progress-details.module').then( m => m.PatientProgressDetailsPageModule)
  },
  {
    path: 'bmidetails',
    loadChildren: () => import('./Pages/patient-bmi-details/patient-bmi-details.module').then( m => m.PatientBmiDetailsPageModule)
  },
  {
    path: 'pdfviewer',
    loadChildren: () => import('./Pages/pdf-viewer/pdf-viewer.module').then( m => m.PdfViewerPageModule)
  },
  {
    path: 'iframe',
    loadChildren: () => import('./Pages/iframe/iframe.module').then( m => m.IframePageModule)
  },
  {
    path: 'dischargesummary',
    loadChildren: () => import('./Pages/discharge-summary/discharge-summary.module').then( m => m.DischargeSummaryPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
