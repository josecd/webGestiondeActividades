import { AnadirAmigosComponent } from './../../modals/anadir-amigos/anadir-amigos.component';
import { MateriasService } from './../../services/materias/materias.service';
import { Component, OnInit } from '@angular/core';
import { AgregarTareaComponent } from '../../modals/modal-tareas/agregar-tarea/agregar-tarea.component';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TareasService } from '../../services/tareas/tareas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})

export class TareasComponent implements OnInit {

  //Variables del modal
  //Create
  tareasForm: FormGroup

  //load tareas
  tareasObs$: Observable<any>;
  tareasSub: Subscription;
  tareas: any;

  //load materias
  materiasObs$: Observable<any>;
  materiasSub: Subscription;
  materias: any;
  tamanio
  //Tabla de carga
  statuss = '1'
  constructor(
    private _tareas: TareasService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _materias: MateriasService
  ) { }


  ngOnInit(): void {
    this.loadMaterias();
    this.loadTareas();
  }

  //Destruir procesos una vez fuera del componente
  ngOnDestroy(): void {
    if (this.tareasSub) {
      this.tareasSub.unsubscribe();
    }
  }


  //Load tareas
  loadTareas() {
    if (this.statuss === '1') {
      this.tareasObs$ = this._tareas.getTareas();

    } else {
      this.tareasObs$ = this._tareas.getTareasByMateria(this.statuss);
    }
    this.tareasSub = this.tareasObs$.subscribe(res => {
      this.tareas = res;

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
      title: '¿Estás seguro de eliminar la tarea?',
      text: "¡No podrás revertirlo!",
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
            'Deleted!',
            'Tu archivo ha sido eliminado',
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