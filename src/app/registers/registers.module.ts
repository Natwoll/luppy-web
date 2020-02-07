import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Registers } from './registers.page';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../../environments/environment';
import { environment as prodEnvironment} from '../../environments/environment.prod';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Registers }]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule.initializeApp(prodEnvironment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  declarations: [Registers]
})
export class RegistersModule {}
