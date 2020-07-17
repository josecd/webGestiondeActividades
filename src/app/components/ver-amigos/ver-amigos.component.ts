import { PerfilAmigoComponent } from './../../modals/perfil-amigo/perfil-amigo.component';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { AmigosService } from './../../services/amigos/amigos.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-amigos',
  templateUrl: './ver-amigos.component.html',
  styleUrls: ['./ver-amigos.component.scss']
})
export class VerAmigosComponent implements OnInit {

  private unSubscribe$ = new Subject<void>();
  dataSource
  constructor(
    private _amigos: AmigosService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAmigos();
  }

  ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  getAmigos() {
    this._amigos.getAmigos()
      .pipe(
        takeUntil(this.unSubscribe$)
      )
      .subscribe(users => {
        this.dataSource = []
        users.forEach(async element => {
          this._amigos.getUsuarioPorID(element.idAmigo).pipe(
            takeUntil(this.unSubscribe$)
          )
            .subscribe((userss: any) => {
              let data = userss;
              if (element.idAmigo === data._id) {
                element.nombreUsuario = data.nombre
                element.codigoUsuario = userss.codigoUsuario
              }
            })
        });
        this.dataSource = users
      })
  }
  eliminarTarea(idAmigo) {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: "¡No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._amigos.eleminarrAmigo(idAmigo._id, idAmigo.idAmigo).then(res => {
          Swal.fire(
            'Eliminado!',
            'Tu amigo ha sido eliminado',
            'success'
          )
        })
          .catch(error => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'error'
            )
          })
      }
    })
  }
  aceptarAmigo(idAmigo) {
    console.log('dd');
    console.log(idAmigo);

    this._amigos.aceptarAmigo(idAmigo._id, idAmigo.idAmigo)
      .then(res => {
        Swal.fire(
          'Agregado!',
          'Amigo agregado',
          'success'
        )

      }).catch(erros => {
        console.warn(erros);

      })
  }

  verPerfil(data) {
    this.dialog.open(PerfilAmigoComponent, {
      // width: "500px"
      data: data
    })
  }
}
