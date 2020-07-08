import { globals } from './../../utils/golbals';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  uid=globals.udi

  calendarioRef: AngularFirestoreCollection<any>;
  calendarioDocRef: AngularFirestoreDocument;
  calendarioObs$: Observable<any>;

  
  constructor(
    private afs: AngularFirestore) 
  {  } 
  
  getTareas(){
    return this.afs.collection("users").doc(this.uid).collection('tareas',ref=>ref.where('isDeleted','==',false).orderBy('start','asc')).valueChanges();
  }

  getTareasByMateria(idMateria){
    return this.afs.collection("users").doc(this.uid).collection('tareas',ref=>ref.where('isDeleted','==',false).where('idMateria','==',idMateria).orderBy('start','asc')).valueChanges();
  } 

  addTarea(form): Promise<any>{
    return new Promise(async (resolve, reject) => {
      const idTarea = this.afs.createId();
      this.afs.collection("users").doc(this.uid).collection("tareas").doc(idTarea).set({
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
      this.afs.collection("users").doc(this.uid).collection("tareas").doc(idTarea).update({
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
      this.afs.collection("users").doc(this.uid).collection("tareas").doc(idTarea).update({
        isDeleted:true
      }).then(res=>{ 
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }
}
