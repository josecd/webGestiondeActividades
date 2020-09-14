import { TareasService } from './../../services/tareas/tareas.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PerfilAmigoComponent } from '../../modals/perfil-amigo/perfil-amigo.component';
import { PerfilAmigoService } from 'src/app/services/perfil-amigo/perfil-amigo.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private unSubscribe$ = new Subject<void>();
  tareasPendientes


  //load tareas
  tareasObs$: Observable<any>;
  tareasObsHistorial$: Observable<any>;
  materias$: Observable<any>;
  amigos$: Observable<any>;


  tareasSub: Subscription;
  tareas: any;
  pendientesTareas
  historialTareas
  amigos 
  materias

  constructor(
    private _perfil: PerfilAmigoService,
    public dialog: MatDialog,
    private _tareas: TareasService,
  ) { }


  ngOnInit(): void {
    this.loadTareas()
  }

  getTareasPendiente() {
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

  loadTareas() {
    this.tareasObs$ = this._tareas.getTareasStatusTrue();
    this.tareasObsHistorial$ = this._tareas.getTareasStatusFalse();
    this.materias$ = this._tareas.getMaterias();
    this.amigos$ = this._tareas.getAmigos();

    this.tareasSub = this.amigos$.subscribe(res => {
      this.amigos = res.length;
    })
    this.tareasSub = this.materias$.subscribe(res => {
      this.materias = res.length;
    })
    this.tareasSub = this.tareasObs$.subscribe(res => {
      this.tareas = res.length;
    })
    this.tareasSub = this.tareasObsHistorial$.subscribe(res => {
      this.historialTareas = res.length;
    })
  }
}
