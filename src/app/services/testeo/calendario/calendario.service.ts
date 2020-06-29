import { globals } from './../../../utils/golbals';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import 'firebase/functions'
@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  uid=globals.udi
  adminRef: AngularFirestoreCollection<any>;
  adminDocRef: AngularFirestoreDocument;
  adminObs$: Observable<any>;
  constructor(
    private afs: AngularFirestore) 
    {

     }
  
  getCalendario(){
    return this.afs.collection('users').doc(this.uid).collection('tareas').valueChanges();
  }

  addEvento(data,form ) : Promise<any>{
    return new Promise(async (resolve, reject) => {
    const id =this.afs.createId();
    this.afs.collection("users").doc(this.uid).collection('tareas').doc(id).set({
      _id:id,
      name:form.name,
      title:form.title,
      materia: form.materia.nombreMateria,
      start:data.start,
      end:data.end,
      idMateria:form.materia._id,
      created_at: new Date(),
      updated_at: new Date(),
      status: true,
      isDeleted: false
    }).then(res=> resolve(res))
      .catch(error=> reject(error))
  });
  }

  updateEvent(id, data){
    this.afs.collection("calendario").doc(id).update({
      updated_at: new Date(),
      end:data
    })
  }
}
