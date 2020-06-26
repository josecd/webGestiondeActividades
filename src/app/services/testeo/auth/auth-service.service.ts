import { globals } from './../../../utils/golbals';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from "firebase/app";




@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  confirmationResult: any;
  private COLLECTION_END = 'users';
  userEmpty = {
    _id: '',
    name: '',
    phoneNumber: '',
    created_at: null,
    isDeleted: false,
    role: "USER_ROLE",
    status: "INACTIVE",
    updated_at: null,
    address: ''
  };
  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
  ) { }

  loginUser(value): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(res => {

            })

            resolve(res);
          },
          err => reject(err)
        );
    });
  }


  logOut() {
    globals.estado = false

    return this.auth.signOut().then(res => {
      globals.estado = false

    })
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }



}
