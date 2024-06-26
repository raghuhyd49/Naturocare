import { CUSTOM_ELEMENTS_SCHEMA, NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UtilService } from 'src/services/util.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from 'src/services/alert.service';
import { DataService } from 'src/services/data.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,PdfViewerModule,HttpClientModule,IonicModule.forRoot(),AppRoutingModule],
  providers: [AlertService,
    DataService,UtilService,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class AppModule {}





