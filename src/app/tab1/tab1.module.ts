import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NgxQRCodeModule } from 'ngx-qrcode2'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../../environments/environment';
import { environment as prodEnvironment} from '../../environments/environment.prod';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    NgxQRCodeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule.initializeApp(prodEnvironment.firebase),
    AngularFirestoreModule,
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
