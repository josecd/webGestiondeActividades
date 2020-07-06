import { returnDocumentsWithId } from './../../components/helpers/returnDocuments.helper';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { globals } from './../../utils/golbals';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AmigosService {
  uid = globals.udi

  calendarioRef: AngularFirestoreCollection<any>;
  calendarioDocRef: AngularFirestoreDocument;
  calendarioObs$: Observable<any>; x

  constructor(
    private afs: AngularFirestore
  ) { }

  getUsuarios() {
    return this.afs.collection("users").valueChanges();
  }
  getUsuario(codigoUsuario) {
    return this.afs.collection("users", ref => ref.where('codigoUsuario', '==', codigoUsuario)).valueChanges();
  }
  // getUsuarios(){
  //   return this.afs.collection("users").doc(this.uid).collection('materias',ref=>ref.where('status','==',true)).valueChanges();
  // }

  getUsuarioPorID(id) {
    return this.afs.collection("users").doc(id).valueChanges();
  }

  getAmigos() {
    return this.afs.collection("users").doc(this.uid).collection('amigos', ref => ref.where('isDeleted', '==', false)).valueChanges();
  }
  getAmigoExiste(id): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.afs.collection("users").doc(this.uid).collection('amigos').ref.where('idAmigo', '==', id).get().then(returnDocumentsWithId).then(res => {
        resolve(res[0])
      })
    })


  }

  agregarAmigo(idAmigo): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const idNuevoAmigo = this.afs.createId();
      const idNuevoAmigo2 = this.afs.createId();
      this.afs.collection("users").doc(this.uid).collection("amigos").doc(idNuevoAmigo).set({
        _id: idNuevoAmigo,
        idAmigo: idAmigo,
        created_at: new Date(),
        updated_at: new Date(),
        status: false,
        isDeleted: false,
        tipo: "MANDA"
      }).then(res => {
        this.afs.collection("users").doc(idAmigo).collection("amigos").doc(idNuevoAmigo2).set({
          _id: idNuevoAmigo2,
          idAmigo: this.uid,
          created_at: new Date(),
          updated_at: new Date(),
          status: false,
          isDeleted: false,
          tipo: "RECIBE"
        }).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      }).catch(error => {
        reject(error)
      })
    })
  }

  aceptarAmigo(idMicoleccion, idAmigo): Promise<any> {
    return new Promise(async (resolve, reject) => {

      this.afs.collection("users").doc(this.uid).collection("amigos").doc(idMicoleccion).update({
        updated_at: new Date(),
        status: true,
      }).then(res => {
        const l = this.afs.collection("users").doc(idAmigo).collection("amigos").ref.where('idAmigo', '==', this.uid).get().then(returnDocumentsWithId).then(res => {
          let usuario = res[0];
          this.afs.collection("users").doc(idAmigo).collection("amigos").doc(usuario._id).update({
            updated_at: new Date(),
            status: true,
          })
        }).catch(error => reject(error))
      }).catch(error => {
        reject(error)
      })
    })
  }


  eleminarrAmigo(idMicoleccion, idAmigo): Promise<any> {
    return new Promise(async (resolve, reject) => {

      this.afs.collection("users").doc(this.uid).collection("amigos").doc(idMicoleccion).delete().then(res => {
        const l = this.afs.collection("users").doc(idAmigo).collection("amigos").ref.where('idAmigo', '==', this.uid).get().then(returnDocumentsWithId).then(res => {
          let usuario = res[0];
          this.afs.collection("users").doc(idAmigo).collection("amigos").doc(usuario._id).delete().then(res => {
            resolve(res)
          })
        }).catch(error => reject(error))
      }).catch(error => {
        reject(error)
      })
    })
  }
}
