import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

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
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule.initializeApp(prodEnvironment.firebase),
    AngularFirestoreModule,
    FormsModule,
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
