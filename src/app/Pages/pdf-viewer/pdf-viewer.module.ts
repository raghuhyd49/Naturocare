import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PdfViewerPageRoutingModule } from './pdf-viewer-routing.module';
import { PdfViewerPage } from './pdf-viewer.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from 'src/app/shared.component.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PdfViewerModule,
    IonicModule,
    PdfViewerPageRoutingModule
  ],
  declarations: [PdfViewerPage]
})
export class PdfViewerPageModule {}
