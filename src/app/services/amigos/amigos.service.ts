import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { globals } from './../../utils/golbals';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AmigosService {
  uid=globals.udi

  calendarioRef: AngularFirestoreCollection<any>;
  calendarioDocRef: AngularFirestoreDocument;
  calendarioObs$: Observable<any>;x

  constructor(
    private afs: AngularFirestore
  ) { }

  // getUsuarios(){
  //   return this.afs.collection("users").doc(this.uid).collection('materias',ref=>ref.where('status','==',true)).valueChanges();
  // }

  // getUsuarios(){
  //   return this.afs.collection("users").doc(this.uid).collection('materias',ref=>ref.where('status','==',true)).valueChanges();
  // }

  getUsuarioPorID(id){
    return this.afs.collection("users").doc(id).valueChanges();
  }
  agregarAmigo(form): Promise<any>{
    return new Promise(async (resolve, reject) => {
      const idNuevoAmigo = this.afs.createId();
      this.afs.collection("users").doc(this.uid).collection("amigos").doc(idNuevoAmigo).set({
        _id:idNuevoAmigo,
        idAmigo: form.idAmigos,
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

}
 