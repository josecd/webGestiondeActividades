import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  calendarioRef: AngularFirestoreCollection<any>;
  calendarioDocRef: AngularFirestoreDocument;
  calendarioObs$: Observable<any>;

  
  constructor(
    private afs: AngularFirestore) 
  {  } DveBPSLzCGUTZKF6g6xt
  
  getTareas(){
    return this.afs.collection("users").doc('DveBPSLzCGUTZKF6g6xt').collection('tareas',ref=>ref.where('status','==',true)).valueChanges();
  }

  addTarea(form): Promise<any>{
    return new Promise(async (resolve, reject) => {
      const idTarea = this.afs.createId();
      this.afs.collection("users").doc('DveBPSLzCGUTZKF6g6xt').collection("tareas").doc(idTarea).set({
        _id:idTarea,
        nombreTarea:form.nombreTarea,
        nombreMaestro:form.nombreMaestro,
        created_at: new Date(),
        updated_at: new Date(),
        status: true,
      }).then(res=>{ 
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }

  updateTarea(idTarea,form): Promise<any>{
    return new Promise(async (resolve, reject) => {
      this.afs.collection("users").doc('DveBPSLzCGUTZKF6g6xt').collection("tareas").doc(idTarea).update({
        nombreTarea:form.nombreTarea,
        nombreMaestro:form.nombreMaestro,
        updated_at: new Date(),
      }).then(res=>{ 
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }
  deleteTarea(idTarea): Promise<any>{
    return new Promise(async (resolve, reject) => {
      this.afs.collection("users").doc('DveBPSLzCGUTZKF6g6xt').collection("tareas").doc(idTarea).update({
        status:false
      }).then(res=>{ 
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }
}
