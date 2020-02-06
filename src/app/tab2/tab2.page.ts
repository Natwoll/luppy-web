import { Component, Query } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, pipe } from 'rxjs';

import {NgForm} from '@angular/forms';

export interface Client {
  name: string;
  address: string;
  street: string;
  number: number;
  machine: string;
}

export interface Machine {
  brand: string;
  category: string;
  capacity: string;
  kind: string;
  model: string;
  location: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  
  isClient: boolean;
  isMachine: boolean;

  clientDoc: AngularFirestoreDocument<Client>;
  clientObservable: Observable<Client>;

  machines: Observable<any[]>;
  machineObservable: Observable<Machine>;
  machineDocument: AngularFirestoreDocument<Machine>;

  clientForm = {
    name: '',
    address: '',
    street: '',
    number: 0,
    machine: '',
  }

  machineForm = {
    brand: '',
    category: '',
    capacity: '',
    kind: '',
    model: '',
    location: '',
  };
  

  constructor(db: AngularFirestore) {
    this.machines = db.collection('machines').valueChanges();
    
    this.clientDoc = db.doc<Client>('/clients/cliente2');
    this.clientObservable = this.clientDoc.valueChanges().pipe(data => {return data});

    this.machineDocument = db.doc<Machine>('/machines/machine2');
    this.machineObservable = this.machineDocument.valueChanges().pipe(data => {return data});
  }

  registerClient() {
    this.isClient = true;
  }

  registerMachine() {
    this.isMachine = true;
  }

  completeRegistration(){
    if(this.isClient && this.isMachine){
      console.log('Error: client and machine form are both active! Only one can be used at the time.');
    } else {
      if(this.isClient){
        this.clientDoc.set({
          name: this.clientForm.name,
          address: this.clientForm.address,
          street: this.clientForm.street,
          number: this.clientForm.number,
          machine: this.clientForm.machine
        });

      } else {
        this.machineDocument.set({
          brand: this.machineForm.brand,
          category: this.machineForm.category,
          capacity: this.machineForm.capacity,
          kind: this.machineForm.kind,
          model: this.machineForm.model,
          location: this.machineForm.location,
        });
      }
    }

    this.isClient = false;
    this.isMachine = false;
  }

}
