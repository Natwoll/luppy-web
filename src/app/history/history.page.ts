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

  constructor(private db: AngularFirestore) {
  }

  private loadClient(docReference: string): void {
    this.client = this.db.doc<Client>(docReference).valueChanges()
  }

  private loadMachine(docReference: string): void {
    this.machine = this.db.doc<Machine>(docReference).valueChanges()
  }

  private loadHistory(collectionReference: string): void {
    this.history = this.db.collection<Hist>(collectionReference).valueChanges()
  }

  private loadReferences() {
    return new Promise(resolve => {
      resolve(
        this.db.firestore.doc('qrcodes/'+this.key).get()
        .then(references => {console.log('aaaa:', references)})
        .catch(err => {console.log(err)})
      );
    });
  }

  public async loadPageContent() {
    let references: any;
    await this.loadReferences()
    .then((value: {client: string, machine: string}) => { references = value; console.log(value.client) })
    .catch(err => { console.log(err) })
    
    console.log(references.client)
    //this.loadClient(references.client);
  }

  public loadPage() {
    this.loadPageContent();
  }

}
