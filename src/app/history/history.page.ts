import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client, Machine, History as Hist} from '../common/interfaces.page'

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})

export class History implements OnInit{
  //must poit to a path as: <clientName>/[machinesOwned]/<machineName>
  private key: string = 'cliente1/machinesOwned/maquina1';
  private client: Observable<Client>;
  private actualMachine: Observable<Machine>;
  private machines: Observable<Machine[]>;
  private history: Observable<Hist[]>

  constructor(private db: AngularFirestore) {
    this.history = db.collection<Hist>('/clients/'+this.key+'/history/')
    .valueChanges();
  }

  ngOnInit(){
    this.loadClient();
    this.loadMachine();
  }

  private loadClient(): void {
    const fbDocument: AngularFirestoreDocument<Client>
      = this.db.doc<Client>('/clients/'+this.destructKey().clientName);

    this.client = fbDocument.valueChanges();
  }

  private loadMachine(): void {
    const fbDocument: AngularFirestoreDocument<Machine>
      = this.db.doc<Machine>('/clients/'+this.key);

    this.actualMachine = fbDocument.valueChanges();
  }

  private destructKey(): any {
    return {
      clientName: this.key.substring(0, this.key.indexOf('/')),
      machineName: this.key.substring(this.key.lastIndexOf('/')+1
      ,this.key.length)
    }
  }

  addHistory():void {
  
  }

  public getClient(): Observable<Client> { return this.client }
  public getActualMachine(): Observable<Machine> { return this.actualMachine }
  public getMachines(): Observable<Machine[]> { return this.machines }
  public getHistory(): Observable<Hist[]> { return this.history }
  
}
