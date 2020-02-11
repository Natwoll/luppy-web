import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Client, Machine, QrCode, Serial } from '../common/interfaces.page'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  private isClient: boolean;
  private isMachine: boolean;
  private isQrCode: boolean;
  private clientSerial: Serial;
  private machineSerial: Serial;

  public machineSelection: Observable<Machine[]>;
  public clientSelection: Observable<Client[]>

  ngOnInit(){
    this.queryIndexOnDocuments('/clients/', 'name', 'davi souza')
  }

  constructor(private db: AngularFirestore) {
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

  private async queryIndexOnDocuments(collectionReference: string, field: string, value: any) {
    return new Promise(resolve => {
    resolve(this.db.firestore.collection(collectionReference)
    .where(field, '==', value).get()
    .then(
      (fbDocument) => { return fbDocument.docs.shift().id }
    )
    .catch(err => { console.log('Could not query on collection:', collectionReference, ' got:', err) }))
    })
  }

  private setSerialDocumentIndexes(
    docRefered: 'client' | 'machine',
    serialDoc: {initials: string, times: number}) {
      const msg = 'Error tring to set the serial document for clients or machines!';
      if(docRefered === 'client'){
        this.db.firestore.doc('/serial/clients/').set({initials: serialDoc.initials, times: serialDoc.times})
        .then(() => { return true }).catch(e => {console.log(msg, e)})
      }
      if(docRefered === 'machine'){
        this.db.firestore.doc('/serial/machines/').set({initials: serialDoc.initials, times: serialDoc.times})
        .then(() => { return true }).catch(e => {console.log(msg, e)})
      }
  }

  private async getSerialDocumentIndexes(docRefered: 'client' | 'machine') {
    const msg = 'Error tring to get the serial document for clients or machines!'
    if(docRefered === 'client'){
      return this.db.firestore.doc('serial/clients').get()
      .then(data => { return data.data() }).catch(e => {console.log(msg, e)})
    }
    if(docRefered === 'machine'){
      return this.db.firestore.doc('serial/machines').get()
      .then(data => { return data.data() }).catch(e => {console.log(msg, e)})
    }
  }

  public onSubmit(form: any): void{
    if(this.isClient){
      if(form.value.name) {
        this.getSerialDocumentIndexes('client')
        .then((clientSerial: any) => {
          const path = '/clients/' + clientSerial.initials + clientSerial.times;
          this.insertClient(path, form.value);
          this.setSerialDocumentIndexes('client', {
            initials: clientSerial.initials,
            times: clientSerial.times+1 })
          this.closeForms();
          return
        });
      } else { alert('Para prosseguir é necessário preencher o campo: Nome!') }
    }
    if(this.isMachine) {
      if(form.value.identifier){
        this.getSerialDocumentIndexes('machine')
        .then((machineSerial: any) => {
          const path = '/machines/' + machineSerial.initials + machineSerial.times;
          this.insertMachine(path, form.value);
          this.setSerialDocumentIndexes('machine', {
            initials: machineSerial.initials,
            times: machineSerial.times+1 })
          this.closeForms();
          return
        });
      } else { alert('Para prosseguir é necessário preencher o campo: Identificador!') }
    }
    if(this.isQrCode){
      if(form.value.client && form.value.machine && form.value.qrcode){
        let clientPromise = this.queryIndexOnDocuments('clients/', 'name', form.value.client)
        let machinePromise = this.queryIndexOnDocuments('machines/', 'identifier', form.value.machine)
        let clientPath: string;
        let machinePath: string;

        Promise.all([clientPromise, machinePromise])
        .then((values) => {
          clientPath = 'clients/' + values[0];
          machinePath = clientPath + '/machinesOwned/' + values[1];

          this.insertQrCode('qrcodes/' + form.value.qrcode, {
            client: clientPath,
            machine: machinePath,
          })
        }).catch(err => { console.log(err)});
      } else { 
        alert('Para prosseguir é necessário preencher todos os campos!')
      }
    }
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

  public getFormState(): boolean { return this.isClient || this.isMachine || this.isQrCode }
}

