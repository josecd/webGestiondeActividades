import { UsuariosService } from './../../../services/usuarios/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private _usuario: UsuariosService
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }
  loadForm() {
    this.registerForm = this.formBuilder.group(
      {
        contrasena: new FormControl(
          '12345687',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ])
        ),
        correo: new FormControl(
          'jose@mail.com',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
          ])
        ),
        nombre: new FormControl(
          'jose',
          Validators.compose([
            Validators.required,
          ])
        ),
        urlPerfil: new FormControl(
          'https://firebasestorage.googleapis.com/v0/b/appagendajc.appspot.com/o/user.png?alt=media&token=b703fb9a-957b-426f-9ce4-71311d486c6a',
          Validators.compose([
            Validators.required,
          ])
        ),
      },
    );
  }
  async registro() {
    Swal.fire({
      title: 'Creando usuario.',
      html: '',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
          this._usuario.addNewUser(this.registerForm.value).then(res => {
          Swal.hideLoading();
          Swal.close();
          this.router.navigate(['/entrar']);
          // this.close();
        }).catch(error=>{
          console.warn(error);
          
        })
      }
    })
  }

}
