import { returnDocumentsWithId } from './../../components/helpers/returnDocuments.helper';
import { globals } from './../../utils/golbals';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  uid = globals.udi
  constructor(
    private afs: AngularFirestore,
  ) { }

  subirHorario(horarioLink): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let id = this.afs.createId()
      this.afs.collection('users').doc(this.uid).collection('horario').doc(id).set({
        _id: id,
        created_at: new Date(),
        updated_at: new Date(),
        status: true,
        link: horarioLink
      }).then(res=>{
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }

  getHorarioExiste(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.afs.collection("users").doc(this.uid).collection('horario').ref.where('status', '==', true).get().then(returnDocumentsWithId).then(res => {
        resolve(res[0])
      })
    })
  }
  eliminaHorario(id): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.afs.collection("users").doc(this.uid).collection('horario').doc(id).delete().then(res=>{
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }

}
