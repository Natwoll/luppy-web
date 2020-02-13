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
 public ownMachine: Observable<any>;
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
   this.ownMachine = this.db.doc(docReference).valueChanges()
 }

 private loadHistory(collectionReference: string): void {
   this.history = this.db.collection<Hist>(collectionReference, ref => ref.where('content', '>', '0'))
   .valueChanges()
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

  public saveHistory() {
    const today = new Date;
    const dateStr = today.getDate()  + '-' + today.getMonth() + '-' + today.getFullYear()
    const historyContent = document.getElementById('historyPiece')

    this.db.firestore.doc(this.historyPath+'serial').get()
    .then((serial: any) => {

      this.db.firestore.doc(this.historyPath + dateStr + serial.data().times)
      .set({date: dateStr, content: historyContent.innerText});

      this.db.firestore.doc(this.historyPath+'serial').set({date: dateStr, times: Number(serial.data().times+1)})
    })
    .catch(err => { console.log('asdasdaasds'+err) })


    this.isHistory = false;
  }

  public showHistoryForm() { this.isHistory = true; }

  public closeHistoryForm() { this.isHistory = false; }

}
