import { PerfilAmigoService } from 'src/app/services/perfil-amigo/perfil-amigo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MateriasService } from '../../services/materias/materias.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AgregarmateriaComponent } from '../../modals/materias/agregarmateria/agregarmateria/agregarmateria.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {
  //Create
  materiaForm: FormGroup

  //load
  materiasObs$: Observable<any>;
  materiasSub: Subscription;
  materias: any;


  userObs$: Observable<any>;
  userSub: Subscription;
  id
  user
  constructor(
    private _materias: MateriasService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _user: PerfilAmigoService

  ) {

    this.id = this.route.snapshot.paramMap.get("id");

  }

  ngOnInit(): void {
    this.loadUser()
    if (!this.id) {
      this.loadMaterias();

    } else {
      this.loadMateriasAmigo()
    }
  }

  ngOnDestroy(): void {
    this.materiasSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  loadUser() {
    this.userObs$ = this._user.getUsuario()
    this.userSub = this.userObs$.subscribe(res => {
      this.user = res
    })
  }

  //Load
  loadMaterias() {
    this.materiasObs$ = this._materias.getMaterias();
    this.materiasSub = this.materiasObs$.subscribe(res => {
      this.materias = res;
    })
  }

  //Load
  loadMateriasAmigo() {
    this.materiasObs$ = this._materias.getMateriasAmigo(this.id);
    this.materiasSub = this.materiasObs$.subscribe(res => {
      this.materias = res;
    })
  }

  openCrearMAteria() {
    this.dialog.open(AgregarmateriaComponent, {
    })
  }

  openCrearMAteriaGrupal() {
    this.dialog.open(AgregarmateriaComponent, {
      data: "grupal"
    })
  }
  openActualizar(data) {
    this.dialog.open(AgregarmateriaComponent, {
      data: data
    })
  }

  eliminarMateria(id) {
    Swal.fire({
      title: '¿Estás seguro de eliminar la materia?',
      text: "¡No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._materias.deleteMateria(id).then(res => {
          Swal.fire(
            '¡Eliminado!',
            'Tu materia ha sido eliminada.',
            'success'
          )

        })
          .catch(error => {
            Swal.fire(
              '¡No se guardaron los cambios!',
              'Tu materia no se eliminó',
              'error'
            )
          })
      }
    })
  }

  copyMateria(item) {
    Swal.fire({
      title: '¿Estás seguro de copiar la materia?',
      text: "¡No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, copiar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._materias.copyMateria(item).then(res => {
          Swal.fire(
            '¡Materia copiada!',
            'Tu materia ha sido copiada.',
            'success'
          )

        })
          .catch(error => {
            Swal.fire(
              '¡No se guardaron los cambios!',
              'Tu materia no se copio',
              'error'
            )
          })
      }
    })
  }

  gollamda(id) {
    this.router.navigate(['/llamada', id]);

  }
}