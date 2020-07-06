import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { AmigosService } from './../../services/amigos/amigos.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { element } from 'protractor';

@Component({
  selector: 'app-anadir-amigos',
  templateUrl: './anadir-amigos.component.html',
  styleUrls: ['./anadir-amigos.component.scss']
})
export class AnadirAmigosComponent implements OnInit {
  dataSource
  dataSource2
  stadoDeamigo
  formControl: FormGroup

  errorMessage: string = '';
  error_messages = {
    buscarAmigo: [
      { type: 'required', message: 'El dato es necesaria' },
      { type: 'minLength', mesaage: 'Escriba una ID valido' },
      { type: 'maxLength', message: 'La contraseña a pasado el limite de los caracteres' },
    ],
  };
  private unSubscribe$ = new Subject<void>();
  constructor(
    public dialogRef: MatDialogRef<AnadirAmigosComponent>,
    private _amigos: AmigosService,
    public formBuilder: FormBuilder,

  ) { }


  ngOnInit(): void {
    this.LoginForm()
    // this.getUser();
  }

  ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
  LoginForm() {
    this.formControl = this.formBuilder.group(
      {
        buscarAmigo: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(15),
          ])
        )
      },
    );
  }
  // getUser() {
  //   this._amigos.getUsuarios()
  //     .pipe(
  //       takeUntil(this.unSubscribe$)
  //     )
  //     .subscribe(users => {
  //       this.dataSource = users
  //       console.log(this.dataSource);
  //       console.log(this.dataSource2);


  //     })
  // }

  buscar() {
    this._amigos.getUsuario(this.formControl.value.buscarAmigo)
      .pipe(
        takeUntil(this.unSubscribe$)
      )
      .subscribe(users => {
        users.forEach(async (element: any) => {
          this._amigos.getAmigoExiste(element._id).then(res => {
            if (res=== undefined) {
              this.stadoDeamigo = false 
            }else if(res.status === true){
               this.stadoDeamigo = 'AGREGADO'
            }else if(res.status === false){
              this.stadoDeamigo = true

            }
          })
          this.dataSource = users
        });


      })
  }

  addAmigo(id) {
    Swal.fire({
      title: 'Agregando usuario.',
      html: '',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        this._amigos.agregarAmigo(id).then(res => {
          Swal.hideLoading();
          Swal.close();
          Swal.fire('Realizado', 'Espera la respuesta de tu amigo', 'success');
          this.close();
        }).catch(error => {
          Swal.fire('Ops!', 'Al parecer ocurrió un error, intenta más tarde', 'error');
          console.warn(error);
        })
      }
    })
  }

  close() {
    this.dialogRef.close();
  }
}
