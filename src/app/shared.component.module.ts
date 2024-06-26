import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ApploaderComponent } from './apploader/apploader.component';


@NgModule({
    declarations: [
        ApploaderComponent
    ],
    imports: [ IonicModule.forRoot(),CommonModule],
    exports: [
        ApploaderComponent
    ],
})
export class SharedModule {}