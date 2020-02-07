import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client, Machine } from '../common/interfaces.page'

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})
export class History {
  clientDocument: AngularFirestoreDocument<Client>;
  client: Observable<Client>;
  machineDocument: AngularFirestoreDocument<Machine>;
  machine: Observable<Machine>;
  machineHistory: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.machineHistory = db.collection('clients/cliente1/machinesOwned/maquina1/history')
    .valueChanges();

    this.clientDocument = db.doc<Client>('/clients/cliente1/');
    this.client = this.clientDocument.valueChanges();

    this.machineDocument = db.doc<Machine>('/clients/cliente1/');
    this.machine = this.machineDocument.valueChanges();
  }



  addHistory():void {
  }
  
}
