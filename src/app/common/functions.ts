
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

export function serializeDocument (
  level:'root'|'client',
  subLevel?:'machine'|'history',
  clientName?: string
): string {

  let db: AngularFirestore;
  let fbDocument: AngularFirestoreDocument;

  return '0'
}


export function getFormatedDay(slash: boolean): string {
  const today: Date = new Date;
  let day: string = today.getDate().toString();
  let month: string = today.getMonth().toString();
  const year: string = today.getFullYear().toString();

  day.length == 1 ?
  day = '0' + today.getDate() : day = today.getDate().toString()
  
  month.length == 1 ?
  month = '0' + today.getDate() : month = today.getDate().toString()
  
  if(slash) {
    return day + '/' + month + '/' + year
  } else {
    return day + '-' + month + '-' + year
  }
}