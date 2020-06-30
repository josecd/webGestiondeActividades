import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { globals } from './../../../utils/golbals';
import { Observable, Subscription } from 'rxjs';
import { AuthServiceService } from './../../../services/testeo/auth/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { RecuperarContrasenaComponent } from '../../../modals/recuperar-contrasena/recuperar-contrasena.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  error_messages = {
    correo: [
      { type: 'required', message: 'El correo es necesario' },
      { type: 'minLength', mesaage: 'El correo no cumple con los caracteres' },
      { type: 'maxLength', message: 'El correo tiene muchos caracteres' },
      { type: 'pattern', message: 'Ingresa un correo valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es necesaria' },
      { type: 'minLength', mesaage: 'Escriba una contraseña más larga' },
      { type: 'maxLength', message: 'La contraseña a pasado el limite de los caracteres' },
      { type: 'pattern', message: 'Ingresa una contraseña valida, (Un numero, una mayuscula y una miniscula)' }
    ],
  };
  adminObs$: Observable<any>;
  adminSub: Subscription;
  constructor(
    private auth: AuthServiceService,  
    public dialog: MatDialog,
    private router: Router,
    public formBuilder: FormBuilder,
    ) { 
    this.LoginForm();

    }

  ngOnInit(): void {
  }

  LoginForm() {
    this.loginForm = this.formBuilder.group(
      {
        contrasenia: new FormControl(
          '12345687' ,
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ])
        ),
        correo: new FormControl(
          'test@mail.com',
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


  async login(value) {
    this.auth.loginUser(value).then(
      data => {
          const user=  data
          globals.name = user.user.displayName;
          globals.udi = user.user.uid;
          globals.urlPerfil= user.user.photoURL;
          globals.estado = true;
           this.router.navigateByUrl('/inicio');
      }, err => {
        Swal.fire('Ojo', 'Usuario y/o contraseña incorrectos', 'warning');
        console.log(err);
      }).catch(
        err => {
          Swal.fire('Ops!', 'Al parecer ocurrió un error, intenta más tarde', 'error');
        }
      );
  }

  resetpass() {
    this.dialog.open(RecuperarContrasenaComponent, {
      maxWidth: '600px',
      disableClose: false,

    });
  }
}
