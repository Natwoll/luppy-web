import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Client {
  address: string;
  name: string;
  number: string;
}

export interface Machine {
  title: string;
}

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})
export class History {
  qrcod: string; //deve buscar na colection -qrcodes- a referencia do cliente e maquina para puxar historico
  clientDocument: AngularFirestoreDocument<Client>;
  client: Observable<Client>;
  machineDocument: AngularFirestoreDocument<Machine>;
  machine: Observable<Machine>;
  machineHistory: Observable<any[]>;

  constructor(db: AngularFirestore) {
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
