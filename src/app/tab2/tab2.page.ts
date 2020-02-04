import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { 
/*  name: string;
  age: number;*/
  machineId: number;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private client: AngularFirestoreDocument<Item>;
  private machines: Observable<any[]>; //transformar em interface

  private fields = {
    name: 'teste',
    age: 0,
  };

  private machineId: number;

  private clientForm = {name: this.fields.name, age: this.fields.age, machineId: this.machineId};

  constructor(private db: AngularFirestore) {
    this.machines = db.collection('machines/').valueChanges();
    this.client = db.doc<Item>('clients/a');
  }

  private registerClient(){
      this.client.update({machineId: this.machineId});
  }
}
