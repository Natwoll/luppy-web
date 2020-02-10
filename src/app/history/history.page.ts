import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client, Machine, History as Hist} from '../common/interfaces.page'
import { getFormatedDay, serializeDocument } from '../common/functions'

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})

export class History  {
  //Variaveis expostas externamente
  public key: string;
  public client: Observable<Client>;
  public machine: Observable<Machine>;
  public history: Observable<Hist[]>;

  public teste: string;

  constructor(private db: AngularFirestore) {
  }

  private loadClient(docReference: string): void {
    this.client = this.db.doc<Client>(docReference).valueChanges()
  }

  private loadMachine(docReference: string): void {
    this.client
    ? this.machine = this.db.doc<Machine>(docReference).valueChanges()
    : console.log('Could not load the specified machine: Client ins\'t!');
  }

  private loadHistory(collectionReference: string): void {
    this.machine
    ? this.history = this.db.collection<Hist>(collectionReference).valueChanges()
    : console.log('Could not load any history: Machine ins\'t loaded!');
  }

  private async loadReferences() {
    return new Promise((resolve, reject) => {

      if(this.key !== null || this.key.indexOf('/') === 0) {
        resolve(
          this.db.firestore.doc('/qrcodes/' + this.key).get()
          .then(data => { return data.data() })
          .catch(
            err => { 
              console.log('Could not load the proper references for key: ', this.key, err)
              return null
          })
        );
      } else { reject('error: the specified code key is empty or contains: /'); }
    });
  }

  public loadPageContent() {
    this.loadReferences()
    .then(
      (data: any) => {
        this.loadClient(data.client)
        this.loadMachine(data.machine)
        this.loadHistory(data.machine + 'history')
      })
    .catch(
      err => {
        console.log(err)
    });
  }
}
