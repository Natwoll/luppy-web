import { Component, OnInit } from '@angular/core';
// import * as jspdf from 'jspdf'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
//import { auth } from '../serivces/auth';

@Component({
  selector: 'app-scan',
  templateUrl: 'scan.page.html',
  styleUrls: ['scan.page.scss']
})

export class Scan implements OnInit{
  public qrQtd: number;
  public qrcodeList = [];

  constructor(private db: AngularFirestore) {
  }

  ngOnInit(): void {
    //auth.isAuthenticated();
  }

  private async setSerialDocumentIndex(initials: string, times: number) {
    this.db.firestore.doc('/serial/qrcodes/').set({initials: initials, times: times})
    .then(
      () => { return true }
    ).catch(
      err => {
        console.log('Got an error tring to set the qrcode serial document', err)
    });
  }

  private async getSerialDocumentIndex() {
    return this.db.firestore.doc('/serial/qrcodes/').get()
    .then(data => { return data.data() })
    .catch(
      err => {
        console.log('Got an error tring to get the qrcode serial document', err)
      }
    );
  }

  public generateCodes(): void {

    if(this.qrQtd > 18){
      alert('É permitido imprimir no máximo 18 QrCode por vez');
    } else {
      let iterator = 1;
      let qtdQrcode = this.qrQtd;
      this.qrcodeList = [];
      
      this.getSerialDocumentIndex()
      .then((data: any) => {
        if(this.qrQtd > 0){
          iterator = data.times

          while(iterator < this.qrQtd + data.times){
            this.qrcodeList.push({data: data.initials + iterator});
            iterator++;
          }
          this.setSerialDocumentIndex(data.initials, iterator)
        }
      }).catch(err => { console.log('error generating qrcodes values', err) })
    }
  }

  // public printQrCodes(): void {
  //   const doc = new jspdf();
  //   const images = document.querySelectorAll('img');
  //   let positionX = 0;
  //   let positionY = 0;
  //   let column = 1;
  //   let listIterator = 0;
  //   let qrcodes = this.qrcodeList;
  
  //   doc.setFontSize(20);
  //   doc.text('Lista de QR Codes:', 20, 20);
  //   doc.setFontSize(13);
  //   images.forEach.call(images, function(image: HTMLImageElement) {
  //     switch (column) {
  //       case 1:
  //         positionX = 20;
  //         positionY += 40;
  //         break;
  //       case 2:
  //         positionX += 50;
  //         break;
  //       case 3:
  //         positionX += 50;
  //         column = 0;
  //         break;
  //     } column++;
      
  //     doc.addImage(image, 'JPEG', positionX, positionY, 40, 40);
  //     doc.text(qrcodes[listIterator].data, positionX+10, positionY+40);
  //     listIterator++;
  //   });

  //   doc.save('QrCodeList.pdf')
  // }

}
