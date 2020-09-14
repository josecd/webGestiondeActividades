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
  
  getAmigos(){
    return this.afs.collection("users").doc(this.uid).collection('amigos',ref=>ref.where('isDeleted','==',false).where('status','==',true)).valueChanges();
  }
  getMaterias(){
    return this.afs.collection("users").doc(this.uid).collection('materias',ref=>ref.where('isDeleted','==',false).where('status','==',true)).valueChanges();
  }
  getTareasAmigo(id){
    return this.afs.collection("users").doc(id).collection('tareas',ref=>ref.where('isDeleted','==',false).where('status','==',true).orderBy('start','asc')).valueChanges();
  }

  getTareasAmigoHistorial(id){
    return this.afs.collection("users").doc(id).collection('tareas',ref=>ref.where('isDeleted','==',false).where('status','==',false).orderBy('start','asc')).valueChanges();
  }


  getTareas(){
    return this.afs.collection("users").doc(this.uid).collection('tareas',ref=>ref.where('isDeleted','==',false).orderBy('start','asc')).valueChanges();
  }

  getTareasStatusTrue(){
    return this.afs.collection("users").doc(this.uid).collection('tareas',ref=>ref.where('isDeleted','==',false).where('status','==',true).orderBy('start','asc')).valueChanges();
  }
  getTareasStatusFalse(){
    return this.afs.collection("users").doc(this.uid).collection('tareas',ref=>ref.where('isDeleted','==',false).where('status','==',false).orderBy('start','asc')).valueChanges();
  }

  getTareasByMateria(idMateria){
    return this.afs.collection("users").doc(this.uid).collection('tareas',ref=>ref.where('isDeleted','==',false).where('materia','==',idMateria).orderBy('start','asc')).valueChanges();
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
        title:form.nombreTarea,
        name:form.nombreMaestro,
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
  desactivarTarea(idTarea): Promise<any>{
    return new Promise(async (resolve, reject) => {
      this.afs.collection("users").doc(this.uid).collection("tareas").doc(idTarea).update({
        status:false
      }).then(res=>{ 
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }

  activarTarea(idTarea): Promise<any>{
    return new Promise(async (resolve, reject) => {
      this.afs.collection("users").doc(this.uid).collection("tareas").doc(idTarea).update({
        status:true
      }).then(res=>{ 
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }

  copyEvento(data) : Promise<any>{
    return new Promise(async (resolve, reject) => {
    const id =this.afs.createId();
    this.afs.collection("users").doc(this.uid).collection('tareas').doc(id).set({
      _id:id,
      name:data.name,
      title:data.title,
      materia: data.materia,
      start:data.start,
      end:data.end,
      // idMateria:data.materia._id,
      created_at: new Date(),
      updated_at: new Date(),
      status: true,
      isDeleted: false
    }).then(res=> resolve(res))
      .catch(error=> reject(error))
  });
  }
}
