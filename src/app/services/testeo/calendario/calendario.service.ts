import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import 'firebase/functions'
@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  adminRef: AngularFirestoreCollection<any>;
  adminDocRef: AngularFirestoreDocument;
  adminObs$: Observable<any>;
  constructor(
    private afs: AngularFirestore) 
    {

     }
  
  getCalendario(){
    return this.afs.collection('calendario').valueChanges();
  }

  addEvento(data){
    const id =this.afs.createId();
    this.afs.collection("calendario").add({
      id:id,
      name:"Test",
      title:"Testeo",
      start:data.start,
      end:data.end
    })
  }

  updateEvent(id, data){
    this.afs.collection("calendario").doc(id).update({
      end:data
    })
  }
}
