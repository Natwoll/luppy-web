import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Client, Machine, QrCode } from '../common/interfaces.page'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registers',
  templateUrl: 'registers.page.html',
  styleUrls: ['registers.page.scss']
})

export class Registers {
  private isClient: boolean;
  private isMachine: boolean;
  private isQrCode: boolean;
  public machineSelection: Observable<Machine[]>;
  public clientSelection: Observable<Client[]>

  constructor(
    private db: AngularFirestore
    ) {
      this.machineSelection = this.db.collection<Machine>('/machines/').valueChanges();
      this.clientSelection = this.db.collection<Client>('/clients/').valueChanges();
    }

  private insertMachine(docReference: string, fbDocument: Machine): void{
    let machineDocument: AngularFirestoreDocument<Machine>;

    machineDocument = this.db.doc<Machine>(docReference);
    machineDocument.set(fbDocument);
  }

  private insertClient(docReference: string, fbDocument: Client): void{
    let clientDocument: AngularFirestoreDocument<Client>;

    clientDocument = this.db.doc<Client>(docReference);
    clientDocument.set(fbDocument);
  }

  private insertQrCode(docReference: string, fbDocument: QrCode): void{
    let qrcodeDocument: AngularFirestoreDocument<QrCode>;

    qrcodeDocument = this.db.doc<QrCode>(docReference);
    qrcodeDocument.set(fbDocument);
  }

  private serializeClient(): void {
    
  }

  private async serializeMachine() {

  }

  public onSubmit(form: any): void{
    if(this.isClient) {
      const path = '/clients/' + form.value.name
      this.insertClient(path.toLowerCase(), form.value);
      this.closeForms();
      return
    }
    if(this.isMachine) {
      this.serializeMachine()
      .then((machineSerial: any) => {
        const path = '/machines/' + machineSerial.initials + machineSerial.times;
        this.insertMachine(path.toLowerCase(), form.value);
        this.closeForms();
        return
      });
    }
    if(this.isQrCode){
      const path = '/qrcodes/' + form.value.qrcode
      const clientPath = '/clients/' + form.value.client + '/'
      const machinePath = '/' + form.value.machine + '/'
      this.insertQrCode(path.toLowerCase(), { client: clientPath, machine: machinePath });
      this.closeForms();
      return
    }
    console.log('Cannot submit! No forms active!');
  }

  public displayClientForm(){ 
    !this.isMachine
    ? this.isClient = true
    : console.log('Machine or QrCode forms still active! Cannot display client form.');
  }

  public displayQrCodeForm() {
    !this.isQrCode
    ? this.isQrCode = true
    : console.log('Machine or Client forms still active! Cannot display QrCode form.');
  }

  public displayMachineForm(){
    !this.isClient
    ? this.isMachine = true
    : console.log('Client or QrCode forms still active! Cannot display machine form.');
  }

  public closeForms(){ this.isClient = false, this.isMachine = false; this.isQrCode = false; }

  public getClientState(): boolean { return this.isClient }

  public getQrCodeState(): boolean { return this.isQrCode }

  public getMachineState(): boolean { return this.isMachine }
}
