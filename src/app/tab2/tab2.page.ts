import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  
  isClient: boolean;
  isMachine: boolean;

  machines: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.machines = db.collection('machines').valueChanges();
  }


  registerClient() {
    this.isClient = true;
  }

  registerMachine() {
    this.isMachine = true;
  }

  completeRegistration(){
    this.isClient = false;
    this.isMachine = false;
  }

}
