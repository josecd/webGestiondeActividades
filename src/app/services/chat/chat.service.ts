import { globals } from './../../utils/golbals';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  uid=globals.udi
  
  constructor(
    private afs: AngularFirestore) 
  {  } 
  
  getChats(){
    return this.afs.collection("chatRel",ref=> ref.where('chat1','==',this.uid)).valueChanges();
  }
}
