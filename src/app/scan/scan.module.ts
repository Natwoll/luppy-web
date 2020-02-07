import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Scan } from './scan.page';
import { NgxQRCodeModule } from 'ngx-qrcode2'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Scan }]),
    NgxQRCodeModule
  ],
  declarations: [Scan]
})
export class ScanModule {}
