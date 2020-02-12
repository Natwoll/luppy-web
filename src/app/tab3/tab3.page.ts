import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client, Machine, History as Hist} from '../common/interfaces.page'
import { getFormatedDay, serializeDocument } from '../common/functions'


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private clientPath: string;
  private machinePath: string;
  private historyPath: string;
 //Variaveis expostas externamente
 public key: string;
 public client: Observable<Client>;
 public machine: Observable<Machine>;
 public history: Observable<Hist[]>;
 public isHistory: boolean;
 public contentLoaded: boolean;
 public historyPiece: string;

 constructor(private db: AngularFirestore) { }

 private loadClient(docReference: string): void {
   this.client = this.db.doc<Client>(docReference).valueChanges()
 }

 private loadMachine(docReference: string): void {
   this.machine = this.db.doc<Machine>(docReference).valueChanges()
 }

 private loadHistory(collectionReference: string): void {
   this.history = this.db.collection<Hist>(collectionReference).valueChanges()
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

private getSerialDocumentIndex() {
  return new Promise(resolve => {
    let serialDocument: {date: string, times: number};
    resolve(
      this.db.firestore.doc(this.historyPath + '/serial/').get()
      .then((value: any) => { serialDocument = value.data() })
      .catch(err => { console.log(err)})
    );
  });
}

 private loadReferences() {
   return new Promise(resolve => {
     resolve(
       this.db.firestore.doc('/qrcodes/'+this.key).get()
       .then((references: any) => {
         this.clientPath = references.data().client;
         this.machinePath = references.data().machine
         this.historyPath = references.data().machine+'/history/'
      }).catch(err => {console.log(err)})
     );
   });
 }

 public async loadPageContent() {
   this.loadReferences()
   .then(
     () => {
        if(this.clientPath && this.machinePath){
          this.loadClient(this.clientPath);
          this.loadMachine(this.machinePath);
          this.loadHistory(this.historyPath);
          this.contentLoaded = true;
        }
      }
   )
   .catch(err => {
     console.log('Could\'t load content for key:', this.key, ' Got:', err)
     this.key = '';
     this.client = new Observable<Client>();
     this.machine = new Observable<Machine>();
     this.history = new Observable<Hist[]>();
     this.contentLoaded = false;
    });
 }

  public addHistoryPiece() { this.isHistory = true; }

  public saveHistory(): void {
    this.db.doc(this.historyPath).set(document.getElementById('historyPiece').innerText);
  }

}
