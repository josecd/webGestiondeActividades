import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent implements OnInit {

  error_messages = {
    email: [
      { type: 'required', message: 'El correo es necesario' },
      { type: 'minLength', mesaage: 'El correo no cumple con los caracteres' },
      { type: 'maxLength', message: 'El correo tiene muchos caracteres' },
      { type: 'pattern', message: 'Ingresa un correo valido' }
    ]
  };
  email
  resertPasswordForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<RecuperarContrasenaComponent>,
    private afAuth: AngularFireAuth,
    public formBuilder: FormBuilder,

  ) {
    this.resertPasswordForm = this.formBuilder.group(
      {
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
          ])
        ),
      },
    );
  }

  ngOnInit(): void {
  }


  close() {
    this.dialogRef.close();
  }
  resetPassword(): Promise<void> {

    return this.afAuth.sendPasswordResetEmail(this.email)
      .then(resr => {
        this.close()
        Swal.fire({
          icon: 'success',
          title: 'Revisa tu correo electrónico',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(error => {

      })
  }

}
