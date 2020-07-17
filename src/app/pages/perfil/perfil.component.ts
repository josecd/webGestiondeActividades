import { AnadirAmigosComponent } from './../../modals/anadir-amigos/anadir-amigos.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { PerfilAmigoService } from './../../services/perfil-amigo/perfil-amigo.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { id } from 'date-fns/locale';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  private unSubscribe$ = new Subject<void>();
  dataUser
  id
  tareasPendientes
  constructor(
    private _perfil: PerfilAmigoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,

  ) {
    this.id = this.route.snapshot.paramMap.get("id");

  }

  ngOnInit(): void {
    this.getPerfil();
    this.getTareasPendiente();
  }

  ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  copyToClipboard(element) {
    element.select();
    document.execCommand('copy');
    // this.toaster('success', 'Success!', 'Link copied to clipboard.');
  }
  getPerfil() {
    this._perfil.getUsuario()
      .pipe(
        takeUntil(this.unSubscribe$)
      )
      .subscribe(user => {
        this.dataUser = user;
        console.log(user);
      })
  }

  getTareasPendiente(){
    this._perfil.getTareasPendientes()
    .pipe(
      takeUntil(this.unSubscribe$)
    )
    .subscribe(user => {
        this.tareasPendientes = user.length;
    })
  }
  buscarAmigo() {
    this.dialog.open(AnadirAmigosComponent, {
      width: "500px"
    })
  }
}
