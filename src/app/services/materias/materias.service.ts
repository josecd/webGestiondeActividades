import { globals } from './../../utils/golbals';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  uid=globals.udi

  calendarioRef: AngularFirestoreCollection<any>;
  calendarioDocRef: AngularFirestoreDocument;
  calendarioObs$: Observable<any>;
  constructor(
    private afs: AngularFirestore) 
    {

     }DveBPSLzCGUTZKF6g6xt

  // getMaterias(id){
  //   return this.afs.collection("users").doc(id).collection('materias',ref=>ref.where('status','==',true)).valueChanges();
  // }
  getMaterias(){
    return this.afs.collection("users").doc(this.uid).collection('materias',ref=>ref.where('status','==',true)).valueChanges();
  }

  getMateriasAmigo(id){
    return this.afs.collection("users").doc(id).collection('materias',ref=>ref.where('status','==',true)).valueChanges();
  }

  addMateria(form): Promise<any>{
    return new Promise(async (resolve, reject) => {
      const idMateria = this.afs.createId();
      this.afs.collection("users").doc(this.uid).collection("materias").doc(idMateria).set({
        _id:idMateria,
        nombreMateria:form.nombreMateria,
        nombreMaestro:form.nombreMaestro,
        nombreCorreo:form.nombreCorreo,
        nombreLink:form.nombreLink,
        otroLink:form.otroLink,
        created_at: new Date(),
        updated_at: new Date(),
        status: true,
        isDeleted: false
      }).then(res=>{ 
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }

  copyMateria(form): Promise<any>{
    return new Promise(async (resolve, reject) => {
      const idMateria = this.afs.createId();
      this.afs.collection("users").doc(this.uid).collection("materias").doc(idMateria).set({
        _id:idMateria,
        nombreMateria:form.nombreMateria,
        nombreMaestro:form.nombreMaestro,
        nombreCorreo:form.nombreCorreo,
        nombreLink:form.nombreLink,
        otroLink:form.otroLink,
        created_at: new Date(),
        updated_at: new Date(),
        status: true,
        isDeleted: false
      }).then(res=>{ 
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }
  updateMateria(idMateria,form): Promise<any>{
    return new Promise(async (resolve, reject) => {
      this.afs.collection("users").doc(this.uid).collection("materias").doc(idMateria).update({
        nombreMateria:form.nombreMateria,
        nombreMaestro:form.nombreMaestro,
        nombreCorreo:form.nombreCorreo,
        nombreLink:form.nombreLink,
        otroLink:form.otroLink,
        updated_at: new Date(),
      }).then(res=>{ 
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }
  deleteMateria(idMateria): Promise<any>{
    return new Promise(async (resolve, reject) => {
      this.afs.collection("users").doc(this.uid).collection("materias").doc(idMateria).update({
        status:false
      }).then(res=>{ 
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }
}
