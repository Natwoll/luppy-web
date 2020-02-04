import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  private machines: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.machines = db.collection('machines').valueChanges();
  }

}
