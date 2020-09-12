import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PerfilAmigoComponent } from '../../modals/perfil-amigo/perfil-amigo.component';
import { PerfilAmigoService } from 'src/app/services/perfil-amigo/perfil-amigo.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private unSubscribe$ = new Subject<void>();
  tareasPendientes
  constructor(
    private _perfil: PerfilAmigoService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
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

  buscarPerfilAmigo() {
    this.dialog.open(PerfilAmigoComponent, {
      // width: "500px"
    })
  }
}
