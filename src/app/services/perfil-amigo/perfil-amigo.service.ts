import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { globals } from '../../utils/golbals';

@Injectable({
  providedIn: 'root'
})
export class PerfilAmigoService {

  uid = globals.udi

  constructor(
    private afs: AngularFirestore
    ) { }

  getAmigos() {
    return this.afs.collection("users").doc(this.uid).collection('amigos', ref => ref.where('isDeleted', '==', false)).valueChanges();
  }

  getUsuarioPorID(id) {
    return this.afs.collection("users").doc(id).valueChanges();
  }

}
