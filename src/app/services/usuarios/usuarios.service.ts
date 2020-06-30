import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions'
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(

  )
   { }

  

   addNewUser(user): Promise<any> {
    return new Promise((resolve, reject) => {
      var message = firebase.functions().httpsCallable('add')
      message({ text: user.value }).then(result => {
        var sanitizedMessage = result;
        if (sanitizedMessage.data.success) {
          // this.toaster.showToast('top-right', "success", "Usuario agregado");
        } else if (sanitizedMessage.data.error) {
          if (sanitizedMessage.data.error = 'The email address is already in use by another account.') {
            // this.toaster.showToast('top-right', "warning", "La dirección de correo electrónico ya está en uso por otra cuenta.");

          } else if (sanitizedMessage.data.error = 'The email address is already in use by another account.') {
          }
        }
        resolve(result)
      }, err => {
        reject(err)
      }).catch(err => {
      });
    })

  }
}
