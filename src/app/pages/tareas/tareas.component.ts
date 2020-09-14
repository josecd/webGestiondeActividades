import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AnadirAmigosComponent } from './../../modals/anadir-amigos/anadir-amigos.component';
import { MateriasService } from './../../services/materias/materias.service';
import { Component, OnInit } from '@angular/core';
import { AgregarTareaComponent } from '../../modals/modal-tareas/agregar-tarea/agregar-tarea.component';
import { Observable, Subscription, Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TareasService } from '../../services/tareas/tareas.service';
import Swal from 'sweetalert2';
import { id } from 'date-fns/locale';
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})

export class TareasComponent implements OnInit {
  private unSubscribe$ = new Subject<void>();

  //Variables del modal
  //Create
  tareasForm: FormGroup

  //load tareas
  tareasObs$: Observable<any>;
  tareasObsHistorial$: Observable<any>;

  tareasSub: Subscription;
  tareas: any;

  //load materias
  materiasObs$: Observable<any>;
  materiasSub: Subscription;
  materias: any;
  tamanio
  //Tabla de carga
  statuss = '1'
  id

  filterPost = '';

  pendientesTareas
  historialTareas
  constructor(
    private _tareas: TareasService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _materias: MateriasService,
    private route: ActivatedRoute,

  ) {
    this.id = this.route.snapshot.paramMap.get("id");

   }


  ngOnInit(): void {
    if (!this.id) {
      this.loadMaterias();
      this.loadTareas();
    } else {
      this.loadTareasAmigo();
      
    }

  }

  //Destruir procesos una vez fuera del componente
  ngOnDestroy(): void {
    if (this.tareasSub) {
      this.tareasSub.unsubscribe();
    }
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  loadTareasAmigo(){
    this._tareas.getTareasAmigo(this.id)
    .pipe(
      takeUntil(this.unSubscribe$)
    )
    .subscribe(data => {
      this.tareas =[]
      this.tareas = data
    })

    this._tareas.getTareasAmigoHistorial(this.id)
    .pipe(
      takeUntil(this.unSubscribe$)
    )
    .subscribe(data => {
      this.historialTareas =[]
      this.historialTareas = data
    })
  }

  //Load tareas
  loadTareas() {
    this.tareasObs$ = this._tareas.getTareasStatusTrue();
    this.tareasObsHistorial$ = this._tareas.getTareasStatusFalse();
    this.tareasSub = this.tareasObs$.subscribe(res => {
      this.tareas = res;
    })
    this.tareasSub = this.tareasObsHistorial$.subscribe(res => {
      this.historialTareas = res;
    })
  }

  //load Materias 
  loadMaterias() {
    this.materiasObs$ = this._materias.getMaterias();
    this.materiasSub = this.materiasObs$.subscribe(res => {
      this.materias = res;
    })
  }
  filter() {
    this.loadTareas();
  }

  buscarAmigo() {
    this.dialog.open(AnadirAmigosComponent, {
      width: "500px"
    })
  }

  openCrearTarea() {
    this.dialog.open(AgregarTareaComponent, {

    })
  }

  openActualizar(data) {
    this.dialog.open(AgregarTareaComponent, {
      data: data
    })
  }

  eliminarTarea(id) {
    Swal.fire({
      title: '¿Estás seguro de eliminar la tarea para siempre?',
      text: "¡Ya no aparecerá en tu historial de tareas, no podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._tareas.deleteTarea(id).then(res => {
          Swal.fire(
            'Eliminada!',
            'Tu tarea ha sido eliminada',
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


  desactivarTarea(id) {
    Swal.fire({
      title: '¿Estás seguro de marcar la tarea como finalizada?',
      text: "¡No podrás revertirlo, solo podrás verla en tu historial de tareas!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, finalizar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._tareas.desactivarTarea(id).then(res => {
          Swal.fire(
            'Finalizada',
            'Tu tarea ha sido finalizada',
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

  copyTarea(item){
    console.warn(item);
    Swal.fire({
      title: '¿Estás seguro de copiar la tarea?',
      text: "¡No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, copiar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._tareas.copyEvento(item).then(res => {
          Swal.fire(
            'Tarea copiada',
            'La tarea ha sido funada',
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
}