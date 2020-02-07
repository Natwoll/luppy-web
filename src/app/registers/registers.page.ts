import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Client, Machine } from '../common/interfaces.page'

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
      const path = '/clients/' + form.value.name + '_' + form.value.address
      this.insertClient(path.toLowerCase(), form.value);
      this.closeForms();
      return
    }
    if(this.isMachine) {
      const path = '/machines/' + form.value.brand + '_' + form.value.model + '_' + form.value.capacity
      this.insertMachine(path, form.value);
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
