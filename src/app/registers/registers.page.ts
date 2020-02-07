import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Client, Machine } from './interfaces.page'

@Component({
  selector: 'app-registers',
  templateUrl: 'registers.page.html',
  styleUrls: ['registers.page.scss']
})

export class Registers {
  private isClient: boolean;
  private isMachine: boolean;

  constructor(
    private db: AngularFirestore
    ) { }

  private insertMachine(docReference: string, document: Machine): void{
    let machineDocument: AngularFirestoreDocument<Machine>;

    machineDocument = this.db.doc<Machine>(docReference);
    machineDocument.set(document);
  }

  private insertClient(docReference: string, document: Client): void{
    let clientDocument: AngularFirestoreDocument<Client>

    clientDocument = this.db.doc<Client>(docReference);
    clientDocument.set(document);
  }

  public onSubmit(form: any): void{
    if(this.isClient) {
      this.insertClient('clients/davi', form.value);
      this.closeForms();
      return
    }
    if(this.isMachine) {
      this.insertMachine('machines/davi', form.value);
      this.closeForms();
      return
    }
    console.log('Cannot submit! No forms active!');
  }

  public displayClientForm(){ 
    !this.isMachine
    ? this.isClient = true
    : console.log('Machine form still active! Cannot display client form.');
  }

  public displayMachineForm(){
    !this.isClient
    ? this.isMachine = true
    : console.log('Client form still active! Cannot display machine form.');
  }

  public closeForms(){ this.isClient = false, this.isMachine = false; }

  public getClientState(): boolean { return this.isClient }

  public getMachineState(): boolean { return this.isMachine }
}
